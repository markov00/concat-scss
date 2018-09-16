export interface iConcatOptions {
  src: string;
  dest: string;
  rootDir?: string;
  removeImports?: string[];
  outputCss?: boolean;
  copyAssetsToDest?: boolean|string[];
};

export interface iConcatResults {
  output: string;
}

export interface iParseState {
  currentDir: string;
  previousDirs: string[];
  output: string;
  ignoringLines: boolean;
  rootDir: string;
  removeImports: { [key: string]: boolean };
  copyAssetsToDest: boolean|string[];
  srcFile: string;
  destFile: string;
};