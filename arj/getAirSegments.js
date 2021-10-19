function getAirSegments(text) {
  let fields = {
    A04ITN: { s: 3, l: 2 }, //itinerery index number
    A04CDE: { s: 5, l: 2 }, // airline code
    A04NUM: { s: 7, l: 3 }, // airline number
    A04NME: { s: 10, l: 12 }, // airline name
    A04FLT: { s: 22, l: 4 }, // flight number
    A04CLS: { s: 26, l: 2 }, // class of service
    A04STS: { s: 28, l: 2 }, // status
    A04DTE: { s: 30, l: 5 }, // departure date
    A04TME: { s: 35, l: 5 }, // departure time
    A04ARV: { s: 40, l: 5 }, // arrival time
    A04IND: { s: 45, l: 1 }, // next day indicator arrival
    // 1 = PREVIOUS DAY ARRIVAL
    // 2 = SAME DAY ARRIVAL
    // 3 = NEXT DAY ARRIVAL
    // 4 = 2 DAYS LATER ARRIVAL
    A04OCC: { s: 46, l: 3 }, //origin city code
    A04OCN: { s: 49, l: 13 }, // origin city name
    A04DCC: { s: 62, l: 3 }, //destination city code
    A04DCN: { s: 65, l: 13 }, // destination city name
    A04DOM: { s: 78, l: 1 }, // domestic-international indicator
    //     D = DOMESTIC
    // CRT, Origin City and Destination City are all in the same country.
    // I = INTERNATIONAL
    // Either the CRT, Origin City or Destination City is in a different country.
    A04BAG: { s: 86, l: 3 }, // baggage allowence
   
  };

  let rows = text.split(/\n/g).filter((item) => {
    return item.indexOf("A04") !== -1;
  });

  let segsArr = rows.map((row) => {
      let result = Object.entries(fields).map(([key,value])=>{
          return {[key]:row.substr(value.s,value.l)}
      })
      let obj = {}
      for(let i of result){
          Object.assign(obj, i)
      }
      return obj
  })
  return {segments: segsArr}
}

module.exports = getAirSegments;
