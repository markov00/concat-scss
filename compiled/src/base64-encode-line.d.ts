import { iParseState } from './interfaces';
export declare class AssetHandler {
    base64EncodeLine(state: iParseState, line: string, cb: (newLine: string) => void): void;
}
declare const assetHandler: AssetHandler;
export { assetHandler };
