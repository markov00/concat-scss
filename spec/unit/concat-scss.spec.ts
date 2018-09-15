import { iConcatOptions, ConcatScss } from '../../src/concat-scss';

describe('Concat Scss', () => {

  it('should conact scss with fonts and images', (done) => {
    const concatScss = new ConcatScss();
    const options: iConcatOptions = {
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