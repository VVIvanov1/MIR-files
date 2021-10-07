function getFinalFares(fare, ...args) {
  let faresArr = fare.fares;
  let [paxes, flights, parsed, exchange] = args;
  let paxesData = [];
  paxes.passengers.map((pax) => {
    let filterId = pax.passenger.A02FIN;
    let exchangeRecord;
    if (exchange !== null) {
      exchangeRecord = exchange.filter(item => {
        if (item[0]["A10EXI"] === filterId) {
          return { record: item.record, adc: item.tktTotal };
        }
      })[0];
    } else {
      exchangeRecord = { record: exchange, adc: exchange };
    }

    let filtered = faresArr.filter((f) => {
      return f.fare.fareData.A07FSI === filterId;
    });
    if (filtered.length > 0) {
      let mainTxs = filtered[0].fare.fareData.mainTaxes;
      let itTxs = filtered[0].fare.fareData.itTaxes;
      let mainTxsString = "Taxes: ";
      if (mainTxs.length > 0) {
        mainTxs.map((tx) => {
          let str = Object.entries(tx).map(([key, val]) => {
            return `(${key}) ${val} `;
          });
          mainTxsString += str.join("");
        });
      }
      if (itTxs.length > 0) {
        mainTxsString += "//XT Tax breakdown: ";
        itTxs.map((tx) => {
          let str = Object.entries(tx).map(([key, val]) => {
            return `(${key}) ${val} `;
          });

          mainTxsString += str.join("");
        });
      }
      paxesData.push({
        paxName: pax.passenger.A02NME,
        paxTicket: pax.passenger.A02TKT,
        paxFare: filtered[0].fare.fareData.A07EQV,
        paxTaxes: mainTxsString,
        paxTotal:
          exchangeRecord.adc !== null
            ? exchangeRecord.tktTotal
            : filtered[0].fare.fareData.A07TTA,
        taxes:
          filtered[0].fare.fareData.A07TTA - filtered[0].fare.fareData.A07EQV,
        flights: flights.record,
        issueDate: parsed.T50DTE,
        issueTime: parsed.T50TME,
        bookedAgent: parsed.T50AGS,
        ticketedAgent: parsed.T50AGT,
        bookedPCC: parsed.T50BPC,
        issuesPCC: parsed.T50TPC,
        gds: parsed.T50TRC,
        pnr: parsed.T50RCL,
        airline: parsed.T50ISC,
        exchangeFor: exchangeRecord.record,
      });
    }
  });
  return paxesData;
}

module.exports = getFinalFares;
