import { iConcatOptions, iConcatResults } from './interfaces';
export declare type iConcatOptions = iConcatOptions;
export declare class ConcatScss {
    private insertIntoString;
    private getAllPossibleImportPaths;
    private iterateLinesInFile;
    private resetState;
    private setRemoveImports;
    private compileSass;
    private writeOutput;
    concat(options: iConcatOptions): Promise<iConcatResults>;
}
