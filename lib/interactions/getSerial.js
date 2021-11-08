"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerial = void 0;
const serialize_1 = require("../utils/serialize");
const getVersion_1 = require("./getVersion");
const send = (params) => (Object.assign({ ins: 1 }, params));
function* getSerial(version) {
    (0, getVersion_1.ensureLedgerAppVersionCompatible)(version);
    const P1_UNUSED = 0x00;
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: P1_UNUSED,
        p2: P2_UNUSED,
        data: Buffer.alloc(0),
        expectedResponseLength: 7,
    });
    const serial = (0, serialize_1.buf_to_hex)(response);
    return { serial };
}
exports.getSerial = getSerial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2VyaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9nZXRTZXJpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0RBQStDO0FBRy9DLDZDQUE2RDtBQUU3RCxNQUFNLElBQUksR0FBRyxDQUFDLE1BS2IsRUFBYyxFQUFFLENBQUMsaUJBQUUsR0FBRyxPQUFxQixNQUFNLEVBQUUsQ0FBQTtBQUdwRCxRQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBZ0I7SUFDdkMsSUFBQSw2Q0FBZ0MsRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUE7SUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO1FBQ3hCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFNBQVM7UUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsc0JBQXNCLEVBQUUsQ0FBQztLQUM1QixDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFVLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxDQUFBO0FBQ25CLENBQUM7QUFkRCw4QkFjQyJ9