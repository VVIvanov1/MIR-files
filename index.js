const fs = require("fs");
const path = require("path");
const getHeader = require("./getHeader");
const parseHeader = require("./parseHeader");
const checkMirType = require("./mirType");
const checkItinType = require("./getDomInt");
const getPax = require('./getPaxSection');
const getFareValue = require("./getFareValue");

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

let ob = {}
Object.assign(ob, parsed, mirType, itinType, paxes, fares)



console.log(ob.passengers[0]);

