const getHeader = require("./getHeader");
const parseHeader = require("./parseHeader");
const mirType = require("./mirType");
const getFareValue = require("./getFareValue");
const getDomInt = require("./getDomInt");
const getPaxSection = require("./getPaxSection");
const getAirDataSection = require("./getAirDataSecion");
const getExchangeData = require("./getExchangeData");
const getFinalFare = require("./getFinalFare");
const dateTimeFormats = require("../helpers/dateTimeConverter");
let [convertDate, convertTime] = dateTimeFormats;
const fs = require("fs");
const path = require("path");
let correctOrder = require("./correctOrder");
const getRefundInfo = require("./getRefundData");
const { writeToSheets, voidTicket } = require("../gglesheets/processSheets");
const { saveToDrive } = require("../ggledrive/saveToDrive");
const folderId = "18tAuB_F8BEV6aRYsEzhAJf21vD7H_xMP";
const getEmdData = require("../arj/emd");

function ProcessMIRfile(text) {
  let rawText = fs.readFileSync(text, "utf8");
  let header = getHeader(rawText);
  let parsed = parseHeader(header);
  let type = mirType(parsed);
  let exchA10section = /A10.*/g;
  let A10exist = exchA10section.exec(rawText);
  let domInt = getDomInt(parsed);
  let newName = `${type["MIR type"]}-${parsed.T50RCL}-${
    parsed.T50AGT
  }-${path.basename(text)}`;

  A10exist !== null ? (type["MIR type"] = "EXCH") : type["MIR type"];
  // if mir file is normal tkt - ticket or exchange ticket, than provess this
  if (type["MIR type"] === "EXCH" || type["MIR type"] === "TKT") {
    let fares = getFareValue(rawText, parsed.T50PGN);
    let paxes = getPaxSection(rawText, parsed.T50ISA); // one 2 many
    let airData = getAirDataSection(rawText);
    let exchange = null;
    if (type["MIR type"] === "EXCH") {
      exchange = getExchangeData(rawText, fares);
    }
    let tempResult = getFinalFare(fares, paxes, airData, parsed, exchange);

    for (let i of tempResult) {
      i.issueDate = convertDate(i.issueDate);
      i.issueTime = convertTime(i.issueTime);
      Object.assign(i, type, domInt);
    }
    let finalResult = correctOrder(tempResult);
    for (let i of finalResult) {
      let dta = Object.entries(i).map(([key, val]) => {
        return val;
      });
      try {
        writeToSheets(dta);
        saveToDrive(folderId, text, newName);
        // saveRefundRecord(dta);
      } catch (error) {
        console.log(error);
      }
    }

    // return finalResult;
  }
  // if mir file is refund tkt
  else if (type["MIR type"] === "RFND") {
    let refData = getRefundInfo(rawText, parsed, domInt, type);
    writeToSheets(refData);
    saveToDrive(folderId, text, newName);
  }
  // if mir file is void tkt
  else if (type["MIR type"] === "VOID") {
    let paxData = getPaxSection(rawText, parsed.T50ISA);

    for (let tkt of paxData.passengers) {
      let tktVoid = tkt.passenger.A02TKT;
      voidTicket(tktVoid);
      saveToDrive(folderId, text, newName);
    }
  } else if (type["MIR type"] === "EMD") {
    let emdData = getEmdData(text);
    for (let i of emdData) {
      let data = Object.values(i).map((val) => {
        return val;
      });
      try {
        writeToSheets(data);
        saveToDrive(folderId, text, newName);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = ProcessMIRfile;
