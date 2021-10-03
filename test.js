const parser = require('./index')
const path = require('path')
const fs = require('fs')
const file = path.join(__dirname, "files/AAAHTGAL.MIR");
let rawText = fs.readFileSync(file, "utf8", (err, text) => {
    if (err) {
      console.error(err);
    } else {
      return text;
    }
  });

console.log(parser(rawText));