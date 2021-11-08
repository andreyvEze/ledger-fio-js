/// <reference types="node" />
import { assert } from "./utils/assert";
export declare function str_to_path(data: string): Array<number>;
export declare function chunkBy(data: Buffer, chunkLengths: Array<number>): Buffer[];
export declare function stripRetcodeFromResponse(response: Buffer): Buffer;
declare const _default: {
    hex_to_buf: (data: any) => Buffer;
    buf_to_hex: (data: any) => string;
    path_to_buf: (data: any) => Buffer;
    uint32_to_buf: (data: any) => Buffer;
    assert: typeof assert;
    str_to_path: typeof str_to_path;
    chunkBy: typeof chunkBy;
    stripRetcodeFromResponse: typeof stripRetcodeFromResponse;
};
export default _default;
//# sourceMappingURL=utils.d.ts.map