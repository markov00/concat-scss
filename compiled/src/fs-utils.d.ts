import { iParseState } from './interfaces';
export interface iAbsolutePaths {
    src: string;
    dest: string;
}
export declare class FsUtils {
    fetchFileContents(path: string, cb: (err: Error, contents: string) => void): void;
    fetchFileContentsFromPaths(index: number, paths: string[], parseState: iParseState, cb: (filepath: string, contents: string) => void): void;
    getAbsoluteSrcAndDestPaths(src: string, dest: string, rootDir: string): iAbsolutePaths;
    writeOutputToFile(output: string, dest: string, cb: (err: Error) => void): void;
}
declare const fsUtils: FsUtils;
export { fsUtils };
