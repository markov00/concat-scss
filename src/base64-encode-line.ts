// const mime = require('mime');
import * as mime from 'mime';
import * as path from 'path';
import * as fs from 'fs-extra';


/**
 * Base 64 encode a line that may contain a url, for example:
 * url('./my-image.png');
 *
 * @param {string} currentDir
 * @param {string} line
 * @param {(newLine: string) => void} cb
 * @returns
 */
const base64EncodeLine = (currentDir: string, line: string, 
cb: (newLine: string) => void) => {
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
    let filePath = path.join(currentDir, urlPath);
    const filemime = mime.getType(filePath);
    if(filePath.indexOf('?') > -1) 
      filePath = filePath.substring(0, filePath.indexOf('?'));
    fs.readFile(filePath, {encoding: 'base64'}, (err, data) => {
      if (err) {
        // something went wrong with getting the url file, not much we can do
        cb(line); return;
      }
      const base64Url = `data:${filemime};base64,${data}`;
      const newLine = line.replace(urlPath, base64Url);
      cb(newLine);
    });
  } else {
    cb(line);
  }
};

export default base64EncodeLine;