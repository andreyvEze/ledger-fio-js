"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = void 0;
const errors_1 = require("../errors");
const public_1 = require("../types/public");
const assert_1 = require("../utils/assert");
const ioHelpers_1 = require("../utils/ioHelpers");
const parse_1 = require("../utils/parse");
const serialize_1 = require("../utils/serialize");
const getVersion_1 = require("./getVersion");
const send = (params) => (Object.assign({ ins: 32 }, params));
function* signTransaction(version, parsedPath, chainId, tx) {
    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
    {
        const P2_UNUSED = 0x00;
        yield send({
            p1: 1,
            p2: P2_UNUSED,
            data: Buffer.from(chainId, "hex"),
            expectedResponseLength: 0,
        });
    }
    {
        const P2_UNUSED = 0x00;
        yield send({
            p1: 2,
            p2: P2_UNUSED,
            data: Buffer.concat([(0, serialize_1.date_to_buf)(tx.expiration), (0, serialize_1.uint16_to_buf)(tx.ref_block_num), (0, serialize_1.uint32_to_buf)(tx.ref_block_prefix)]),
            expectedResponseLength: 0,
        });
    }
    {
        const P2_UNUSED = 0x00;
        yield send({
            p1: 3,
            p2: P2_UNUSED,
            data: Buffer.from(tx.actions[0].contractAccountName, "hex"),
            expectedResponseLength: 0,
        });
    }
    {
        const P2_UNUSED = 0x00;
        yield send({
            p1: 4,
            p2: P2_UNUSED,
            data: Buffer.concat([
                Buffer.from(tx.actions[0].authorization[0].actor, "hex"),
                Buffer.from(tx.actions[0].authorization[0].permission, "hex"),
            ]),
            expectedResponseLength: 0,
        });
    }
    const actionData = tx.actions[0].data;
    const SIMPLE_LENGTH_VARIABLE_LENGTH = 1;
    const AMOUNT_TYPE_LENGTH = 8;
    const NAME_VARIABLE_LENGTH = 8;
    const actionDataLength = SIMPLE_LENGTH_VARIABLE_LENGTH + actionData.payee_public_key.length
        + 2 * AMOUNT_TYPE_LENGTH + NAME_VARIABLE_LENGTH
        + SIMPLE_LENGTH_VARIABLE_LENGTH + actionData.tpid.length;
    (0, parse_1.validate)(actionDataLength < 128, errors_1.InvalidDataReason.ACTION_DATA_TOO_LONG);
    {
        const P2_UNUSED = 0x00;
        yield send({
            p1: 5,
            p2: P2_UNUSED,
            data: Buffer.concat([
                (0, serialize_1.uint8_to_buf)(actionDataLength),
                (0, serialize_1.uint8_to_buf)(actionData.payee_public_key.length),
                Buffer.from(actionData.payee_public_key),
                (0, serialize_1.uint8_to_buf)(0),
                (0, serialize_1.uint64_to_buf)(actionData.amount),
                (0, serialize_1.uint64_to_buf)(actionData.max_fee),
                Buffer.from(actionData.actor, "hex"),
                (0, serialize_1.uint8_to_buf)(actionData.tpid.length),
                Buffer.from(actionData.tpid),
                (0, serialize_1.uint8_to_buf)(0),
            ]),
            expectedResponseLength: 0,
        });
    }
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: 16,
        p2: P2_UNUSED,
        data: (0, serialize_1.path_to_buf)(parsedPath),
        expectedResponseLength: 65 + 32,
    });
    const [witnessSignature, hash, rest] = (0, ioHelpers_1.chunkBy)(response, [65, 32]);
    (0, assert_1.assert)(rest.length === 0, "invalid response length");
    return {
        txHashHex: (0, serialize_1.buf_to_hex)(hash),
        witness: {
            path: [44 + public_1.HARDENED, 235 + public_1.HARDENED, 0 + public_1.HARDENED, 0, 0],
            witnessSignatureHex: (0, serialize_1.buf_to_hex)(witnessSignature),
        },
    };
}
exports.signTransaction = signTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblRyYW5zYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9zaWduVHJhbnNhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsc0NBQTJDO0FBRTNDLDRDQUF3QztBQUN4Qyw0Q0FBc0M7QUFDdEMsa0RBQTBDO0FBQzFDLDBDQUF1QztBQUN2QyxrREFBa0k7QUFHbEksNkNBQTZEO0FBVzdELE1BQU0sSUFBSSxHQUFHLENBQUMsTUFLYixFQUFjLEVBQUUsQ0FBQyxpQkFBRSxHQUFHLFFBQWtCLE1BQU0sRUFBRSxDQUFBO0FBR2pELFFBQWUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFnQixFQUFFLFVBQTBCLEVBQUUsT0FBa0IsRUFBRSxFQUFxQjtJQUNwSCxJQUFBLDZDQUFnQyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBR3pDO1FBQ0ksTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLE1BQU0sSUFBSSxDQUFDO1lBQ1AsRUFBRSxHQUFlO1lBQ2pCLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztZQUNqQyxzQkFBc0IsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQTtLQUNMO0lBRUQ7UUFDSSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDdEIsTUFBTSxJQUFJLENBQUM7WUFDUCxFQUFFLEdBQWlCO1lBQ25CLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFBLHVCQUFXLEVBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUEseUJBQWEsRUFBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBQSx5QkFBYSxFQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDdEgsc0JBQXNCLEVBQUUsQ0FBQztTQUM1QixD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