"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripRetcodeFromResponse = exports.chunkBy = void 0;
const assert_1 = require("./assert");
const parse_1 = require("./parse");
const serialize_1 = require("./serialize");
const sum = (arr) => arr.reduce((x, y) => x + y, 0);
function chunkBy(data, chunkLengths) {
    (0, assert_1.assert)((0, parse_1.isBuffer)(data), "invalid buffer");
    (0, assert_1.assert)((0, parse_1.isArray)(chunkLengths), "invalid chunks");
    for (const len of chunkLengths) {
        (0, assert_1.assert)((0, parse_1.isInteger)(len), "bad chunk length");
        (0, assert_1.assert)(len > 0, "bad chunk length");
    }
    (0, assert_1.assert)(data.length >= sum(chunkLengths), "data too short");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9IZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2lvSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBK0I7QUFDL0IsbUNBQW9EO0FBQ3BELDJDQUF5QztBQUV6QyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQWtCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBRWxFLFNBQWdCLE9BQU8sQ0FBQyxJQUFZLEVBQUUsWUFBMkI7SUFDN0QsSUFBQSxlQUFNLEVBQUMsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDeEMsSUFBQSxlQUFNLEVBQUMsSUFBQSxlQUFPLEVBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUMvQyxLQUFLLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRTtRQUM1QixJQUFBLGVBQU0sRUFBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxJQUFBLGVBQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUE7S0FDdEM7SUFDRCxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTFELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNkLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUVqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUVsRCxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUU7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUzQyxNQUFNLElBQUksQ0FBQyxDQUFBO0tBQ2Q7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBckJELDBCQXFCQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLFFBQWdCO0lBQ3JELElBQUEsZUFBTSxFQUFDLElBQUEsZ0JBQVEsRUFBQyxRQUFRLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzVDLElBQUEsZUFBTSxFQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFFbEQsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBQSx5QkFBYSxFQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZELElBQUEsZUFBTSxFQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUUsbUJBQW1CLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFDeEQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUMvQixDQUFDO0FBUkQsNERBUUMifQ==