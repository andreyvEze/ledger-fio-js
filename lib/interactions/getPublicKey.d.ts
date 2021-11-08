import type { GetPublicKeyResponse } from "../fio";
import type { ValidBIP32Path } from "../types/internal";
import type { Version } from "../types/public";
import type { Interaction } from "./common/types";
export declare function getPublicKey(version: Version, path: ValidBIP32Path, show_or_not: boolean): Interaction<GetPublicKeyResponse>;
//# sourceMappingURL=getPublicKey.d.ts.map