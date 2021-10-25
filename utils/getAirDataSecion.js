function getAirData(text) {
  let fields = {
    A04ITN: { s: 3, l: 2 }, // segment number
    A04CDE: { s: 5, l: 2 }, // airline code
    A04NUM: { s: 7, l: 3 }, // airline number
    A04NME: { s: 10, l: 12 }, // airline name
    A04FLT: { s: 22, l: 4 }, // flight number
    A04CLS: { s: 26, l: 2 }, // booked class of service
    A04STS: { s: 28, l: 2 }, // status
    A04DTE: { s: 30, l: 5 }, // departure date
    A04TME: { s: 35, l: 5 }, // departure time
    A04ARV: { s: 40, l: 5 }, // arrival time
    A04IND: { s: 45, l: 1 }, // next day arrival indicator
    A04OCC: { s: 46, l: 3 }, // origin city info
    A04OCN: { s: 49, l: 13 }, // origin city name
    A04DCC: { s: 62, l: 3 }, // destination city code
    A04DCN: { s: 65, l: 13 }, // destination city name
    A04BAG: { s: 86, l: 3 }, // baggage allowence
  };

  let arr = text.split("\r\n");
  let flights = arr.filter((item) => {
    if (item.startsWith("A04")) {
      return item;
    }
  });

  let flightsArrReady = [];

  flights.forEach((element) => {
    let fl = Object.entries(fields).map(([key, value]) => {
      return { [key]: element.substr(value.s, value.l) };
    });
    flightsArrReady.push(fl);
  });
  let ar = [];

  let flightDates = getDepArrData(flightsArrReady);

  flightsArrReady.forEach((element) => {
    let filter = ["A04OCC", "A04OCN", "A04DCC", "A04DCN"];
    let filtered = element.filter((item) => {
      if (filter.indexOf(Object.keys(item)[0]) !== -1) {
        return item;
      }
    });
    let word = filtered.map((it) => {
      return Object.entries(it).map(([key, val]) => {
        let str = val.replace(/\s/g, "");
        if (key.slice(4, 6) === "CC") {
          return `(${str})`;
        } else {
          return str;
        }
      });
    });
    ar.push(word);
  });

  let flString = getFlightString(flightsArrReady);

  return {
    flights: flightsArrReady,
    record: flString,
    departure: flightDates[0].dep,
    arrival: flightDates[flightDates.length - 1].arrival,
  };
}
function getFlightString(arr) {
  let filter = ["A04OCC", "A04OCN", "A04DCC", "A04DCN"];
  let airports = [];
  for (let i of arr) {
    let arrayKeysVals = Object.entries(i);
    arrayKeysVals.map(([key, value]) => {
      Object.entries(value).map(([key, val]) => {
        if (filter.includes(key)) {
          let cleanStr = "";
          if (val.length > 3) {
            cleanStr = val[0] + val.slice(1).toLowerCase().replace(/\s/g, "");
          } else {
            cleanStr = `(${val})`;
          }
          airports.push(cleanStr);
        }
      });
    });
  }
  let testString = airports
    .reduce((prev, curr) => {
      if (curr.indexOf(")") !== -1) {
        return prev + curr;
      } else {
        return prev + curr + "-";
      }
    }, "")
    .slice(0, -1);

  return testString;
}

// departure date & arrival date each ticket
function getDepArrData(arr) {
  //   } A04IND
  //      1 = PREVIOUS DAY ARRIVAL

  //      2 = SAME DAY ARRIVAL

  //      3 = NEXT DAY ARRIVAL

  //      4 = 2 DAYS LATER ARRIVAL

  let flightsObjArray = [];
  for (let i of arr) {
    let obj = {};

    for (let y of i) {
      Object.assign(obj, y);
    }
    let depDate = obj.A04DTE;
    let year = new Date().getFullYear();
    let month = new Date(depDate).getMonth().toString();
    let day = new Date(depDate).getDate();
    let fullDepartureDate = new Date(year, month, day).toLocaleDateString();
    let ind = obj.A04IND;
    let fullArrivalDate;
    switch (ind) {
      case "1":
        fullArrivalDate = new Date(year, month, day - 1).toLocaleDateString();
        break;
      case "2":
        fullArrivalDate = new Date(year, month, day).toLocaleDateString();
        break;
      case "3":
        fullArrivalDate = new Date(year, month, day + 1).toLocaleDateString();
        break;
      case "4":
        fullArrivalDate = new Date(year, month, day + 2).toLocaleDateString();
        break;

      default:
        break;
    }

    flightsObjArray.push({ dep: fullDepartureDate, arrival: fullArrivalDate });
  }
  //   console.log(flightsObjArray);
  return flightsObjArray;
}

module.exports = getAirData;
