"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const sass = require("node-sass");
const fs = require("fs-extra");
const asset_handler_1 = require("./asset-handler");
const fs_utils_1 = require("./fs-utils");
let state = null;
const ignoreStartTag = 'concat-scss-ignore-start';
const ignoreEndTag = 'concat-scss-ignore-end';
class ConcatScss {
    insertIntoString(str, char, pos) {
        return [str.slice(0, pos), char, str.slice(pos)].join('');
    }
    getAllPossibleImportPaths(line) {
        const strChar = (line.indexOf("'") > -1) ? "'" : "\"";
        let path = line.substring(line.indexOf(strChar) + 1, line.lastIndexOf(strChar));
        if (state.removeImports[path])
            return null;
        path = path.replace('.scss', '').replace('.css', '');
        const underscoreScss = this.insertIntoString(path, '_', path.lastIndexOf('/') + 1);
        return [
            underscoreScss + '.scss',
            path + '.scss',
            path + '.css'
        ];
    }
    iterateLinesInFile(index, lines, cb) {
        if (index >= lines.length) {
            cb();
            return;
        }
        const line = lines[index];
        if (line.indexOf(ignoreEndTag) > -1) {
            state.ignoringLines = false;
            this.iterateLinesInFile(++index, lines, cb);
        }
        else if (state.ignoringLines || line.indexOf(ignoreStartTag) > -1) {
            state.ignoringLines = true;
            this.iterateLinesInFile(++index, lines, cb);
        }
        else if (line.indexOf('@import') > -1) {
            const importPaths = this.getAllPossibleImportPaths(line);
            if (importPaths) {
                fs_utils_1.fsUtils.fetchFileContentsFromPaths(0, importPaths, state, (filePath, contents) => {
                    if (!filePath) {
                        console.log('Concat-scss warning: file not found for import: '
                            + line);
                    }
                    if (contents) {
                        state.previousDirs.push(state.currentDir);
                        state.currentDir = (filePath) ? path.dirname(filePath) : state.currentDir;
                        this.iterateLinesInFile(0, contents.split('\n'), () => {
                            state.currentDir = state.previousDirs.pop();
                            this.iterateLinesInFile(++index, lines, cb);
                        });
                    }
                    else {
                        this.iterateLinesInFile(++index, lines, cb);
                    }
                });
            }
            else {
                this.iterateLinesInFile(++index, lines, cb);
            }
        }
        else {
            asset_handler_1.assetHandler.parseUrlAsset(state, line, (newLine) => {
                state.output += newLine + '\n';
                this.iterateLinesInFile(++index, lines, cb);
            });
        }
    }
    resetState(options) {
        const rootDir = (options.rootDir) ? options.rootDir : process.cwd();
        const paths = fs_utils_1.fsUtils.getAbsoluteSrcAndDestPaths(options.src, options.dest, rootDir);
        state = {
            srcFile: paths.src,
            destFile: paths.dest,
            currentDir: '',
            previousDirs: [],
            output: '',
            ignoringLines: false,
            rootDir: rootDir,
            removeImports: {},
            copyAssetsToDest: (options.copyAssetsToDest)
                ? options.copyAssetsToDest : false
        };
    }
    setRemoveImports(imports) {
        if (imports) {
            for (let i = 0; i < imports.length; i++) {
                state.removeImports[imports[i]] = true;
            }
        }
    }
    compileSass(dest, cb) {
        const cssDest = dest.replace('.scss', '.css');
        sass.render({
            file: dest
        }, function (err, result) {
            if (err)
                throw err;
            fs.writeFile(cssDest, result.css.toString(), {}, function (err) {
                cb();
            });
        });
    }
    writeOutput(dest, outputCss, cb) {
        fs_utils_1.fsUtils.writeOutputToFile(state.output, dest, (err) => {
            if (err)
                throw err;
            if (outputCss) {
                this.compileSass(dest, () => {
                    cb();
                });
            }
            else {
                cb();
            }
        });
    }
    concat(options) {
        return new Promise((resolve, reject) => {
            if (!options.src || !options.dest) {
                reject(new Error('Please provide the src & dest options'));
                return;
            }
            this.resetState(options);
            this.setRemoveImports(options.removeImports);
            fs_utils_1.fsUtils.fetchFileContents(state.srcFile, (err, fileContents) => {
                if (err)
                    throw err;
                state.currentDir = path.dirname(state.srcFile);
                this.iterateLinesInFile(0, fileContents.split('\n'), () => {
                    this.writeOutput(state.destFile, options.outputCss, () => {
                        resolve({
                            output: state.output
                        });
                    });
                });
            });
        });
    }
}
exports.ConcatScss = ConcatScss;
//# sourceMappingURL=concat-scss.js.map