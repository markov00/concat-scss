import * as path from 'path';
import * as fs from 'fs-extra';
import { iParseState } from './interfaces';

export interface iAbsolutePaths {
  src: string;
  dest: string;
}


/**
 * Utility service to help with file system functionality
 *
 * @export
 * @class FsUtils
 */
export class FsUtils {

  /**
   * Fetch contents of a file
   *
   * @param {string} path
   * @param {(err: Error, contents: string) => void} cb
   * @memberof ConcatScss
   */
  fetchFileContents(path: string, 
  cb: (err: Error, contents: string) => void) {
    fs.readFile(path, 'utf-8', (err, data) => { cb(err, data); });
  }


  /**
   * Fetch file contents from an array of file paths. Only one of the file 
   * paths will exist
   *
   * @param {number} index
   * @param {string[]} paths
   * @param {iParseState} parseState
   * @param {(filepath: string, contents: string) => void} cb
   * @returns
   * @memberof FsUtils
   */
  fetchFileContentsFromPaths(index: number, paths: string[], 
  parseState: iParseState, cb: (filepath: string, contents: string) => void) {
    if(index >= paths.length) { cb(null, null); return; }
    let filepath = path.join(parseState.currentDir, paths[index]);
    if(paths[index].indexOf('~') > -1) {
      // dealing with a node modules import
      const assetPath = paths[index].substring(1);
      filepath = path.join(parseState.rootDir, 'node_modules', assetPath);
    }
    this.fetchFileContents(filepath, (err, data) => {
      if(!err) {
        cb(filepath, data); return;
      }
      this.fetchFileContentsFromPaths(++index, paths, parseState, cb);
    });
  }


  /**
   * Get the absolute paths for src and dest
   *
   * @param {string} src
   * @param {string} dest
   * @returns {iAbsolutePaths}
   * @memberof FsUtils
   */
  getAbsoluteSrcAndDestPaths(src: string, dest: string, 
  rootDir: string): iAbsolutePaths {
    let srcPath, destPath;
    if(path.isAbsolute(src)) {
      srcPath = src;
    } else {
      srcPath = path.join(rootDir, src);
    }
    if(path.isAbsolute(dest)) {
      destPath = dest;
    } else {
      destPath = path.join(rootDir, dest);
    }
    return { src: srcPath, dest: destPath };
  }


  /**
   * Write output to the destination file
   *
   * @param {string} output
   * @param {string} dest
   * @param {(err: Error) => void} cb
   * @memberof FsUtils
   */
  writeOutputToFile(output: string, dest: string, cb: (err: Error) => void) {
    fs.ensureDir(path.dirname(dest)).then(() => {
      fs.writeFile(dest, output, {}, (err) => { cb(err); });
    }).catch((err) => {
      cb(err);
    });
  }
}

// export as singleton
const fsUtils = new FsUtils();
export { fsUtils };