function getItTaxData(string, step = 10) {
  let arr = [];
  while (string.length >= step) {
    let str = string.substr(0, step);
    arr.push(str);
    string = string.replace(str, "");
  }

  let taxString = arr.reduce((prev, curr) => {
    return (prev =
      prev +
      "(" +
      curr.substring(8) +
      ")" +
      curr.substring(0, 8).replace(/\s/g, "") +
      "-");
  }, "").slice(0,-1);
  let itTaxTotal = arr.reduce((prev, curr) => {
    return (prev = prev + Number(curr.substring(0, 8).replace(/\s/g, "")));
  }, 0);
  return { itTaxex: taxString, itTaxTotal };
}


module.exports = getItTaxData;
// let string = "    9401CZ   27264YQ    9401CY    9401CI";
// let step = 10;

// let itTaxArr = chunkItString(string, step);

// console.log(itTaxArr);
