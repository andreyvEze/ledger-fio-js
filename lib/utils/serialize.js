"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.date_to_buf = exports.path_to_buf = exports.buf_to_hex = exports.hex_to_buf = exports.uint64_to_buf = exports.buf_to_uint32 = exports.uint32_to_buf = exports.buf_to_uint16 = exports.uint16_to_buf = exports.uint8_to_buf = void 0;
const base_x_1 = __importDefault(require("base-x"));
const assert_1 = require("./assert");
const parse_1 = require("./parse");
const bs10 = (0, base_x_1.default)("0123456789");
function uint8_to_buf(value) {
    (0, assert_1.assert)((0, parse_1.isUint8)(value), 'invalid uint8');
    const data = Buffer.alloc(1);
    data.writeUInt8(value, 0);
    return data;
}
exports.uint8_to_buf = uint8_to_buf;
function uint16_to_buf(value) {
    (0, assert_1.assert)((0, parse_1.isUint16)(value), 'invalid uint16');
    const data = Buffer.alloc(2);
    data.writeUInt16BE(value, 0);
    return data;
}
exports.uint16_to_buf = uint16_to_buf;
function buf_to_uint16(data) {
    (0, assert_1.assert)(data.length === 2, "invalid uint16 buffer");
    return data.readUIntBE(0, 2);
}
exports.buf_to_uint16 = buf_to_uint16;
function uint32_to_buf(value) {
    (0, assert_1.assert)((0, parse_1.isUint32)(value), 'invalid uint32');
    const data = Buffer.alloc(4);
    data.writeUInt32BE(value, 0);
    return data;
}
exports.uint32_to_buf = uint32_to_buf;
function buf_to_uint32(data) {
    (0, assert_1.assert)(data.length === 4, "invalid uint32 buffer");
    return data.readUIntBE(0, 4);
}
exports.buf_to_uint32 = buf_to_uint32;
function uint64_to_buf(value) {
    (0, assert_1.assert)((0, parse_1.isUint64str)(value), 'invalid uint64_str');
    const data = bs10.decode(value);
    (0, assert_1.assert)(data.length <= 8, "excessive data");
    const padding = Buffer.alloc(8 - data.length);
    return Buffer.concat([padding, data]);
}
exports.uint64_to_buf = uint64_to_buf;
function hex_to_buf(data) {
    (0, assert_1.assert)((0, parse_1.isHexString)(data), "invalid hex string");
    return Buffer.from(data, "hex");
}
exports.hex_to_buf = hex_to_buf;
function buf_to_hex(data) {
    return data.toString("hex");
}
exports.buf_to_hex = buf_to_hex;
function path_to_buf(path) {
    (0, assert_1.assert)((0, parse_1.isValidPath)(path), "invalid bip32 path");
    const data = Buffer.alloc(1 + 4 * path.length);
    data.writeUInt8(path.length, 0);
    for (let i = 0; i < path.length; i++) {
        data.writeUInt32BE(path[i], 1 + i * 4);
    }
    return data;
}
exports.path_to_buf = path_to_buf;
function date_to_buf(date) {
    const parsedDate = Date.parse(date + 'Z');
    (0, assert_1.assert)(!Number.isNaN(parsedDate), "Invalid timepoint");
    return uint32_to_buf(Math.round(parsedDate / 1000));
}
exports.date_to_buf = date_to_buf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3NlcmlhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvREFBMEI7QUFHMUIscUNBQStCO0FBQy9CLG1DQUEwRjtBQUcxRixNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFLLEVBQUMsWUFBWSxDQUFDLENBQUE7QUFFaEMsU0FBZ0IsWUFBWSxDQUFDLEtBQWM7SUFDdkMsSUFBQSxlQUFNLEVBQUMsSUFBQSxlQUFPLEVBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN6QixPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7QUFMRCxvQ0FLQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUF5QjtJQUNuRCxJQUFBLGVBQU0sRUFBQyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUV6QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzVCLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQU5ELHNDQU1DO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLElBQVk7SUFDdEMsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTtJQUVsRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBYSxDQUFBO0FBQzVDLENBQUM7QUFKRCxzQ0FJQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUFvQztJ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