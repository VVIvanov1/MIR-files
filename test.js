const parser = require('./index')
const path = require('path')
const fs = require('fs')
const file = path.join(__dirname, "files/AAAHXGAL.MIR");
// files/AAAHWGAL.MIR 
// files/AAAHVGAL  EMD BAG issue.MIR
// files/AAAHXGAL.MIR ??
// files/AAAIAGAL.MIR   VOID
// files/AAAJTGAL.MIR REFUND
// files/AAAJVGAL.MIR EMD
// files/AAAJWGAL.MIR EMD-VOID
// files/AAAJXGAL.MIR RFND

let rawText = fs.readFileSync(file, "utf8", (err, text) => {
    if (err) {
      console.error(err);
    } else {
      return text;
    }
  });
parser(rawText)
// console.log(parser(rawText));