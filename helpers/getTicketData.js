const path = require("path");

const fs = require("fs");

const getHeader = require("../getHeader");
const parseHeader = require("../parseHeader");
const getPaxSection = require("../getPaxSection");
const mirType = require("../mirType");

let folder = "C:\\development\\MIR\\MIR-files\\files";

let result = fs.readdirSync(folder);

let ticketsObj = result.map((file) => {
  let filePath = path.join(folder, file);
  let rawText = fs.readFileSync(filePath, "utf8");
  let exchRegex = /A100\d.{14}/gm;
  let header = getHeader(rawText);
  let parsed = parseHeader(header);
  let pax = getPaxSection(rawText, parsed.T50ISA);
  let type = mirType(parsed.T50IN12);

  let obj = {
    fileName: file,
    type: type["MIR type"],
    tkt: pax.passengers[0].passenger.A02TKT,
    exch: getExchangeId(rawText),
  };
  //   getExchangeId(rawText)
  if (obj.exch) {
    console.log(obj);
  }

  return obj;
});

let normalObj = JSON.stringify(ticketsObj)
fs.writeFile('../helpers/tickets.json', normalObj, 'utf8', (err, res) => {
  if (err) {
    console.log(err);
  }
})

function getExchangeId(text) {
  let exchRegex = /A100\d.{14}/gm;
  let exchSection = text.match(exchRegex);
  let oldTKT = /(?<=TI:).{4,13}/g;
  let oldTktNo = exchSection !== null ? text.match(oldTKT)[0] : null;
  if (oldTktNo !== null) {
    oldTktNo = oldTktNo.substring(0, 3) + "-" + oldTktNo.substring(3);
  }

  // console.log(oldTktNo);
  return exchSection !== null ? { exchange: true, oldTicket: oldTktNo } : false;
}
