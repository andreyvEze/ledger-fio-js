import type { HexString, ParsedTransaction, ValidBIP32Path } from "../types/internal";
import type { SignedTransactionData, Version } from "../types/public";
import type { Interaction } from "./common/types";
export declare function signTransaction(version: Version, parsedPath: ValidBIP32Path, chainId: HexString, tx: ParsedTransaction): Interaction<SignedTransactionData>;
//# sourceMappingURL=signTransaction.d.ts.map