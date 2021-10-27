const fs = require("fs")
const path = require("path")
const getHeader = require("../utils/getHeader")
const parseHeader = require("../utils/parseHeader")
const file = "C:\\Users\\Biletalu\\Documents\\tuts\\MIR-files\\files\\AAAHTGAL.MIR"

let rawText = fs.readFileSync(file,"utf8");

let hdr = getHeader(rawText)
let parsed = parseHeader(hdr)
//T50RCL T50AGT

let name = `${parsed.T50RCL}-${parsed.T50AGT}-${path.basename(file)}`
console.log(name);