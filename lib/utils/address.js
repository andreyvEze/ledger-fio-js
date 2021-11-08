"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str_to_path = void 0;
const errors_1 = require("../errors");
const public_1 = require("../types/public");
const parse_1 = require("./parse");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUEyQztBQUMzQyw0Q0FBd0M7QUFDeEMsbUNBQTJEO0FBRTNELFNBQVMsZUFBZSxDQUFDLEdBQVcsRUFBRSxNQUF5QjtJQUMzRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUE7SUFDWixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsSUFBSSxHQUFHLGlCQUFRLENBQUE7S0FDbEI7SUFDRCxNQUFNLENBQUMsR0FBRyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLElBQUEsZ0JBQVEsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3hCLElBQUEsZ0JBQVEsRUFBQyxDQUFDLEdBQUcsaUJBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUM5QixPQUFPLElBQUksR0FBRyxDQUFDLENBQUE7QUFDbkIsQ0FBQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFZO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLDBCQUFpQixDQUFDLFlBQVksQ0FBQTtJQUM3QyxJQUFBLGdCQUFRLEVBQUMsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2hDLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUVqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBUztRQUMxQyxPQUFPLGVBQWUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBUkQsa0NBUUMifQ==