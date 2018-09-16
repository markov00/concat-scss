"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require("mime");
const path = require("path");
const fs = require("fs-extra");
class AssetHandler {
    base64EncodeAsset(filePath, urlPath, line, cb) {
        const filemime = mime.getType(filePath);
        fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                cb(line);
                return;
            }
            const base64Url = `data:${filemime};base64,${data}`;
            const newLine = line.replace(urlPath, base64Url);
            cb(newLine);
        });
    }
    copyAsset(state, filePath, line, urlPath, cb) {
        const filename = path.basename(filePath);
        const destDir = path.dirname(state.destFile);
        const destFile = path.join(destDir, filename);
        fs.copy(filePath, destFile, (err) => {
            const newLine = line.replace(urlPath, filename);
            cb(newLine);
        });
    }
    handleAssetCopying(state, filePath, urlPath, line, cb) {
        if (state.copyAssetsToDest === true) {
            this.copyAsset(state, filePath, line, urlPath, cb);
        }
        else {
            const assetsToCopy = state.copyAssetsToDest;
            if (assetsToCopy.indexOf(urlPath) > -1) {
                this.copyAsset(state, filePath, line, urlPath, cb);
            }
            else {
                this.base64EncodeAsset(filePath, urlPath, line, cb);
            }
        }
    }
    parseUrlAsset(state, line, cb) {
        if (line.indexOf('url(') > -1) {
            let urlPath = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
            if (urlPath.indexOf("'") < 0 && urlPath.indexOf('"') < 0) {
                cb(line);
                return;
            }
            urlPath = urlPath.replace(/'/g, '').replace(/"/g, '');
            if (urlPath.indexOf('data:') > -1) {
                cb(line);
                return;
            }
            let filePath = path.join(state.currentDir, urlPath);
            if (filePath.indexOf('?') > -1)
                filePath = filePath.substring(0, filePath.indexOf('?'));
            if (state.copyAssetsToDest) {
                this.handleAssetCopying(state, filePath, urlPath, line, (newLine) => {
                    cb(newLine);
                });
            }
            else {
                this.base64EncodeAsset(filePath, urlPath, line, (newLine) => {
                    cb(newLine);
                });
            }
        }
        else {
            cb(line);
        }
    }
    ;
}
exports.AssetHandler = AssetHandler;
const assetHandler = new AssetHandler();
exports.assetHandler = assetHandler;
//# sourceMappingURL=asset-handler.js.map