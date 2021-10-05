function getPaxSection(text, ...args) {
  let [num, code] = args

  //   let paxesCount = parseInt(args);
  // console.log(args);
  // cases missing info T50ISC T50ISA T50ISN:
  let fields = {
    A02NME: { s: 3, l: 33 }, // PASSENGER NAME
    A02TKT: { s: 48, l: 10 }, // TICKET/INVOICE NUMBERS
    A02FIN: { s: 75, l: 2 }, //ASSOCIATED FARE ITEM NUMBER FOR PASSENGER
    A02EIN: { s: 77, l: 2 }, //ASSOCIATED EXCHANGE ITEM NUMBER FOR PASSENGER
  };

  let paxArrRaw = text.split("\r").filter((line) => {
    if (line.indexOf("A02") !== -1) {
      return line;
    }
  });
  let paxArr = paxArrRaw.map((pax) => {
    let arr = Object.entries(fields).map(([key, value]) => {
      return { [key]: pax.substr(value.s + 1, value.l).replace(/\s/g,"") };
    });
    let obj = {};
    for (let i of arr) {
      Object.assign(obj, i);
    }
    
    obj.A02TKT =`${num}-${obj.A02TKT}`
    return { passenger: obj };
  });

  return { passengers: paxArr };
}

module.exports = getPaxSection;
