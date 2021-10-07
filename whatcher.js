const fs = require("fs");
const hound = require("hound");
// const folder = "C:\\Users\\Biletalu\\Desktop\\Новая папка\\Новая папка";
const folder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка'
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
const getExchangeData = require("./utils/getExchangeData")
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
  // if mir file is normal tkt - ticket or exchange ticket, than provess this
  if (type['MIR type'] === "EXCH" || type['MIR type'] === "TKT") {
    let fares = getFareValue(rawText, parsed.T50PGN);
    let domInt = getDomInt(parsed);
    let paxes = getPaxSection(rawText, parsed.T50ISA); // one 2 many
    let airData = getAirDataSection(rawText);
    let exchange = null;
    if(type['MIR type'] === "EXCH"){
      exchange = getExchangeData(rawText, fares)
      // console.log(exchange);
      // let tempResult = getFinalFare(fares, paxes, airData, parsed, exchange);
    }
    let tempResult = getFinalFare(fares, paxes, airData, parsed, exchange);
    for (let i of tempResult) {
      i.issueDate = convertDate(i.issueDate);
      i.issueTime = convertTime(i.issueTime);
      Object.assign(i, type, domInt);
    }
    let finalResult = correctOrder(tempResult);

    console.log(finalResult);
    console.log(`Complete MIR type ${type['MIR type']}`);
  }





});
