const fs = require("fs");
let getItTaxData = require("./ittax");
let dateTimeConverter = require("../helpers/dateTimeConverter");
let [convertDate, convertTime] = dateTimeConverter;


function getRefundInfo(text, ...args) {
  let [parsed, domInt, type] = args;
  let regex = /A23[\s\S]*RA:.*/gm;
  parsed.T50DTE = convertDate(parsed.T50DTE)
  parsed.T50TME = convertTime(parsed.T50TME.replace(/\s/g,""))

  let regexResult = regex.exec(text);

  let paxName = regexResult[0].substring(48, 81).replace(/\s/g, "");
  let paxTicket =
    regexResult[0].substring(3, 17).slice(0, 3) +
    "-" +
    regexResult[0].substring(3, 17).slice(3);

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
  let ittxObj = getItTaxData(itTaxes);

  let baseFare = Number(regexResult[0].match(/(?<=BF:.{3}).{8}/gm));
  let reduced = refFareTaxes.reduce((prev, curr) => {
    let val = Object.entries(curr)[0][1];

    if (!isNaN(parseInt(val))) {
      return (prev = prev + parseInt(val));
    } else {
      return prev;
    }
  }, 0);

  let tktRefTotal = baseFare + reduced + ittxObj.itTaxTotal;
  let tktRefTaxTotal = reduced + ittxObj.itTaxTotal;

  let refObj = {
    issueDate: parsed.T50DTE,
    issueTime: parsed.T50TME,
    gds: parsed.T50TRC,
    pnr: parsed.T50RCL,
    "MIR type": type["MIR type"],
    paxTicket: paxTicket,
    paxName: paxName,
    flights: null,
    departure: null,
    arrival: null,
    airline: parsed.T50ISC,
    paxFare: -baseFare,
    taxes: -tktRefTaxTotal,
    paxTotal: -tktRefTotal,
    paxTaxes: null,
    exchangeFor: null,
    bookedAgent: parsed.T50AGS,
    ticketedAgent: parsed.T50AGT,
    bookedPCC: parsed.T50BPC,
    issuesPCC: parsed.T50TPC,
    "itinerary type": domInt["itinerary type"],
    processed: false,
  };
  let refundRecord = Object.entries(refObj).map(([key,val])=> {return val});
  
 
  return refundRecord
  // return dataOrder;
  // return readyRefund;
}

module.exports = getRefundInfo;
