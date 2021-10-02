
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
        A04OCC: { s: 46, l: 3 }, // origin city info
        A04OCN: { s: 49, l: 13 }, // origin city name
        A04DCC: { s: 62, l: 3 }, // destination city code
        A04DCN: { s: 5, l: 13 }, // destination city name
        A04BAG: { s: 86, l: 3 } // baggage allowence 
    }



    let arr = text.split("\n")
    let flights = arr.filter(item => {
        if (item.startsWith("A04")) {
            return item
        }
    })
    // console.log(fligthsArr);
    let flightsArrReady = []

    flights.forEach(element => {
        let fl = Object.entries(fields).map(([key, value]) => {
            return { [key]: element.substr(value.s, value.l) }
        })
        // console.log(fl);
        flightsArrReady.push(fl)
    });
    // for(var f of fligthsArr){
    //     let fl = Object.keys(fields).map(([key, value]) => {
    //         return {[key]: f.substr(value.s,value.l)}
    //     })
    //     flightsArrReady.push(fl)
    // }



    return {flights:flightsArrReady}
}

module.exports = getAirData