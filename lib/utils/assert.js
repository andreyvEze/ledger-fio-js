"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const errors_1 = require("../errors");
function assert(cond, errMsg) {
    if (!cond)
        throw new errors_1.ErrorBase('Assertion failed' + errMsg ? ': ' + errMsg : '');
}
exports.assert = assert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Fzc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBbUM7QUFFbkMsU0FBZ0IsTUFBTSxDQUFDLElBQWEsRUFBRSxNQUFjO0lBQ2hELElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLGtCQUFTLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRkQsd0JBRUMifQ==