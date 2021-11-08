export declare type VarlenAsciiString = string & {
    __type: 'ascii';
};
export declare type FixlenHexString<N> = string & {
    __type: 'hex';
    __length: N;
};
export declare type NameString = FixlenHexString<16>;
export declare type HexString = string & {
    __type: 'hex';
};
export declare type _Uint64_num = number & {
    __type: 'uint64_t';
};
export declare type _Uint64_bigint = bigint & {
    __type: 'uint64_t';
};
export declare type ValidBIP32Path = Array<Uint32_t> & {
    __type: 'bip32_path';
};
export declare type Uint64_str = string & {
    __type: 'uint64_t';
};
export declare type Uint32_t = number & {
    __type: 'uint32_t';
};
export declare type Uint16_t = number & {
    __type: 'uint16_t';
};
export declare type Uint8_t = number & {
    __type: 'uint8_t';
};
export declare const PUBLIC_KEY_LENGTH = 65;
export declare const WIF_PUBLIC_KEY_LENGTH = 53;
export declare type ParsedTransferFIOTokensData = {
    payee_public_key: string;
    amount: Uint64_str;
    max_fee: Uint64_str;
    tpid: string;
    actor: NameString;
};
export declare type ParsedActionAuthorisation = {
    actor: NameString;
    permission: NameString;
};
export declare type ParsedAction = {
    contractAccountName: HexString;
    authorization: Array<ParsedActionAuthorisation>;
    data: ParsedTransferFIOTokensData;
};
export declare type ParsedTransaction = {
    expiration: string;
    ref_block_num: Uint16_t;
    ref_block_prefix: Uint32_t;
    context_free_actions: Array<ParsedAction>;
    actions: Array<ParsedAction>;
    transaction_extensions: null;
};
//# sourceMappingURL=internal.d.ts.map