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
const fs = require("fs")
let correctOrder = require("./correctOrder");
const getRefundInfo = require("./getRefundData")


function ProcessMIRfile(text) {
    let rawText = fs.readFileSync(text, "utf8");
    let header = getHeader(rawText);
    let parsed = parseHeader(header);
    let type = mirType(parsed);
    let exchA10section = /A10.*/g;
    let A10exist = exchA10section.exec(rawText);
    let rfndA23section = /A23.*/g;
    let A23exist = rfndA23section.exec(rawText);
    A10exist !== null ? type['MIR type'] = "EXCH" : type['MIR type']
    // if mir file is normal tkt - ticket or exchange ticket, than provess this
    if (type['MIR type'] === "EXCH" || type['MIR type'] === "TKT") {
        let fares = getFareValue(rawText, parsed.T50PGN);
        let domInt = getDomInt(parsed);
        let paxes = getPaxSection(rawText, parsed.T50ISA); // one 2 many
        let airData = getAirDataSection(rawText);
        let exchange = null;
        if (type['MIR type'] === "EXCH") {
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

        return finalResult
    }
    // if mir file is refund tkt
    else if (type['MIR type'] === "RFND") {
        console.log('this is refund!!!');
        let refData = getRefundInfo(rawText)
       
    }
    // if mir file is void tkt
    else if (type['MIR type'] === "VOID") {
        console.log('this is void!!!');
    }
}

module.exports = ProcessMIRfile;