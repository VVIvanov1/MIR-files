const parseHeader = require("./parseHeader");
const getHeader = require("./getHeader");
const fs = require("fs");

function checkOwner(file, signOns) {
  let text = fs.readFileSync(file, "utf8");
  let header = getHeader(text);
  let headerData = parseHeader(header);
  let son = signOns.filter((s) => headerData.T50AGS == s || headerData.T50AGT == s);
  if (son.length !== 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = { checkOwner };
