import * as path from 'path';
import * as sass from 'node-sass';
import * as fs from 'fs-extra';
import base64EncodeLine from './base64-encode-line';
import { resolve } from 'dns';

export interface iConcatOptions {
  src: string;
  dest: string;
  rootDir?: string;
  ignoreImports?: string[];
  outputCss?: boolean;
};

export interface iConcatResults {
  output: string;
}

interface iState {
  currentDir: string;
  previousDirs: string[];
  output: string;
  ignoringLines: boolean;
  rootDir: string;
  ignoreImports: { [key: string]: boolean };
};
let state: iState = null;

const ignoreStartTag = 'concat-scss-ignore-start';
const ignoreEndTag = 'concat-scss-ignore-end';

export class ConcatScss {


  private fetchFileContents(path: string, 
  cb: (err: Error, contents: string) => void) {
    fs.readFile(path, 'utf-8', (err, data) => { cb(err, data); });
  }

  private fetchFileContentsFromPaths(index: number, paths: string[], 
  cb: (filepath: string, contents: string) => void) {
    if(index >= paths.length) { cb(null, null); return; }
    let filepath = path.join(state.currentDir, paths[index]);
    if(paths[index].indexOf('~') > -1) {
      // dealing with a node modules import
      const assetPath = paths[index].substring(1);
      filepath = path.join(state.rootDir, 'node_modules', assetPath);
    }
    this.fetchFileContents(filepath, (err, data) => {
      if(data) {
        cb(filepath, data); return;
      }
      this.fetchFileContentsFromPaths(++index, paths, cb);
    });
  }

  private insertIntoString(str: string, char: string, pos: number) {
    return [str.slice(0, pos), char, str.slice(pos)].join('');
  }

  private getImportPath(line: string) {
    const strChar = (line.indexOf("'") > -1) ? "'" : "\"";
    let path = line.substring(line.indexOf(strChar) + 1, line.lastIndexOf(strChar));
    if(state.ignoreImports[path]) return null;
    path = path.replace('.scss', '').replace('.css', '');
    const underscoreScss = this.insertIntoString(path, '_', path.lastIndexOf('/') + 1);
    return [ 
      underscoreScss + '.scss', 
      path + '.scss', 
      path +'.css' 
    ];
  }

  private iterateLinesInFile(index: number, lines: string[], 
  cb: () => void) {
    if(index >= lines.length) { cb(); return; }
    const line = lines[index];
    if(line.indexOf(ignoreEndTag) > -1) {
      state.ignoringLines = false;
      this.iterateLinesInFile(++index, lines, cb);
    } else if(state.ignoringLines || line.indexOf(ignoreStartTag) > -1) {
      state.ignoringLines = true;
      this.iterateLinesInFile(++index, lines, cb);
    } else if(line.indexOf('@import') > -1) {
      const importPaths = this.getImportPath(line);
      if(importPaths) {
        this.fetchFileContentsFromPaths(0, importPaths, (filePath, contents) => {
          state.previousDirs.push(state.currentDir);
          state.currentDir = path.dirname(filePath);
          this.iterateLinesInFile(0, contents.split('\n'), () => {
            state.currentDir = state.previousDirs.pop();
            this.iterateLinesInFile(++index, lines, cb);
          });
        });
      } else {
        // import path must be ignored
        this.iterateLinesInFile(++index, lines, cb);
      }
    } else {
      base64EncodeLine(state.currentDir, line, (newLine) => {
        state.output += newLine + '\n';
        this.iterateLinesInFile(++index, lines, cb);
      }); 
    }
  }





  private resetState() {
    state = {
      currentDir: '',
      previousDirs: [],
      output: '',
      ignoringLines: false,
      rootDir: '',
      ignoreImports: {}
    };
  }

  private setIgnoreImports(imports: string[]) {
    if(imports) {
      for(let i = 0; i < imports.length; i++) {
        state.ignoreImports[imports[i]] = true;
      }
    }
  }


  private getSrcAndDestPaths(options: iConcatOptions): { src: string, dest: string } {
    let srcPath;
    let destPath;
    if(path.isAbsolute(options.src)) {
      srcPath = options.src;
    } else {
      srcPath = path.join(process.cwd(), options.src);
    }
    if(path.isAbsolute(options.dest)) {
      destPath = options.dest;
    } else {
      destPath = path.join(process.cwd(), options.dest);
    }
    return { src: srcPath, dest: destPath };
  }


  private writeOutputToFile(output: string, dest: string, 
  cb: (err: Error) => void) {
    fs.ensureDir(path.dirname(dest)).then(() => {
      fs.writeFile(dest, output, {}, (err) => { cb(err); });
    }).catch((err) => {
      cb(err);
    });
    
  }


  concat(options: iConcatOptions): Promise<iConcatResults> {
    return new Promise((resolve, reject) => {
      if(!options.src) {
        reject(new Error('Please provide the src option')); return;
      }
      if(!options.dest) {
        reject(new Error('Please provide the dest option')); return;
      }
      this.resetState();
      state.rootDir = (options.rootDir) ? options.rootDir : process.cwd();
      console.log('rootDir = ' + state.rootDir);
      this.setIgnoreImports(options.ignoreImports);
      const paths = this.getSrcAndDestPaths(options);

      this.fetchFileContents(paths.src, (err, fileContents) => {
        if(err) throw err;
        state.currentDir = path.dirname(paths.src);
        this.iterateLinesInFile(0, fileContents.split('\n'), () => {
          console.log(paths.dest);
          this.writeOutputToFile(state.output, paths.dest, (err) => {
            resolve({
              output: state.output
            });
          });
        });
      });
    });
  }
}