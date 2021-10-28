const fs = require('fs')
const path = require('path')
const getHeader = require("../utils/getHeader")
const parseHeader = require("../utils/parseHeader")
const mirType = require("../utils/mirType")

const filePath = "C:\\development\\MIR\\MIR-files\\files\\AAAJVGAL.MIR"

const rawText = fs.readFileSync(filePath, "utf8");

const parsed = parseHeader(getHeader(rawText))
const type = mirType(parsed)


let dataOrder = {
    issueDate: null,
    issueTime: null,
    gds: null,
    pnr: null,
    "MIR type": null,
    paxTicket: null,
    paxName: null,
    flights: null,
    departure: null,
    arrival: null,
    airline: null,
    paxFare: null,
    taxes: null,
    paxTotal: null,
    paxTaxes: null,
    exchangeFor: null,
    bookedAgent: null,
    ticketedAgent: null,
    bookedPCC: null,
    issuesPCC: null,
    "itinerary type": null,
    processed: false,
  };

console.log(type);

// A29PAX A29NAM (55) A29EMD(13)