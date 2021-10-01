function getPaxSection(text, args) {
  //   let paxesCount = parseInt(args);
  let fields = {
    A02NME: { s: 3, l: 33 }, // PASSENGER NAME
    A02TKT: { s: 48, l: 10 }, // TICKET/INVOICE NUMBERS
    A02FIN: { s: 75, l: 2 }, //ASSOCIATED FARE ITEM NUMBER FOR PASSENGER
    A02EIN: { s: 77, l: 2 }, //ASSOCIATED EXCHANGE ITEM NUMBER FOR PASSENGER
  };

  let paxArrRaw = text.split("\r").filter((line) => {
    if (line.indexOf("A02") !== -1) {
      //   console.log(line);
      return line;
    }
    // return "\r"+line.indexOf("A02") !== -1;
  });
  //   console.log(paxArrRaw);
  let paxArr = paxArrRaw.map((pax) => {
    //   console.log(pax);
    let arr = Object.entries(fields).map(([key, value]) => {
      return { [key]: pax.substr(value.s + 1, value.l) };
    });
    // console.log(arr);
    let obj = {};
    for (let i of arr) {
      Object.assign(obj, i);
    }
    return { passenger: obj };
  });

  return { passengers: paxArr };
}

module.exports = getPaxSection;
