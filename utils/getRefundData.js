const fs = require("fs");
let getItTaxData = require("./ittax")

function getRefundInfo(text) {
  let regex = /A23[\s\S]*RA:.*/gm;
  let regTicket = /(?<=A23)\d+/g;
  let regAmount = /(?<=RA:.*)(?<=KZT).*/g;
  let regexResult = regex.exec(text);
  let baseFare = /(?<=BF:.{3}).{8}/gm;

  let refTaxesObj = {
    // baseFare: /(?<=BF:.{3}).{8}/gm,
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
  console.log(ittxObj);
  console.log(refFareTaxes.filter(t=>t !== null));
  // console.log(itTaxes.length);
  //     9401CZ   27264YQ

  // console.log(refFareTaxes);
  // let refInfoArray = [];

  // regexResult.map((item) => {

  //   let ticket = item.match(regTicket)[0]
  //   let amount = '-'+item.match(regAmount)[0].replace(/\s/g,"")
  //   refInfoArray.push({ paxTicket: ticket, paxTotal: Number(amount) });

  // });
  // return refInfoArray
}

module.exports = getRefundInfo;
