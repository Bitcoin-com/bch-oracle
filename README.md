# BCH Oracle

Oracle services for Bitcoin Cash

```js
let bchOracle = require("bch-oracle/lib/Oracle").default;
let Oracle = new bchOracle();
let opReturn = {
  pubKey:
    "0x02a8820523d256a8b61f79596f0bf0118ee0c48fc2eac25324db13d0d8b92e6cc6",
  message: "0xb92f0000201d665c",
  signature:
    "0x3045022100edad7ebe7dcc25bcdb7ffb2e3e523a05328db606f596bbf4112e0d828571ff1d02207a6896bcfa14cc495ed6980ced82cac7d9da1f082ec52386fe3ffe6e30053515",
  url: "https://oracle.bitcoin.com"
};

console.log(Oracle.publish(opReturn));
```
