function getFareValue(text, ...args) {
  let [count] = args;
  // console.log(count);
  let fields = {
    A07FSI: { s: 3, l: 2 }, // FARE SECTION INDICATOR
    A07CRB: { s: 5, l: 3 }, // CURRENCY CODE FOR BASE FARE
    A07TBF: { s: 8, l: 12 }, // BASE FARE AMOUNT
    A07CRT: { s: 20, l: 3 }, // CURRENCY CODE FOR TOTAL AMOUNT
    A07TTA: { s: 23, l: 12 }, // TOTAL AMOUNT
    A07CRE: { s: 35, l: 3 }, // CURRENCY CODE FOR EQUIVALENT AMOUNT
    A07EQV: { s: 38, l: 12 }, // EQUIVALENT AMOUNT
  };
  let patternFare = /^A07[\s\S]*?^.*[^A08]\n/gm;

  let res = patternFare.exec(text);
  if (res !== null) {
    let pieceLength = res[0].length / count;
    let chunks = [];
    let start = 0;
    for (let i = 0; i < Number(count); i++) {
      chunks.push(res[i].substr(start, pieceLength - 1));
      start = start + pieceLength - 1;
    }

    let resulted = chunks.map((ch) => {
      let fareData = getFareData(fields, ch);
      fareData.itTaxes = getItTaxBreakdown(ch);
      fareData.mainTaxes = getMainTaxes(ch);
      return { fare: { fareData } };
    });

    return { fares: resulted };
  } else {
    return null;
  }
}
function getFareData(input, text) {
  let corrector = ["A07TBF", "A07TTA", "A07EQV"];
  let result = Object.entries(input).map(([key, value]) => {
    if (corrector.indexOf(key) !== -1) {
      return { [key]: parseInt(text.substr(value.s, value.l)) };
    } else {
      return { [key]: text.substr(value.s, value.l) };
    }
  });
  let obj = {};
  for (let i of result) {
    Object.assign(obj, i);
  }

  return obj;
}

function getItTaxBreakdown(input) {
  let individualTx = [];
  let startChunk = 3;
  if (input.indexOf("XT") !== -1) {
    let itTax = input
      .slice(input.indexOf("IT:"))
      .replace("\r", "")
      .replace("\n", "");
    let count = Math.floor((itTax.length - 3) / 10);
    for (let i = 0; i < count; i++) {
      let code = itTax.substr(startChunk + 8, 2);
      individualTx.push({
        [code]: parseInt(itTax.substr(startChunk, 8)),
      });
      startChunk += 10;
    }
  }
  return individualTx;
}
function getMainTaxes(input) {
  let taxes = ["T1:", "T2:", "T3:"];
  let startIndex = input.indexOf(taxes[0]) + 3;
  let obj = [];
  for (let i of taxes) {
    if (input.indexOf(i) !== -1) {
      let code = input.substr(startIndex + 8, 2);
      let tx = {
        [code]: parseInt(input.substr(startIndex, 8)),
      };
      obj.push(tx);
      startIndex += 13;
    }
  }
  return obj;
}

module.exports = getFareValue;
