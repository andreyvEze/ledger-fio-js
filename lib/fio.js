"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fio = void 0;
const errors_1 = require("./errors");
const getPublicKey_1 = require("./interactions/getPublicKey");
const getSerial_1 = require("./interactions/getSerial");
const getVersion_1 = require("./interactions/getVersion");
const runTests_1 = require("./interactions/runTests");
const signTransaction_1 = require("./interactions/signTransaction");
const utils_1 = require("./utils");
const assert_1 = require("./utils/assert");
const parse_1 = require("./utils/parse");
__exportStar(require("./errors"), exports);
__exportStar(require("./types/public"), exports);
const CLA = 0xd7;
function wrapConvertDeviceStatusError(fn) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn(...args);
        }
        catch (e) {
            if (e && e.statusCode) {
                throw new errors_1.DeviceStatusError(e.statusCode);
            }
            throw e;
        }
    });
}
function wrapRetryStillInCall(fn) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn(...args);
        }
        catch (e) {
            if (e &&
                e.statusCode &&
                e.statusCode === errors_1.DeviceStatusCodes.ERR_STILL_IN_CALL) {
                return yield fn(...args);
            }
            throw e;
        }
    });
}
function interact(interaction, send) {
    return __awaiter(this, void 0, void 0, function* () {
        let cursor = interaction.next();
        let first = true;
        while (!cursor.done) {
            const apdu = cursor.value;
            const res = first
                ? yield wrapRetryStillInCall(send)(apdu)
                : yield send(apdu);
            first = false;
            cursor = interaction.next(res);
        }
        return cursor.value;
    });
}
class Fio {
    constructor(transport, scrambleKey = "FIO") {
        this.transport = transport;
        const methods = [
            "getVersion",
            "getSerial",
            "getPublicKey",
            "signTransaction",
        ];
        this.transport.decorateAppAPIMethods(this, methods, scrambleKey);
        this._send = (params) => __awaiter(this, void 0, void 0, function* () {
            let response = yield wrapConvertDeviceStatusError(this.transport.send)(CLA, params.ins, params.p1, params.p2, params.data);
            response = (0, utils_1.stripRetcodeFromResponse)(response);
            if (params.expectedResponseLength != null) {
                (0, assert_1.assert)(response.length === params.expectedResponseLength, `unexpected response length: ${response.length} instead of ${params.expectedResponseLength}`);
            }
            return response;
        });
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield interact(this._getVersion(), this._send);
            return { version, compatibility: (0, getVersion_1.getCompatibility)(version) };
        });
    }
    *_getVersion() {
        return yield* (0, getVersion_1.getVersion)();
    }
    getSerial() {
        return __awaiter(this, void 0, void 0, function* () {
            return interact(this._getSerial(), this._send);
        });
    }
    *_getSerial() {
        const version = yield* (0, getVersion_1.getVersion)();
        return yield* (0, getSerial_1.getSerial)(version);
    }
    getPublicKey({ path, show_or_not }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, parse_1.validate)((0, parse_1.isArray)(path), errors_1.InvalidDataReason.GET_PUB_KEY_PATH_IS_NOT_ARRAY);
            const parsedPath = (0, parse_1.parseBIP32Path)(path, errors_1.InvalidDataReason.INVALID_PATH);
            return interact(this._getPublicKey(parsedPath, show_or_not), this._send);
        });
    }
    *_getPublicKey(path, show_or_not) {
        const version = yield* (0, getVersion_1.getVersion)();
        return yield* (0, getPublicKey_1.getPublicKey)(version, path, show_or_not);
    }
    signTransaction({ path, chainId, tx }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedChainId = (0, parse_1.parseHexString)(chainId, errors_1.InvalidDataReason.INVALID_CHAIN_ID);
            const parsedPath = (0, parse_1.parseBIP32Path)(path, errors_1.InvalidDataReason.INVALID_PATH);
            const parsedTx = (0, parse_1.parseTransaction)(parsedChainId, tx);
            return interact(this._signTransaction(parsedPath, parsedChainId, parsedTx), this._send);
        });
    }
    *_signTransaction(parsedPath, chainId, tx) {
        const version = yield* (0, getVersion_1.getVersion)();
        return yield* (0, signTransaction_1.signTransaction)(version, parsedPath, chainId, tx);
    }
    runTests() {
        return __awaiter(this, void 0, void 0, function* () {
            return interact(this._runTests(), this._send);
        });
    }
    *_runTests() {
        const version = yield* (0, getVersion_1.getVersion)();
        return yield* (0, runTests_1.runTests)(version);
    }
}
exports.Fio = Fio;
exports.default = Fio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Zpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLHFDQUFnRjtBQUVoRiw4REFBd0Q7QUFDeEQsd0RBQWtEO0FBQ2xELDBEQUFzRTtBQUN0RSxzREFBZ0Q7QUFDaEQsb0VBQThEO0FBRzlELG1DQUFnRDtBQUNoRCwyQ0FBcUM7QUFDckMseUNBQWlHO0FBRWpHLDJDQUF3QjtBQUN4QixpREFBOEI7QUFFOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFBO0FBRWhCLFNBQVMsNEJBQTRCLENBQXFCLEVBQUs7SUFFM0QsT0FBTyxDQUFPLEdBQUcsSUFBSSxFQUFFLEVBQUU7UUFDckIsSUFBSTtZQUNBLE9BQU8sTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtTQUMzQjtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsTUFBTSxJQUFJLDBCQUFpQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUM1QztZQUNELE1BQU0sQ0FBQyxDQUFBO1NBQ1Y7SUFDTCxDQUFDLENBQUEsQ0FBQTtBQUNMLENBQUM7QUFxQkQsU0FBUyxvQkFBb0IsQ0FBcUIsRUFBSztJQUVuRCxPQUFPLENBQU8sR0FBRyxJQUFTLEVBQUUsRUFBRTtRQUMxQixJQUFJO1lBQ0EsT0FBTyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1NBQzNCO1FBQUMsT0FBTyxDQUFNLEVBQUU7WUFDYixJQUNJLENBQUM7Z0JBQ0QsQ0FBQyxDQUFDLFVBQVU7Z0JBQ1osQ0FBQyxDQUFDLFVBQVUsS0FBSywwQkFBaUIsQ0FBQyxpQkFBaUIsRUFDdEQ7Z0JBRUUsT0FBTyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO2FBQzNCO1lBQ0QsTUFBTSxDQUFDLENBQUE7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