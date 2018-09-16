"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
class UnitTestHelper {
    emptyOutputDirectory() {
        const dir = path.join(process.cwd(), 'spec', 'dummy-data', 'output');
        fs.emptyDirSync(dir);
    }
    getOutputFileContents(filename, cb) {
        const filepath = path.join(process.cwd(), 'spec', 'dummy-data', 'output', filename);
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err)
                throw err;
            cb(data);
        });
    }
}
exports.UnitTestHelper = UnitTestHelper;
const unitTestHelper = new UnitTestHelper();
exports.unitTestHelper = unitTestHelper;
//# sourceMappingURL=unit-test-helper.js.map