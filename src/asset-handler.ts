// const mime = require('mime');
import * as mime from 'mime';
import * as path from 'path';
import * as fs from 'fs-extra';
import { iParseState } from './interfaces';



export class AssetHandler {


  /**
   * Base64 encode an asset in a url() in a line of scss code
   *
   * @private
   * @param {string} filePath
   * @param {string} filemime
   * @param {string} urlPath
   * @param {string} line
   * @param {(newLine: string) => void} cb
   * @memberof AssetHandler
   */
  private base64EncodeAsset(filePath: string, urlPath: string, line: string, 
  cb: (newLine: string) => void) {
    const filemime = mime.getType(filePath);
    fs.readFile(filePath, {encoding: 'base64'}, (err, data) => {
      if (err) {
        // something went wrong with getting the url file, not much we can do
        cb(line); return;
      }
      const base64Url = `data:${filemime};base64,${data}`;
      const newLine = line.replace(urlPath, base64Url);
      cb(newLine);
    });
  }


  /**
   * Copy an asset to the source destination
   *
   * @private
   * @param {iParseState} state
   * @param {string} filePath
   * @param {string} line
   * @param {string} urlPath
   * @param {(newLine: string) => void} cb
   * @memberof AssetHandler
   */
  private copyAsset(state: iParseState, filePath: string, line: string,
  urlPath: string, cb: (newLine: string) => void) {
    const filename = path.basename(filePath);
    const destDir = path.dirname(state.destFile);
    const destFile = path.join(destDir, filename);
    fs.copy(filePath, destFile, (err) => {
      const newLine = line.replace(urlPath, filename);
      cb(newLine);
    });
  }


  /**
   * Handle if an asset needs to be copied or not
   *
   * @private
   * @param {iParseState} state
   * @param {string} filePath
   * @param {string} urlPath
   * @param {string} line
   * @param {(newLine: string) => void} cb
   * @memberof AssetHandler
   */
  private handleAssetCopying(state: iParseState, filePath: string,
  urlPath: string, line: string, cb: (newLine: string) => void) {
    if(state.copyAssetsToDest === true) {
      this.copyAsset(state, filePath, line, urlPath, cb);
    } else {
      // must be an array of string
      const assetsToCopy: string[] = <string[]>state.copyAssetsToDest;
      if(assetsToCopy.indexOf(urlPath) > -1) {
        this.copyAsset(state, filePath, line, urlPath, cb);
      } else {
        this.base64EncodeAsset(filePath, urlPath, line, cb);
      }
    }
  }


  /**
   * Base 64 encode a line that may contain a url, for example:
   * url('./my-image.png');
   *
   * @param {string} currentDir
   * @param {string} line
   * @param {(newLine: string) => void} cb
   * @returns
   */
  parseUrlAsset(state: iParseState, line: string, 
  cb: (newLine: string) => void) {
    if(line.indexOf('url(') > -1) {
      let urlPath = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
      // lets check if the url path is not just a variable, like: url($myVar);
      if(urlPath.indexOf("'") < 0 && urlPath.indexOf('"') < 0) {
        cb(line); return;
      }
      urlPath = urlPath.replace(/'/g, '').replace(/"/g, '');
      // lets check if the url path is already a data url
      if(urlPath.indexOf('data:') > -1) {
        cb(line); return;
      }
      let filePath = path.join(state.currentDir, urlPath);
      if(filePath.indexOf('?') > -1) 
        filePath = filePath.substring(0, filePath.indexOf('?'));
      if(state.copyAssetsToDest) {
        this.handleAssetCopying(state, filePath, urlPath,
        line, (newLine) => {
          cb(newLine);
        });
      } else {
        this.base64EncodeAsset(filePath, urlPath, line, (newLine) => {
          cb(newLine);
        });
      }
    } else {
      cb(line);
    }
  };
}

const assetHandler = new AssetHandler();
export { assetHandler };