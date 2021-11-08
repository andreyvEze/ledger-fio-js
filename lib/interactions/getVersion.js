"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLedgerAppVersionCompatible = exports.isLedgerAppVersionAtMost = exports.isLedgerAppVersionAtLeast = exports.getCompatibility = exports.getVersion = void 0;
const errors_1 = require("../errors");
const send = (params) => (Object.assign({ ins: 0 }, params));
function* getVersion() {
    const P1_UNUSED = 0x00;
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: P1_UNUSED,
        p2: P2_UNUSED,
        data: Buffer.alloc(0),
        expectedResponseLength: 4,
    });
    const [major, minor, patch, flags_value] = response;
    const FLAG_IS_DEBUG = 1;
    const flags = {
        isDebug: (flags_value & FLAG_IS_DEBUG) === FLAG_IS_DEBUG,
    };
    return { major, minor, patch, flags };
}
exports.getVersion = getVersion;
function getCompatibility(version) {
    const v0_0 = isLedgerAppVersionAtLeast(version, 0, 0) &&
        isLedgerAppVersionAtMost(version, 0, Infinity);
    return {
        isCompatible: v0_0,
        recommendedVersion: v0_0 ? null : '0.0',
    };
}
exports.getCompatibility = getCompatibility;
function isLedgerAppVersionAtLeast(version, minMajor, minMinor) {
    const { major, minor } = version;
    return major > minMajor || (major === minMajor && minor >= minMinor);
}
exports.isLedgerAppVersionAtLeast = isLedgerAppVersionAtLeast;
function isLedgerAppVersionAtMost(version, maxMajor, maxMinor) {
    const { major, minor } = version;
    return major < maxMajor || (major === maxMajor && minor <= maxMinor);
}
exports.isLedgerAppVersionAtMost = isLedgerAppVersionAtMost;
function ensureLedgerAppVersionCompatible(version) {
    const { isCompatible, recommendedVersion } = getCompatibility(version);
    if (!isCompatible) {
        throw new errors_1.DeviceVersionUnsupported(`Device app version unsupported. Please upgrade to ${recommendedVersion}.`);
    }
}
exports.ensureLedgerAppVersionCompatible = ensureLedgerAppVersionCompatible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvZ2V0VmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBa0Q7QUFLbEQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUtiLEVBQWMsRUFBRSxDQUFDLGlCQUFFLEdBQUcsT0FBc0IsTUFBTSxFQUFFLENBQUE7QUFHckQsUUFBZSxDQUFDLENBQUMsVUFBVTtJQUt2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUE7SUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO1FBQ3hCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFNBQVM7UUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsc0JBQXNCLEVBQUUsQ0FBQztLQUM1QixDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFBO0lBRW5ELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQTtJQUV2QixNQUFNLEtBQUssR0FBRztRQUNWLE9BQU8sRUFBRSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsS0FBSyxhQUFhO0tBQzNELENBQUE7SUFDRCxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUE7QUFDdkMsQ0FBQztBQXJCRCxnQ0FxQkM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUFnQjtJQUU3QyxNQUFNLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4Qyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTNELE9BQU87UUFDSCxZQUFZLEVBQUUsSUFBSTtRQUNsQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztLQUMxQyxDQUFBO0FBQ0wsQ0FBQztBQVRELDRDQVNDO0FBRUQsU0FBZ0IseUJBQXlCLENBQ3JDLE9BQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFFBQWdCO0lBRWhCLE1BQU0sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEdBQUcsT0FBTyxDQUFBO0lBRTlCLE9BQU8sS0FBSyxHQUFHLFFBQVEsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFBO0FBQ3hFLENBQUM7QUFSRCw4REFRQztBQUVELFNBQWdCLHdCQUF3QixDQUNwQyxPQUFnQixFQUNoQixRQUFnQixFQUNoQixRQUFnQjtJQUVoQixNQUFNLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxHQUFHLE9BQU8sQ0FBQTtJQUU5QixPQUFPLEtBQUssR0FBRyxRQUFRLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQTtBQUN4RSxDQUFDO0FBUkQsNERBUUM7QUFFRCxTQUFnQixnQ0FBZ0MsQ0FDNUMsT0FBZ0I7SUFFaEIsTUFBTSxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXBFLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDZixNQUFNLElBQUksaUNBQXdCLENBQUMscURBQXFELGtCQUFrQixHQUFHLENBQUMsQ0FBQTtLQUNqSDtBQUNMLENBQUM7QUFSRCw0RUFRQyJ9