const fs = require("fs");
const path = require("path");
const hdr = require("../getHeader");
const type = require("../mirType");
// const parseHeader = require("../parseHeader");
const parseHdr = require("../arj/parseHeader");
const getPaxData = require("../getPaxSection");

const folder = path.join(__dirname, "../files");
// console.log(folder);

function getFiles() {
  let fileNames = [];
  fs.readdirSync(folder).forEach((file) => {
    let fullPath = path.join(folder, file);
    fileNames.push(fullPath);
  });
  return fileNames;
}

let filesToCheck = getFiles();
let tktFiles = []; // get array of ticketed files
let rfndFiles = []; // get array of refund files
let paxes = []; // get array of refund pax files

filesToCheck.forEach((file) => {
  let txt = fs.readFileSync(file, "utf8");
  let headerText = hdr(txt);
  let headerObj = parseHdr(headerText);
  let mir = type(headerObj.T50IN12);
  if (mir["MIR type"] === "TKT") {
    tktFiles.push(file);
  } else if (mir["MIR type"] === "RFND") {
    rfndFiles.push(file);
  }
  return mir;
});
let fields = {
  A23TKT: { s: 03, l: 14 }, // ticket number
  A23NME: { s: 48, l: 22 }, // refund passenger name
  A23CDI: { s: 82, l: 1 }, // CRS DERIVED INDICATOR - Contains indicator for source of refund information.
  // C = all data retrieved from CRS when an electronic ticket
  // B = non-ticketing transaction types e.g. EMD
  // U = user input only, no data retrieved from CRS.
};

rfndFiles.forEach((file) => {
  let rawtext = fs.readFileSync(file, "utf8");
  let header = hdr(rawtext);
  let parsehdr = parseHdr(header);
  let paxdata = getPaxData(rawtext, parsehdr.T50ISA);
  getRefundSection(rawtext);
  paxes.push(paxdata);
});

function getRefundSection(text) {
  let rgx = /A23.{1,115}/gm;
  let section = rgx.exec(text)[0];
  let parsed = Object.entries(fields).map(([key, val]) => {
    let str = section.substr(val.s, val.l);
    return str;
  });
}
let refundProcess = rfndFiles[0];

function getRefundInfo(file) {
  let rawText = fs.readFileSync(file, "utf8");
  let regex = /(A23[\s\S]*RA:.*)/gm;
  let regTicket = /(?<=A23)\d+/g;
  let regAmount = /(?<=RA:.*)(?<=KZT).*/g;
  let regexResult = regex.exec(rawText);

  let refInfoArray = [];

  regexResult.map((item) => {

    let ticket = item.match(regTicket)[0]
    let amount = '-'+item.match(regAmount)[0].replace(/\s/g,"")
    refInfoArray.push({ paxTicket: ticket, paxTotal: Number(amount) });
    
  });
  console.log(refInfoArray);

}

getRefundInfo(refundProcess);
