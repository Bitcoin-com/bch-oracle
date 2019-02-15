"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require deps
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BITBOX = new BITBOXSDK();
var Oracle = /** @class */ (function () {
    function Oracle() {
    }
    Oracle.prototype.publish = function (config) {
        var opReturn = [
            "0x004F5243",
            config.pubKey,
            config.message,
            config.signature
        ];
        if (config.url && config.url !== "") {
            opReturn.push(config.url);
        }
        if (config.data && config.data !== "") {
            opReturn.push(config.data);
        }
        var valid = this.validateOpReturn(opReturn);
        var encoded;
        if (valid) {
            encoded = this.encodeOpReturn(opReturn);
        }
        return encoded;
    };
    Oracle.prototype.validateOpReturn = function (opReturn) {
        // Data property
        if (opReturn.length === 0) {
            throw new Error("Op return data property invalid");
        }
        // Only strings in data array
        opReturn.forEach(function (pushData) {
            if (typeof pushData !== "string")
                throw new Error("Only utf and hex strings supported in OP Return");
        });
        // Max length
        var encodedScript = this.encodeOpReturn(opReturn);
        if (encodedScript.byteLength > 223)
            throw new Error("OP Return too large");
        return true;
    };
    Oracle.prototype.encodeOpReturn = function (dataArray) {
        var script = [BITBOX.Script.opcodes.OP_RETURN];
        dataArray.forEach(function (data) {
            if (typeof data === "string" && data.substring(0, 2) === "0x") {
                script.push(Buffer.from(data.substring(2), "hex"));
            }
            else {
                script.push(Buffer.from(data));
            }
        });
        return BITBOX.Script.encode(script);
    };
    return Oracle;
}());
exports.default = Oracle;
