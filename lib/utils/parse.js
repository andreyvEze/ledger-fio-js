"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTransaction = exports.parseAuthorization = exports.parseNameString = exports.parseContractAccountName = exports.parseIntFromStr = exports.parseBIP32Path = exports.parseUint8_t = exports.parseUint16_t = exports.parseUint32_t = exports.parseUint64_str = exports.parseHexStringOfLength = exports.parseHexString = exports.parseAscii = exports.validate = exports.isNameString = exports.MAX_NAME_STRING_LENGTH = exports.isUintStr = exports.isUint64Bigint = exports.isUint64Number = exports.isUint64str = exports.isValidPath = exports.isHexStringOfLength = exports.isHexString = exports.isUint8 = exports.isUint16 = exports.isUint32 = exports.isBuffer = exports.isArray = exports.isBigIntLike = exports.isInteger = exports.isString = exports.MAX_UINT_64_STR = void 0;
const errors_1 = require("../errors");
exports.MAX_UINT_64_STR = "18446744073709551615";
const isString = (data) => typeof data === "string";
exports.isString = isString;
const isInteger = (data) => Number.isInteger(data);
exports.isInteger = isInteger;
const isBigIntLike = (data) => {
    if (typeof data === "number")
        return true;
    if (typeof data == "bigint")
        return true;
    if (typeof data == "string" && !isNaN(parseInt(data)))
        return true;
    return false;
};
exports.isBigIntLike = isBigIntLike;
const isArray = (data) => Array.isArray(data);
exports.isArray = isArray;
const isBuffer = (data) => Buffer.isBuffer(data);
exports.isBuffer = isBuffer;
const isUint32 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 4294967295;
exports.isUint32 = isUint32;
const isUint16 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 65535;
exports.isUint16 = isUint16;
const isUint8 = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= 255;
exports.isUint8 = isUint8;
const isHexString = (data) => (0, exports.isString)(data) && data.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(data);
exports.isHexString = isHexString;
const isHexStringOfLength = (data, expectedByteLength) => (0, exports.isHexString)(data) && data.length === expectedByteLength * 2;
exports.isHexStringOfLength = isHexStringOfLength;
const isValidPath = (data) => (0, exports.isArray)(data) && data.every(x => (0, exports.isUint32)(x)) && data.length <= 5;
exports.isValidPath = isValidPath;
const isUint64str = (data) => (0, exports.isUintStr)(data, {});
exports.isUint64str = isUint64str;
const isUint64Number = (data) => (0, exports.isInteger)(data) && data >= 0 && data <= Number.MAX_SAFE_INTEGER;
exports.isUint64Number = isUint64Number;
const isUint64Bigint = (data) => (typeof data === 'bigint') && (0, exports.isUint64str)(data.toString());
exports.isUint64Bigint = isUint64Bigint;
const isUintStr = (data, constraints) => {
    var _a, _b;
    const min = (_a = constraints.min) !== null && _a !== void 0 ? _a : "0";
    const max = (_b = constraints.max) !== null && _b !== void 0 ? _b : exports.MAX_UINT_64_STR;
    return (0, exports.isString)(data)
        && /^[0-9]*$/.test(data)
        && data.length > 0
        && data.length <= max.length
        && (data.length === 1 || data[0] !== "0")
        && (data.length < max.length ||
            data <= max)
        && (data.length > min.length ||
            data >= min);
};
exports.isUintStr = isUintStr;
exports.MAX_NAME_STRING_LENGTH = 12;
const isNameString = (data) => {
    return (0, exports.isString)(data)
        && data.length > 0
        && data.length <= exports.MAX_NAME_STRING_LENGTH
        && /([1-5]|[a-z]|\.)+/.test(data);
};
exports.isNameString = isNameString;
function validate(cond, errMsg) {
    if (!cond)
        throw new errors_1.InvalidData(errMsg);
}
exports.validate = validate;
function parseAscii(str, errMsg) {
    validate((0, exports.isString)(str), errMsg);
    validate(str.split("").every((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126), errMsg);
    return str;
}
exports.parseAscii = parseAscii;
function parseHexString(str, errMsg) {
    validate((0, exports.isHexString)(str), errMsg);
    return str;
}
exports.parseHexString = parseHexString;
function parseHexStringOfLength(str, length, errMsg) {
    validate((0, exports.isHexStringOfLength)(str, length), errMsg);
    return str;
}
exports.parseHexStringOfLength = parseHexStringOfLength;
function parseUint64_str(val, constraints, errMsg) {
    switch (typeof val) {
        case 'string':
            validate((0, exports.isUint64str)(val) && (0, exports.isUintStr)(val, constraints), errMsg);
            return val;
        case 'number':
            validate((0, exports.isUint64Number)(val) && (0, exports.isUintStr)(val.toString(), constraints), errMsg);
            return val.toString();
        case 'bigint':
            validate((0, exports.isUint64Bigint)(val) && (0, exports.isUintStr)(val.toString(), constraints), errMsg);
            return val.toString();
        default:
            validate(false, errMsg);
    }
}
exports.parseUint64_str = parseUint64_str;
function parseUint32_t(value, errMsg) {
    validate((0, exports.isUint32)(value), errMsg);
    return value;
}
exports.parseUint32_t = parseUint32_t;
function parseUint16_t(value, errMsg) {
    validate((0, exports.isUint16)(value), errMsg);
    return value;
}
exports.parseUint16_t = parseUint16_t;
function parseUint8_t(value, errMsg) {
    validate((0, exports.isUint8)(value), errMsg);
    return value;
}
exports.parseUint8_t = parseUint8_t;
function parseBIP32Path(value, errMsg) {
    validate((0, exports.isValidPath)(value), errMsg);
    return value;
}
exports.parseBIP32Path = parseBIP32Path;
function parseIntFromStr(str, errMsg) {
    validate((0, exports.isString)(str), errMsg);
    const i = parseInt(str);
    validate("" + i === str, errMsg);
    validate(!isNaN(i), errMsg);
    validate((0, exports.isInteger)(i), errMsg);
    return i;
}
exports.parseIntFromStr = parseIntFromStr;
function parseContractAccountName(account, name, errMsg) {
    if (account == "fio.token" && name == "trnsfiopubky") {
        return "0000980ad20ca85be0e1d195ba85e7cd";
    }
    validate(false, errMsg);
}
exports.parseContractAccountName = parseContractAccountName;
function parseNameString(name, errMsg) {
    validate((0, exports.isNameString)(name), errMsg);
    function charToSymbol(c) {
        if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
            return (c - 'a'.charCodeAt(0)) + 6;
        }
        if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
            return (c - '1'.charCodeAt(0)) + 1;
        }
        return 0;
    }
    const a = new Uint8Array(8);
    let bit = 63;
    for (let i = 0; i < name.length; ++i) {
        let c = charToSymbol(name.charCodeAt(i));
        if (bit < 5) {
            c = c << 1;
        }
        for (let j = 4; j >= 0; --j) {
            if (bit >= 0) {
                a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                --bit;
            }
        }
    }
    return Buffer.from(a).toString('hex');
}
exports.parseNameString = parseNameString;
function parseAuthorization(authorization, errMsg) {
    return {
        actor: parseNameString(authorization.actor, errMsg),
        permission: parseNameString(authorization.permission, errMsg),
    };
}
exports.parseAuthorization = parseAuthorization;
function parseTransaction(chainId, tx) {
    validate((0, exports.isString)(tx.expiration), errors_1.InvalidDataReason.INVALID_EXPIRATION);
    validate((0, exports.isBigIntLike)(tx.ref_block_num), errors_1.InvalidDataReason.INVALID_REF_BLOCK_NUM);
    validate((0, exports.isBigIntLike)(tx.ref_block_prefix), errors_1.InvalidDataReason.INVALID_REF_BLOCK_PREFIX);
    validate(tx.context_free_actions.length == 0, errors_1.InvalidDataReason.CONTEXT_FREE_ACTIONS_NOT_SUPPORTED);
    validate(tx.actions.length == 1, errors_1.InvalidDataReason.MULTIPLE_ACTIONS_NOT_SUPPORTED);
    const action = tx.actions[0];
    validate((0, exports.isString)(action.account), errors_1.InvalidDataReason.INVALID_ACCOUNT);
    validate((0, exports.isString)(action.name), errors_1.InvalidDataReason.INVALID_NAME);
    validate(action.authorization.length == 1, errors_1.InvalidDataReason.MULTIPLE_AUTHORIZATION_NOT_SUPPORTED);
    const authorization = action.authorization[0];
    validate((0, exports.isString)(authorization.actor), errors_1.InvalidDataReason.INVALID_ACTOR);
    validate((0, exports.isString)(authorization.permission), errors_1.InvalidDataReason.INVALID_PERMISSION);
    validate((0, exports.isString)(action.data.payee_public_key), errors_1.InvalidDataReason.INVALID_PAYEE_PUBKEY);
    validate(action.data.payee_public_key.length <= 64, errors_1.InvalidDataReason.INVALID_PAYEE_PUBKEY);
    validate((0, exports.isBigIntLike)(action.data.amount), errors_1.InvalidDataReason.INVALID_AMOUNT);
    validate((0, exports.isBigIntLike)(action.data.max_fee), errors_1.InvalidDataReason.INVALID_MAX_FEE);
    validate((0, exports.isString)(action.data.tpid), errors_1.InvalidDataReason.INVALID_TPID);
    validate(action.data.tpid.length <= 20, errors_1.InvalidDataReason.INVALID_TPID);
    validate((0, exports.isString)(action.data.actor), errors_1.InvalidDataReason.INVALID_ACTOR);
    const parsedActionData = {
        payee_public_key: action.data.payee_public_key,
        amount: parseUint64_str(action.data.amount, {}, errors_1.InvalidDataReason.INVALID_AMOUNT),
        max_fee: parseUint64_str(action.data.max_fee, {}, errors_1.InvalidDataReason.INVALID_MAX_FEE),
        actor: parseNameString(action.data.actor, errors_1.InvalidDataReason.INVALID_ACTOR),
        tpid: action.data.tpid,
    };
    const parsedAction = {
        contractAccountName: parseContractAccountName(action.account, action.name, errors_1.InvalidDataReason.ACTION_NOT_SUPPORTED),
        authorization: [parseAuthorization(authorization, errors_1.InvalidDataReason.INVALID_ACTION_AUTHORIZATION)],
        data: parsedActionData,
    };
    return {
        expiration: tx.expiration,
        ref_block_num: parseUint16_t(tx.ref_block_num, errors_1.InvalidDataReason.INVALID_REF_BLOCK_NUM),
        ref_block_prefix: parseUint32_t(tx.ref_block_prefix, errors_1.InvalidDataReason.INVALID_REF_BLOCK_PREFIX),
        context_free_actions: [],
        actions: [parsedAction],
        transaction_extensions: null,
    };
}
exports.parseTransaction = parseTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXlEO0FBbUI1QyxRQUFBLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQTtBQUU5QyxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWEsRUFBa0IsRUFBRSxDQUN0RCxPQUFPLElBQUksS0FBSyxRQUFRLENBQUE7QUFEZixRQUFBLFFBQVEsWUFDTztBQUVyQixNQUFNLFNBQVMsR0FBRyxDQUFDLElBQWEsRUFBa0IsRUFBRSxDQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRGIsUUFBQSxTQUFTLGFBQ0k7QUFFbkIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFhLEVBQXVCLEVBQUU7SUFDL0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDekMsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDeEMsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUE7SUFDbEUsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBTFksUUFBQSxZQUFZLGdCQUt4QjtBQUVNLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBYSxFQUEwQixFQUFFLENBQzdELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFEVixRQUFBLE9BQU8sV0FDRztBQUVoQixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWEsRUFBa0IsRUFBRSxDQUN0RCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRFosUUFBQSxRQUFRLFlBQ0k7QUFFbEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFhLEVBQW9CLEVBQUUs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