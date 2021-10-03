const fs = require("fs");
const path = require("path");
const getHeader = require("./getHeader");
const parseHeader = require("./parseHeader");
const checkMirType = require("./mirType");
const checkItinType = require("./getDomInt");
const getPax = require('./getPaxSection');
const getFareValue = require("./getFareValue");
const getAirData = require("./getAirDataSecion");
const getFinalFares = require("./getFinalFare");

const file = path.join(__dirname, "files/AAAHTGAL.MIR");

function getParsedData(file) {

  let header = getHeader(file);
  let parsed = parseHeader(header);


  let mirType = checkMirType(parsed.T50IN12)
  let itinType = checkItinType(parsed.T50IN12)
  let numPaxes = parsed.T50PGN
  let paxes = getPax(file, numPaxes, parsed.T50ISA)
  let fares = getFareValue(file, parseInt(parsed.T50FBN))
  let flightsData = getAirData(file)
  let paxDataFareTicket = getFinalFares(fares, paxes, flightsData, parsed)
  for (let i of paxDataFareTicket) {
    Object.assign(i, mirType, itinType)
  }
  return paxDataFareTicket
}

module.exports = getParsedData
// let normalObj = JSON.stringify(ob)
// fs.writeFile('./mirJson.json', normalObj, 'utf8', (err, res) => {
//   if (err) {
//     console.log(err);
//   }
// })
// / let rawText = fs.readFileSync(file, "utf8", (err, text) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     return text;
  //   }
  // });
  // let header = getHeader(rawText);
  // let parsed = parseHeader(header);


  // let mirType = checkMirType(parsed.T50IN12)
  // let itinType = checkItinType(parsed.T50IN12)
  // let numPaxes = parsed.T50PGN
  // let paxes = getPax(rawText, numPaxes, parsed.T50ISA)
  // let fares = getFareValue(rawText, parseInt(parsed.T50FBN))
  // let flightsData = getAirData(rawText)
  // let paxDataFareTicket = getFinalFares(fares, paxes, flightsData, parsed)
  // for (let i of paxDataFareTicket) {
  //   Object.assign(i, mirType, itinType)
  // }

  // console.log(paxDataFareTicket);

