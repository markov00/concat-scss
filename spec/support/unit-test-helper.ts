import * as path from 'path';
import * as fs from 'fs-extra';

/**
 * Service class to help with common functionality for unit tests
 *
 * @export
 * @class UnitTestHelper
 */
export class UnitTestHelper {

  emptyOutputDirectory() {
    const dir = path.join(process.cwd(), 'spec', 'dummy-data', 'output');
    fs.emptyDirSync(dir);
  }

  /**
   * Get the file contents of an output file
   *
   * @param {string} filename
   * @param {(contents: string) => void} cb
   * @memberof UnitTestHelper
   */
  getOutputFileContents(filename: string, cb: (contents: string) => void) {
    const filepath = path.join(process.cwd(), 'spec', 'dummy-data',
      'output', filename);
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if(err) throw err;
      cb(data);
    });
  }
}

// export as singleton
const unitTestHelper = new UnitTestHelper();
export { unitTestHelper };