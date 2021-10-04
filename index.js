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
const getExchangeData = require("./getExchangeData")
const dateTimeFormats = require('./helpers/dateTimeConverter')

let [convertDate, convertTime] = dateTimeFormats

function getParsedData(file) {

  let header = getHeader(file);
  let parsed = parseHeader(header);


  let mirType = checkMirType(parsed.T50IN12)
  if (mirType["MIR type"] === "TKT" && parsed.T50EXC === '000' || mirType["MIR type"] === "RFND") {
    let itinType = checkItinType(parsed.T50IN12)
    let numPaxes = parsed.T50PGN
    let paxes = getPax(file, numPaxes, parsed.T50ISA)
    let fares = getFareValue(file, parseInt(parsed.T50FBN))
    let flightsData = getAirData(file)
    
    let paxDataFareTicket = getFinalFares(fares, paxes, flightsData, parsed)
    for (let i of paxDataFareTicket) {
      Object.assign(i, mirType, itinType)
    }
   
    let dataOrder = {
      issueDate: null,
      issueTime: null,
      gds: null,
      pnr: null,
      'MIR type': null,
      paxTicket: null,
      paxName: null,
      flights: null,
      airline: null,
      paxFare: null,
      taxes: null,
      paxTotal: null,
      paxTaxes: null,
      bookedAgent: null,
      ticketedAgent: null,
      bookedPCC: null,
      issuesPCC: null,
      'itinerary type': null
    }
    for(let i of paxDataFareTicket){
      Object.assign(dataOrder, i)
    }
    dataOrder.issueDate = convertDate(dataOrder.issueDate)
    dataOrder.issueTime = convertTime(dataOrder.issueTime)
  
    return dataOrder
  } else {
    parsed['MIR type'] = 'TKT-EXCHANGE'
    getExchangeData(file)
  }

}

module.exports = getParsedData
// let normalObj = JSON.stringify(ob)
// fs.writeFile('./mirJson.json', normalObj, 'utf8', (err, res) => {
//   if (err) {
//     console.log(err);
//   }
// })


