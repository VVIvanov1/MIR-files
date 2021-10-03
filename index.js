const fs = require("fs");
const path = require("path");
const getHeader = require("./getHeader");
const parseHeader = require("./parseHeader");
const checkMirType = require("./mirType");
const checkItinType = require("./getDomInt");
const getPax = require('./getPaxSection');
const getFareValue = require("./getFareValue");
const getAirData = require("./getAirDataSecion");
const getTicketInfo = require("./helpers/getTicketInfo");

const file = path.join(__dirname, "files/AAAHTGAL.MIR");

let rawText = fs.readFileSync(file, "utf8", (err, text) => {
  if (err) {
    console.error(err);
  } else {
    return text;
  }
});
let header = getHeader(rawText);
let parsed = parseHeader(header);


let mirType = checkMirType(parsed.T50IN12)
let itinType = checkItinType(parsed.T50IN12)
let numPaxes = parsed.T50PGN
let paxes = getPax(rawText, numPaxes)
let fares = getFareValue(rawText, parseInt(parsed.T50FBN))
let flightsData = getAirData(rawText)
console.log(flightsData);

let ob = {}
Object.assign(ob, parsed, mirType, itinType, paxes, fares, flightsData)

// getTicketInfo(ob)
// console.log(ob.flights);


// let normalObj = JSON.stringify(ob)
// fs.writeFile('./mirJson.json', normalObj, 'utf8', (err, res) => {
//   if (err) {
//     console.log(err);
//   }
// })
