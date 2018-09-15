"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concat_scss_1 = require("../../src/concat-scss");
describe('Concat Scss', () => {
    it('should conact scss with fonts and images', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/index.scss',
            dest: './spec/dummy-data/output/scss-spec.scss'
        };
        concatScss.concat(options).then((results) => {
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('should work with absolute paths', () => {
    });
    it('should work with css files', () => {
    });
    it('should work when setting rootDir', () => {
    });
    it('should ignore some code in a scss file', () => {
    });
    it('should ignore imports', () => {
    });
});
//# sourceMappingURL=concat-scss.spec.js.map