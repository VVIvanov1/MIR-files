const parser = require('./index')
const path = require('path')
const fs = require('fs')
const file = path.join(__dirname, "files/AAAHTGAL.MIR");
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
  let res = parser(rawText)
  console.log(Object.entries(res).map(([key,val])=> {return val}).length);
// console.log(parser(rawText));