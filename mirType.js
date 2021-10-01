function checkMirType(obj) {
  // let type = obj.filter((item) => {
  //   return Object.keys(item)[0] === "T50IN12";
  // });
  // console.log(obj);
  // console.log(obj);
  switch (obj) {
    case "H":
      return {"MIR type":"REGULAR MIR"};
      break;
    case "D":
      return{ "MIR type":"EMD Refund"};
      break;
    case "I":
      return {"MIR type":"EMD Exchange"};
      break;
    case "F":
      return {"MIR type":"EMD Issue"};
      break;
    case "C":
      return {"MIR type":"Cancelled Refund MIR"};
      break;
    case "R":
      return {"MIR type":"Refund MIR"};
      break;
    case "V":
      return {"MIR type":"Void MIR"};
      break;
    case "Z":
      return {"MIR type":"EMD Void"};
      break;

    default:
      break;
  }

}

module.exports = checkMirType;

// D = EMD Refund (EMDR).
// H = REGULAR MIR (HB or TKP Ticketing Command Used).
// I = EMD Exchange (EMDI/EXE).
// F = EMD Issue (EMDI).
// C = Cancelled Refund MIR.
// R = Refund MIR.
// V = Void MIR.
// Z = EMD Void (EMDV).
