"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
class FsUtils {
    fetchFileContents(path, cb) {
        fs.readFile(path, 'utf-8', (err, data) => { cb(err, data); });
    }
    fetchFileContentsFromPaths(index, paths, parseState, cb) {
        if (index >= paths.length) {
            cb(null, null);
            return;
        }
        let filepath = path.join(parseState.currentDir, paths[index]);
        if (paths[index].indexOf('~') > -1) {
            const assetPath = paths[index].substring(1);
            filepath = path.join(parseState.rootDir, 'node_modules', assetPath);
        }
        this.fetchFileContents(filepath, (err, data) => {
            if (data) {
                cb(filepath, data);
                return;
            }
            this.fetchFileContentsFromPaths(++index, paths, parseState, cb);
        });
    }
    getAbsoluteSrcAndDestPaths(src, dest, rootDir) {
        let srcPath, destPath;
        if (path.isAbsolute(src)) {
            srcPath = src;
        }
        else {
            srcPath = path.join(rootDir, src);
        }
        if (path.isAbsolute(dest)) {
            destPath = dest;
        }
        else {
            destPath = path.join(rootDir, dest);
        }
        return { src: srcPath, dest: destPath };
    }
    writeOutputToFile(output, dest, cb) {
        fs.ensureDir(path.dirname(dest)).then(() => {
            fs.writeFile(dest, output, {}, (err) => { cb(err); });
        }).catch((err) => {
            cb(err);
        });
    }
}
exports.FsUtils = FsUtils;
const fsUtils = new FsUtils();
exports.fsUtils = fsUtils;
//# sourceMappingURL=fs-utils.js.map