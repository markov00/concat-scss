export interface iConcatOptions {
    src: string;
    dest: string;
    rootDir?: string;
    ignoreImports?: string[];
    outputCss?: boolean;
}
export interface iConcatResults {
    output: string;
}
export declare class ConcatScss {
    private fetchFileContents;
    private fetchFileContentsFromPaths;
    private insertIntoString;
    private getImportPath;
    private iterateLinesInFile;
    private resetState;
    private setIgnoreImports;
    private getSrcAndDestPaths;
    private writeOutputToFile;
    concat(options: iConcatOptions): Promise<iConcatResults>;
}
