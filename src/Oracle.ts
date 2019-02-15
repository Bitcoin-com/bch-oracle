// require deps
const BITBOXSDK: any = require("bitbox-sdk/lib/bitbox-sdk").default;
let BITBOX = new BITBOXSDK();

// import interfaces
import { IPublish } from "./interfaces/OracleInterfaces";

class Oracle {
  constructor() {}

  publish(config: IPublish) {
    let opReturn = [
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

    let valid: boolean | string = this.validateOpReturn(opReturn);
    let encoded;
    if (valid) {
      encoded = this.encodeOpReturn(opReturn);
    }
    return encoded;
  }

  validateOpReturn(opReturn: string[]): boolean | string {
    // Data property
    if (opReturn.length === 0) {
      throw new Error("Op return data property invalid");
    }

    // Only strings in data array
    opReturn.forEach((pushData: string) => {
      if (typeof pushData !== "string")
        throw new Error("Only utf and hex strings supported in OP Return");
    });

    // Max length
    const encodedScript = this.encodeOpReturn(opReturn);
    if (encodedScript.byteLength > 223) throw new Error("OP Return too large");

    return true;
  }

  encodeOpReturn(dataArray: string[]) {
    const script = [BITBOX.Script.opcodes.OP_RETURN];
    dataArray.forEach((data: string) => {
      if (typeof data === "string" && data.substring(0, 2) === "0x") {
        script.push(Buffer.from(data.substring(2), "hex"));
      } else {
        script.push(Buffer.from(data));
      }
    });
    return BITBOX.Script.encode(script);
  }
}

export default Oracle;
