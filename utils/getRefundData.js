const fs = require("fs");
let getItTaxData = require("./ittax")

function getRefundInfo(text) {
  let regex = /A23[\s\S]*RA:.*/gm;
  let regTicket = /(?<=A23)\d+/g;
  let regAmount = /(?<=RA:.*)(?<=KZT).*/g;
  let regexResult = regex.exec(text);
  

  let refTaxesObj = {
    
    tx1: /(?<=T1:).{8}/gm,
    tx1nm: /(?<=T1:.{8})../gm,
    tx2: /(?<=T2:).{8}/gm,
    tx2nm: /(?<=T2:.{8})../gm,
    tx3: /(?<=T3:).{8}/gm,
    tx3nm: /(?<=T3:.{8})../gm,
  };
  let refFareTaxes = Object.entries(refTaxesObj).map(([key, val]) => {
    if (regexResult[0].match(val) !== null) {
      return { [key]: regexResult[0].match(val)[0].replace(/\s/g, "") };
    } else {
      return { [key]: null };
    }
  });

  let itTaxes = regexResult[0].match(/IT:.*/g)[0].substring(3);
  let ittxObj = getItTaxData(itTaxes)

  let baseFare = Number(regexResult[0].match(/(?<=BF:.{3}).{8}/gm));
  let reduced = refFareTaxes.reduce((prev, curr) => {
    let val = Object.entries(curr)[0][1]

    if (!isNaN(parseInt(val))) {
      return prev = prev + parseInt(val)
    } else {
      return prev
    }
  }, 0)

  let tktRefTotal = baseFare + reduced + ittxObj.itTaxTotal
  let tktRefTaxTotal = reduced + ittxObj.itTaxTotal
  console.log(tktRefTotal);
  console.log(tktRefTaxTotal);
  console.log(baseFare);



  // return ittxObj

}

module.exports = getRefundInfo;
