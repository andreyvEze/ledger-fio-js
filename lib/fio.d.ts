/// <reference types="node" />
/// <reference types="ledgerhq__hw-transport" />
import type Transport from "@ledgerhq/hw-transport";
import type { Interaction, SendParams } from './interactions/common/types';
import type { HexString, ParsedTransaction, ValidBIP32Path } from './types/internal';
import type { BIP32Path, DeviceCompatibility, Serial, SignedTransactionData, Transaction, Version } from './types/public';
export * from './errors';
export * from './types/public';
export declare type SendFn = (params: SendParams) => Promise<Buffer>;
export declare class Fio {
    transport: Transport<string>;
    _send: SendFn;
    constructor(transport: Transport<string>, scrambleKey?: string);
    getVersion(): Promise<GetVersionResponse>;
    _getVersion(): Interaction<Version>;
    getSerial(): Promise<GetSerialResponse>;
    _getSerial(): Interaction<GetSerialResponse>;
    getPublicKey({ path, show_or_not }: GetPublicKeyRequest): Promise<GetPublicKeyResponse>;
    _getPublicKey(path: ValidBIP32Path, show_or_not: boolean): Generator<SendParams, GetPublicKeyResponse, Buffer>;
    signTransaction({ path, chainId, tx }: SignTransactionRequest): Promise<SignTransactionResponse>;
    _signTransaction(parsedPath: ValidBIP32Path, chainId: HexString, tx: ParsedTransaction): Generator<SendParams, SignedTransactionData, Buffer>;
    runTests(): Promise<void>;
    _runTests(): Interaction<void>;
}
export declare type GetVersionResponse = {
    version: Version;
    compatibility: DeviceCompatibility;
};
export declare type GetSerialResponse = Serial;
export declare type GetPublicKeyRequest = {
    path: BIP32Path;
    show_or_not: boolean;
};
export declare type GetPublicKeyResponse = {
    publicKeyHex: string;
    publicKeyWIF: string;
};
export declare type SignTransactionRequest = {
    path: BIP32Path;
    chainId: string;
    tx: Transaction;
};
export declare type SignTransactionResponse = SignedTransactionData;
export default Fio;
//# sourceMappingURL=fio.d.ts.map