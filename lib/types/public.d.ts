export declare type bigint_like = number | bigint | string;
export declare const HARDENED = 2147483648;
export declare type Flags = {
    isDebug: boolean;
};
export declare type DeviceCompatibility = {
    isCompatible: boolean;
    recommendedVersion: string | null;
};
export declare type Version = {
    major: number;
    minor: number;
    patch: number;
    flags: Flags;
};
export declare type Serial = {
    serial: string;
};
export declare type BIP32Path = Array<number>;
export declare type Witness = {
    path: BIP32Path;
    witnessSignatureHex: string;
};
export declare type SignedTransactionData = {
    txHashHex: string;
    witness: Witness;
};
export declare type TransferFIOTokensData = {
    payee_public_key: string;
    amount: bigint_like;
    max_fee: bigint_like;
    tpid: string;
    actor: string;
};
export declare type ActionAuthorisation = {
    actor: string;
    permission: string;
};
export declare type Action = {
    account: string;
    name: string;
    authorization: Array<ActionAuthorisation>;
    data: TransferFIOTokensData;
};
export declare type Transaction = {
    expiration: string;
    ref_block_num: bigint_like;
    ref_block_prefix: bigint_like;
    context_free_actions: Array<Action>;
    actions: Array<Action>;
    transaction_extensions: null;
};
//# sourceMappingURL=public.d.ts.map