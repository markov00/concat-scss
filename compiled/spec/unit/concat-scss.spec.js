"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concat_scss_1 = require("../../src/concat-scss");
const path = require("path");
const unit_test_helper_1 = require("../support/unit-test-helper");
const svgBase64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPgo8ZGVmcz4KPGZvbnQgaWQ9Imljb21vb24iIGhvcml6LWFkdi14PSIxMDI0Ij4KPGZvbnQtZmFjZSB1bml0cy1wZXItZW09IjEwMjQiIGFzY2VudD0iOTYwIiBkZXNjZW50PSItNjQiIC8+CjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4MjA7IiBob3Jpei1hZHYteD0iNTEyIiBkPSIiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlMGNkOyIgZ2x5cGgtbmFtZT0icGhvbmUiIGQ9Ik0yODIgNDc4LjY2N2M2Mi0xMjAgMTYyLTIyMCAyODItMjgybDk0IDk0YzEyIDEyIDMwIDE2IDQ0IDEwIDQ4LTE2IDEwMC0yNCAxNTItMjQgMjQgMCA0Mi0xOCA0Mi00MnYtMTUwYzAtMjQtMTgtNDItNDItNDItNDAwIDAtNzI2IDMyNi03MjYgNzI2IDAgMjQgMTggNDIgNDIgNDJoMTUwYzI0IDAgNDItMTggNDItNDIgMC01NCA4LTEwNCAyNC0xNTIgNC0xNCAyLTMyLTEwLTQ0eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGUwZTE7IiBnbHlwaC1uYW1lPSJtYWlsX291dGxpbmUiIGQ9Ik01MTIgNDY4LjY2N2wzNDIgMjE0aC02ODR6TTg1NCAxNzAuNjY3djQyNmwtMzQyLTIxMi0zNDIgMjEydi00MjZoNjg0ek04NTQgNzY4LjY2N2M0NiAwIDg0LTQwIDg0LTg2di01MTJjMC00Ni0zOC04Ni04NC04NmgtNjg0Yy00NiAwLTg0IDQwLTg0IDg2djUxMmMwIDQ2IDM4IDg2IDg0IDg2aDY4NHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlNTVlOyIgZ2x5cGgtbmFtZT0icGluX2Ryb3AiIGQ9Ik0yMTQgODQuNjY3aDU5NnYtODRoLTU5NnY4NHpNNDI2IDU5Ni42NjdjMC00NiA0MC04NCA4Ni04NCA0OCAwIDg2IDM4IDg2IDg0cy00MCA4Ni04NiA4Ni04Ni00MC04Ni04NnpNNzY4IDU5Ni42NjdjMC0xOTItMjU2LTQ2OC0yNTYtNDY4cy0yNTYgMjc2LTI1NiA0NjhjMCAxNDIgMTE0IDI1NiAyNTYgMjU2czI1Ni0xMTQgMjU2LTI1NnoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlNWM0OyIgZ2x5cGgtbmFtZT0iYXJyb3dfYmFjayIgZD0iTTg1NCA0NjguNjY3di04NGgtNTIwbDIzOC0yNDAtNjAtNjAtMzQyIDM0MiAzNDIgMzQyIDYwLTYwLTIzOC0yNDBoNTIweiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU1Yzg7IiBnbHlwaC1uYW1lPSJhcnJvd19mb3J3YXJkIiBkPSJNNTEyIDc2OC42NjdsMzQyLTM0Mi0zNDItMzQyLTYwIDYwIDIzOCAyNDBoLTUyMHY4NGg1MjBsLTIzOCAyNDB6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTVjYTsiIGdseXBoLW5hbWU9ImNoZWNrIiBkPSJNMzg0IDI0OC42NjdsNDUyIDQ1MiA2MC02MC01MTItNTEyLTIzOCAyMzggNjAgNjB6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTVjZDsiIGdseXBoLW5hbWU9ImNsb3NlIiBkPSJNODEwIDY2NC42NjdsLTIzOC0yMzggMjM4LTIzOC02MC02MC0yMzggMjM4LTIzOC0yMzgtNjAgNjAgMjM4IDIzOC0yMzggMjM4IDYwIDYwIDIzOC0yMzggMjM4IDIzOHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlNWNlOyIgZ2x5cGgtbmFtZT0iZXhwYW5kX2xlc3MiIGQ9Ik01MTIgNTk2LjY2N2wyNTYtMjU2LTYwLTYwLTE5NiAxOTYtMTk2LTE5Ni02MCA2MHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlNWNmOyIgZ2x5cGgtbmFtZT0iZXhwYW5kX21vcmUiIGQ9Ik03MDggNTcyLjY2N2w2MC02MC0yNTYtMjU2LTI1NiAyNTYgNjAgNjAgMTk2LTE5NnoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlNWQyOyIgZ2x5cGgtbmFtZT0ibWVudSIgZD0iTTEyOCA2ODIuNjY3aDc2OHYtODZoLTc2OHY4NnpNMTI4IDM4NC42Njd2ODRoNzY4di04NGgtNzY4ek0xMjggMTcwLjY2N3Y4Nmg3Njh2LTg2aC03Njh6IiAvPgo8L2ZvbnQ+PC9kZWZzPjwvc3ZnPg==';
const ttfBase64 = 'data:font/ttf;base64,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';
const pngBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAMAAADaaRXwAAACvlBMVEUjJ1z///8jJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1wjJ1z0VDn5AAAA6XRSTlMAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmKCkqKywtLi8wMTIzNDU3ODk6Ozw9Pj9AQUNERUZHSElKTE1OUFFSU1RVVldYWVpbXF1eX2FiY2RlZmdoaWprbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIi4yNjo+QkZOWl5iZm5yd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';
describe('Concat Scss', () => {
    beforeAll(() => {
        unit_test_helper_1.unitTestHelper.emptyOutputDirectory();
    });
    fit('spec 1: should conact scss with fonts and images', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/index.scss',
            dest: './spec/dummy-data/output/scss-spec-1.scss'
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf(svgBase64) > -1).toEqual(true);
            expect(output.indexOf(ttfBase64) > -1).toEqual(true);
            expect(output.indexOf(pngBase64Image) > -1).toEqual(true);
            expect(output.indexOf('.icomoon-mail_outline:before') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 2: should work with absolute paths', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: path.join(process.cwd(), './spec/dummy-data/index.scss'),
            dest: path.join(process.cwd(), './spec/dummy-data/output/scss-spec-2.scss')
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('.icomoon-mail_outline:before') > -1).toEqual(true);
            expect(output.indexOf('.logo {') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 3: should work with css files', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/index.scss',
            dest: './spec/dummy-data/output/scss-spec-3.scss'
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf(svgBase64) > -1).toEqual(true);
            expect(output.indexOf(ttfBase64) > -1).toEqual(true);
            expect(output.indexOf(pngBase64Image) > -1).toEqual(true);
            expect(output.indexOf('.icomoon-mail_outline:before') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 4: should output css as well', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/index.scss',
            dest: './spec/dummy-data/output/scss-spec-4.scss',
            outputCss: true
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            unit_test_helper_1.unitTestHelper.getOutputFileContents('scss-spec-4.css', (contents) => {
                expect(contents.indexOf('color: #000;') > -1).toEqual(true);
                unit_test_helper_1.unitTestHelper.getOutputFileContents('scss-spec-4.scss', (contents) => {
                    expect(contents.indexOf('$color-primary: #000;') > -1).toEqual(true);
                    done();
                });
            });
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 5: should work when setting rootDir', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/simple.scss',
            dest: './spec/dummy-data/output/scss-spec-5.scss',
            rootDir: process.cwd()
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('$varOne: #000;') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 6: should ignore some code in a scss file', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/simple.scss',
            dest: './spec/dummy-data/output/scss-spec-6.scss'
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('$varTwo: #ccc;') === -1).toEqual(true);
            expect(output.indexOf('// concat-scss-ignore-start') === -1).toEqual(true);
            expect(output.indexOf('// concat-scss-ignore-end') === -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 7: should ignore imports', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/import-bootstrap.scss',
            dest: './spec/dummy-data/output/scss-spec-7.scss',
            removeImports: ['~bootstrap/scss/bootstrap.scss']
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('https://getbootstrap.com/') === -1).toEqual(true);
            expect(output.indexOf('bootstrap/scss/bootstrap.scss') === -1).toEqual(true);
            expect(output.indexOf('$testVar: #000;') > -1).toEqual(true);
            expect(output.indexOf('$globalTestVar: #999;') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 8: should ignore urls to encode', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/url-encoding.scss',
            dest: './spec/dummy-data/output/spec8/scss-spec-8.scss',
            copyAssetsToDest: ['icomoon/fonts/icomoon.svg']
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf(pngBase64Image) > -1).toEqual(true);
            expect(output.indexOf("url('icomoon.svg')") > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 9: should not encode urls', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/url-encoding.scss',
            dest: './spec/dummy-data/output/spec9/scss-spec-9.scss',
            copyAssetsToDest: true,
            outputCss: true
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf("url('icomoon.svg')") > -1).toEqual(true);
            expect(output.indexOf('url("fake-logo.png")') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 10: should import node module imports', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/import-bootstrap.scss',
            dest: './spec/dummy-data/output/scss-spec-10.scss'
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('https://getbootstrap.com/') > -1).toEqual(true);
            expect(output.indexOf('$testVar: #000;') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
    it('spec 11: should find index file automagically in a directory', (done) => {
        const concatScss = new concat_scss_1.ConcatScss();
        const options = {
            src: './spec/dummy-data/test/index.scss',
            dest: './spec/dummy-data/output/scss-spec-11.scss'
        };
        concatScss.concat(options).then((results) => {
            const output = results.output;
            expect(output.indexOf('.index-text') > -1).toEqual(true);
            expect(output.indexOf('.abc-test-class') > -1).toEqual(true);
            done();
        }).catch((err) => {
            throw err;
        });
    });
});
//# sourceMappingURL=concat-scss.spec.js.map