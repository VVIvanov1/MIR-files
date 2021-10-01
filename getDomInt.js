function getDomInt(obj) {
//   let item = obj.filter((it) => Object.keys(it)[0] === "T50IN17");
  return obj === "X"
    ? { "itinerary type": "International" }
    : { "itinerary type": "Domestic" };
}

module.exports = getDomInt;
