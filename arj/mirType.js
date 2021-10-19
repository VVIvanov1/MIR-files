function checkMirType(obj) {

  switch (obj) {
    case "H":
      return {"MIR type":"TKT"};
      break;
    case "D":
      return{ "MIR type":"EMD-REFUND"};
      break;
    case "I":
      return {"MIR type":"EMD-EXCH"};
      break;
    case "F":
      return {"MIR type":"EMD"};
      break;
    case "C":
      return {"MIR type":"Cancelled Refund MIR"};
      break;
    case "R":
      return {"MIR type":"RFND"};
      break;
    case "V":
      return {"MIR type":"VOID"};
      break;
    case "Z":
      return {"MIR type":"EMD-VOID"};
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
