function correctOrder(arr) {
  let arrRes = [];
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
  for (let y of arr) {
    arrRes.push(Object.assign(dataOrder, y));
  }

  // for (let i of arr) {
  //   Object.assign(dataOrder, i);
  // }
  return arrRes;
}
console.log("complete");
module.exports = correctOrder;
