"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripRetcodeFromResponse = exports.chunkBy = exports.str_to_path = void 0;
const errors_1 = require("./errors");
const public_1 = require("./types/public");
const assert_1 = require("./utils/assert");
const parse_1 = require("./utils/parse");
const serialize_1 = require("./utils/serialize");
function parseBIP32Index(str, errMsg) {
    let base = 0;
    if (str.endsWith("'")) {
        str = str.slice(0, -1);
        base = public_1.HARDENED;
    }
    const i = (0, parse_1.parseIntFromStr)(str, errMsg);
    (0, parse_1.validate)(i >= 0, errMsg);
    (0, parse_1.validate)(i < public_1.HARDENED, errMsg);
    return base + i;
}
function str_to_path(data) {
    const errMsg = errors_1.InvalidDataReason.INVALID_PATH;
    (0, parse_1.validate)((0, parse_1.isString)(data), errMsg);
    (0, parse_1.validate)(data.length > 0, errMsg);
    return data.split("/").map(function (x) {
        return parseBIP32Index(x, errMsg);
    });
}
exports.str_to_path = str_to_path;
const sum = (arr) => arr.reduce((x, y) => x + y, 0);
function chunkBy(data, chunkLengths) {
    (0, assert_1.assert)((0, parse_1.isBuffer)(data), "invalid buffer");
    (0, assert_1.assert)((0, parse_1.isArray)(chunkLengths), "invalid chunks");
    for (const len of chunkLengths) {
        (0, assert_1.assert)((0, parse_1.isInteger)(len), "bad chunk length");
        (0, assert_1.assert)(len > 0, "bad chunk length");
    }
    (0, assert_1.assert)(data.length <= sum(chunkLengths), "data too short");
    let offset = 0;
    const result = [];
    const restLength = data.length - sum(chunkLengths);
    for (let c of [...chunkLengths, restLength]) {
        result.push(data.slice(offset, offset + c));
        offset += c;
    }
    return result;
}
exports.chunkBy = chunkBy;
function stripRetcodeFromResponse(response) {
    (0, assert_1.assert)((0, parse_1.isBuffer)(response), "invalid buffer");
    (0, assert_1.assert)(response.length >= 2, "response too short");
    const L = response.length - 2;
    const retcode = (0, serialize_1.buf_to_uint16)(response.slice(L, L + 2));
    (0, assert_1.assert)(retcode === 0x9000, `Invalid retcode ${retcode}`);
    return response.slice(0, L);
}
exports.stripRetcodeFromResponse = stripRetcodeFromResponse;
exports.default = {
    hex_to_buf: (data) => (0, serialize_1.hex_to_buf)(data),
    buf_to_hex: (data) => (0, serialize_1.buf_to_hex)(data),
    path_to_buf: (data) => (0, serialize_1.path_to_buf)(data),
    uint32_to_buf: (data) => (0, serialize_1.uint32_to_buf)(data),
    assert: assert_1.assert,
    str_to_path,
    chunkBy,
    stripRetcodeFromResponse,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTBDO0FBQzFDLDJDQUF1QztBQUN2QywyQ0FBcUM7QUFDckMseUNBQStGO0FBQy9GLGlEQUFtRztBQUVuRyxTQUFTLGVBQWUsQ0FBQyxHQUFXLEVBQUUsTUFBeUI7SUFDM0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ1osSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksR0FBRyxpQkFBUSxDQUFBO0tBQ2xCO0lBQ0QsTUFBTSxDQUFDLEdBQUcsSUFBQSx1QkFBZSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QyxJQUFBLGdCQUFRLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN4QixJQUFBLGdCQUFRLEVBQUMsQ0FBQyxHQUFHLGlCQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDOUIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFnQixXQUFXLENBQUMsSUFBWTtJQUNwQyxNQUFNLE1BQU0sR0FBRywwQkFBaUIsQ0FBQyxZQUFZLENBQUE7SUFDN0MsSUFBQSxnQkFBUSxFQUFDLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNoQyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFFakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQVM7UUFDMUMsT0FBTyxlQUFlLENBQUMsQ0FBQyxFQUFFLE1B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