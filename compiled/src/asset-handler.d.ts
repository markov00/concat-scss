import { iParseState } from './interfaces';
export declare class AssetHandler {
    private base64EncodeAsset;
    private copyAsset;
    private handleAssetCopying;
    parseUrlAsset(state: iParseState, line: string, cb: (newLine: string) => void): void;
}
declare const assetHandler: AssetHandler;
export { assetHandler };
