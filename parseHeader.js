let fields = {
  T50TRC: { s: 2, l: 2 }, // GDS code
  T50DTE: { s: 20, l: 7 }, // creation date
  T50TME: { s: 27, l: 5 }, // creation time
  T50ISC: { s: 32, l: 2 }, //airline code
  T50ISA: { s: 34, l: 3 }, // airline number
  T50ISN: { s: 37, l: 24 }, // official airline name
  T50BPC: { s: 81, l: 4 }, // booking agency account code
  T50TPC: { s: 85, l: 4 }, // issuing account code
  T50RCL: { s: 98, l: 6 }, // record locator
  T50AGS: { s: 113, l: 6 }, // booking sign on
  T50AGT: { s: 120, l: 4 }, // issuing agt sign-on
 // T50ISS: { s: 32, l: 29 }, // issuing and validating data
  T50IN7: { s: 248, l: 1 }, // ticket exchange section
  T50IN12: { s: 253, l: 1 }, //ticketing command used
  // D = EMD Refund (EMDR).
  // H = REGULAR MIR (HB or TKP Ticketing Command Used).
  // I = EMD Exchange (EMDI/EXE).
  // F = EMD Issue (EMDI).
  // C = Cancelled Refund MIR.
  // R = Refund MIR.
  // V = Void MIR.
  // Z = EMD Void (EMDV).
  T50IN17: { s: 258, l: 1 }, // DOMESTIC / INTERNATIONAL INDICATOR
  //   X = INTERNATIONAL ITINERARY, blank = DOMESTIC ITINERARY
  T50PGN: { s: 300, l: 3 }, // NUMBER OF PASSENGER ITEMS
  T50ARN: { s: 306, l: 3 }, // NUMBER OF TICKETED/PRICED AIRLINE SEGMENTS
  T50FBN: { s: 315, l: 3 }, // NUMBER OF FARE SECTIONS
  T50EXC: { s: 318, l: 3 }, // NUMBER OF TICKET EXCHANGE ITEMS
};

function parseHeader(header) {
  // console.log(header);
  let obj = {};
  let arr = Object.entries(fields).map(([key, value]) => {
    return { [key]: header.replace(/\n/g,"").substr(value.s, value.l) };
  });
  for(let i of arr){
      Object.assign(obj, i)
  }
  return obj
}

module.exports = parseHeader;
