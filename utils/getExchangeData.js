function getExchangeData(input, ...args) {
  const [fares] = args;
  git 
  const fields = {
    A10EXI: { s: 3, l: 2 }, // pax number
    A10DOI: { s: 5, l: 7 }, // date of original issue
    A10FOP: { s: 42, l: 19 }, // form of payment
    A10TYP: { s: 79, l: 1 }, // type of exch ticket
    // A = ADD COLLECT
    // R = REFUND
    // E = EVEN EXCHANGE
  };
  // /A10.*\n.*\n.*/gm
  let regex = /A10.*\r\n.*\r\n.*/gm;
  let mat = regex.exec(input);
  // get pax reference DOI FOP and type
  let exchTicketArr = mat.map((block) => {
    let obj = Object.entries(fields).map(([key, val]) => {
      return { [key]: block.substr(val.s, val.l).replace(/\s/g, "") };
    });
    let found = obj.find((item) => item.A10EXI);
    let fareNet = fares.fares.find(
      (item) => item.fare.fareData.A07FSI === found.A10EXI
    );

    let ticketRegex = /TI:.*/g;
    let tkt = block.match(ticketRegex)[0].substr(3, 13);
    obj.tktNumber = tkt.substr(0, 3) + "-" + tkt.substr(3);

    obj.t1 = block.match(/T1:.{10}/g)[0].replace(/T\d:\s*/g, "");
    obj.t2 = block.match(/T2:.{10}/g)[0].replace(/T\d:\s*/g, "");
    obj.t3 = block.match(/T3:.{10}/g)[0].replace(/T\d:\s*/g, "");
    obj.t1 = Number(obj.t1.match(/\d+/g)[0]);
    obj.t2 = Number(obj.t2.match(/\d+/g)[0]);
    obj.t3 = Number(obj.t3.match(/\d+/g)[0]);
    obj.fareUsed = Number(block.match(/(?<=KZT)\d+/gm)[0]);
    let exchTicketTotal = /(?<=T5:.{10}).{12}/g;
    let newTktTtl = fareNet.fare.fareData.A07TTA;
    let newTktFare = fareNet.fare.fareData.A07EQV;
    let newTicketTaxes = newTktTtl - newTktFare;
        let oldTicketTtl = obj.fareUsed + obj.t1 + obj.t2 + obj.t3
    obj.tktTotal = newTktFare - obj.fareUsed + newTicketTaxes;

    obj.record = `Ticket ${obj.tktNumber} issued ${obj[1].A10DOI} total ${oldTicketTtl} KZT`;
    return obj;
  });
  //   console.log(exchTicketArr);
  return exchTicketArr;
}

module.exports = getExchangeData;
