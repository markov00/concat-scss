export declare class UnitTestHelper {
    emptyOutputDirectory(): void;
    getOutputFileContents(filename: string, cb: (contents: string) => void): void;
}
declare const unitTestHelper: UnitTestHelper;
export { unitTestHelper };
