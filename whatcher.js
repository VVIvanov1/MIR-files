const fs = require("fs");
const hound = require("hound");
const folder = "C:\\Users\\user\\Desktop\\Новая папка\\Новая папка";
const getHeader = require("./utils/getHeader");
const parseHeader = require("./utils/parseHeader");
const mirType = require("./utils/mirType");
const getDomInt = require("./utils/getDomInt");
const getFareValue = require("./utils/getFareValue");
const getPaxSection = require("./utils/getPaxSection");
const getAirDataSection = require("./utils/getAirDataSecion");
const getFinalFare = require("./utils/getFinalFare");
const dateTimeFormats = require("./helpers/dateTimeConverter");
let [convertDate, convertTime] = dateTimeFormats;
const correctOrder = require("./utils/correctOrder");
const whatcher = hound.watch(folder);
//T50PGN - number of pax items

whatcher.on("create", (file) => {
  let rawText = fs.readFileSync(file, "utf8");
  let header = getHeader(rawText);
  let parsed = parseHeader(header);
  let type = mirType(parsed);
  let exchA10section = /A10.*/g;
  let A10exist = exchA10section.exec(rawText);
  type['MIR type'] = A10exist ? "EXCH" : type['MIR type']
  let fares = getFareValue(rawText, parsed.T50PGN);
  let domInt = getDomInt(parsed);
  let paxes = getPaxSection(rawText, parsed.T50ISA);
  let airData = getAirDataSection(rawText);

  let tempResult = getFinalFare(fares, paxes, airData, parsed);

  for (let i of tempResult) {
    i.issueDate = convertDate(i.issueDate);
    i.issueTime = convertTime(i.issueTime);
    Object.assign(i, type, domInt);
  }
  let finalResult = correctOrder(tempResult);

  console.log(finalResult);

  console.log("complete!");
});
