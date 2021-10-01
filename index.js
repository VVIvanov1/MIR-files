const fs = require("fs");
const path = require("path");
const getHeader = require("./getHeader");
const parseHeader = require("./parseHeader");
const checkMirType = require("./mirType");
const checkItinType = require("./getDomInt");
const getPax = require('./getPaxSection')

const file = path.join(__dirname, "MIR-files/files/AAAHTGAL.MIR");

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
// console.log(mirType);
let itinType = checkItinType(parsed.T50IN12)
let numPaxes = parsed.T50PGN
let paxes = getPax(rawText, numPaxes)

Object.assign(parsed, mirType, itinType, paxes)

// console.log(parsed);
console.log(parsed.passengers);

// console.log(mirType);
// console.log(getPax(rawText, numPaxes));
