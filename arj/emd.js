const fs = require("fs");
const path = require("path");
const getHeader = require("../utils/getHeader");
const parseHeader = require("../utils/parseHeader");
const mirType = require("../utils/mirType");
const filePath = "C:\\development\\MIR\\files\\AAAJVGALL.MIR";
// const rawText = fs.readFileSync(filePath, "utf8");
// const parsed = parseHeader(getHeader(rawText));
const dateTimeConverter = require("../helpers/dateTimeConverter");
const [convertDate, convertTime] = dateTimeConverter;
// const type = mirType(parsed);
// let emdString = /A29.*\r\nED.*/gm;
const getDomInt = require("../utils/getDomInt");
// let emdArrData = rawText.match(emdString);
// let itinType = getDomInt(parsed);

function processEmdRec(rout) {
  const rawText = fs.readFileSync(rout, "utf8");
  const parsed = parseHeader(getHeader(rawText));
  const type = mirType(parsed);
  let itinType = getDomInt(parsed);
  let emdString = /A29.*\r\nED.*/gm;
  let emdArrData = rawText.match(emdString);
  
  let emds = getEMDrecord(emdArrData);
  let toReturn = emds.map(em => {
    let dataOrder = {
      issueDate: convertDate(parsed.T50DTE),
      issueTime: convertTime(parsed.T50TME),
      gds: parsed.T50TRC,
      pnr: parsed.T50RCL,
      "MIR type": null,
      paxTicket: null,
      paxName: null,
      flights: null,
      departure: null,
      arrival: null,
      airline: null,
      paxFare: null,
      taxes: null,
      paxTotal: null,
      paxTaxes: null,
      exchangeFor: null,
      bookedAgent: parsed.T50AGS,
      ticketedAgent: parsed.T50AGT,
      bookedPCC: parsed.T50BPC,
      issuesPCC: parsed.T50TPC,
      "itinerary type": null,
      processed: false,
    };
    let obj = Object.assign(dataOrder, em, type, itinType);
    return obj
  });
  let amdVals = toReturn.map(em => Object.values(em).map(val=>{return val}))
  return toReturn;
}

function getEMDrecord(data) {
  let emdArr = data.map((row) => {
    let tktReg = /(?<=RL-).*/g;
    let forTkt = row.match(tktReg)[0];
    let emd = {
      exchangeFor:
        forTkt.length > 10
          ? `EMD Оформлен к билету ${
              forTkt.substring(0, 3) + "-" + forTkt.substring(3)
            }`
          : "",

      paxName: row.slice(14, 69).trimEnd(),
      paxTicket:
        row.slice(69, 82).substring(0, 3) +
        "-" +
        row.slice(69, 82).substring(3),
      paxTotal: Number(row.slice(145, 157).trim()),
    };
    return emd;
  });
  return emdArr;
}

module.exports = processEmdRec;
