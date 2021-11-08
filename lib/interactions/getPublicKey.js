"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicKey = void 0;
const internal_1 = require("../types/internal");
const internal_2 = require("../types/internal");
const assert_1 = require("../utils/assert");
const ioHelpers_1 = require("../utils/ioHelpers");
const serialize_1 = require("../utils/serialize");
const getVersion_1 = require("./getVersion");
const send = (params) => (Object.assign({ ins: 16 }, params));
function* getPublicKey(version, path, show_or_not) {
    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
    const pathData = (0, serialize_1.path_to_buf)(path);
    const response = yield send({
        p1: show_or_not ? 1 : 2,
        p2: 0,
        data: pathData,
        expectedResponseLength: internal_2.PUBLIC_KEY_LENGTH + internal_1.WIF_PUBLIC_KEY_LENGTH,
    });
    const [publicKey, publicKeyWIF, rest] = (0, ioHelpers_1.chunkBy)(response, [internal_2.PUBLIC_KEY_LENGTH, internal_1.WIF_PUBLIC_KEY_LENGTH]);
    (0, assert_1.assert)(rest.length === 0, "invalid response length");
    return {
        publicKeyHex: publicKey.toString("hex"),
        publicKeyWIF: publicKeyWIF.toString(),
    };
}
exports.getPublicKey = getPublicKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UHVibGljS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9nZXRQdWJsaWNLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsZ0RBQXVEO0FBQ3ZELGdEQUFtRDtBQUVuRCw0Q0FBc0M7QUFDdEMsa0RBQTBDO0FBQzFDLGtEQUE4QztBQUc5Qyw2Q0FBNkQ7QUFFN0QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUtiLEVBQWMsRUFBRSxDQUFDLGlCQUFFLEdBQUcsUUFBNkIsTUFBTSxFQUFFLENBQUE7QUFZNUQsUUFBZSxDQUFDLENBQUMsWUFBWSxDQUN6QixPQUFnQixFQUNoQixJQUFvQixFQUNwQixXQUFvQjtJQUVwQixJQUFBLDZDQUFnQyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXpDLE1BQU0sUUFBUSxHQUFHLElBQUEsdUJBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUVsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQztRQUN4QixFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBUyxDQUFDLEVBQWU7UUFDMUMsRUFBRSxHQUFXO1FBQ2IsSUFBSSxFQUFFLFFBQVE7UUFDZCxzQkFBc0IsRUFBRSw0QkFBaUIsR0FBRyxnQ0FBcUI7S0FDcEUsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBQSxtQkFBTyxFQUFDLFFBQVEsRUFBRSxDQUFDLDRCQUFpQixFQUFFLGdDQUFxQixDQUFDLENBQUMsQ0FBQTtJQUNyRyxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO0lBRXBELE9BQU87UUFDSCxZQUFZLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDdkMsWUFBWSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUU7S0FDeEMsQ0FBQTtBQUNMLENBQUM7QUF2QkQsb0NBdUJDIn0=