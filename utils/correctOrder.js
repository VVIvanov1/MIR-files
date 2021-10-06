

function correctOrder(arr){
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

      for(let i of arr){
          Object.assign(dataOrder,i)
      }
      return dataOrder

}

module.exports = correctOrder