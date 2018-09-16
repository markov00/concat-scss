"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require("mime");
const path = require("path");
const fs = require("fs-extra");
class AssetHandler {
    base64EncodeLine(state, line, cb) {
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
        else {
            cb(line);
        }
    }
    ;
}
exports.AssetHandler = AssetHandler;
const assetHandler = new AssetHandler();
exports.assetHandler = assetHandler;
//# sourceMappingURL=base64-encode-line.js.map