const fs = require("fs");
const hound = require("hound");
const folder = "C:\\Users\\Biletalu\\Desktop\\Новая папка\\Новая папка";
// const folder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка'
// const getHeader = require("./utils/getHeader");
// const parseHeader = require("./utils/parseHeader");
// const mirType = require("./utils/mirType");
// const getDomInt = require("./utils/getDomInt");
// const getFareValue = require("./utils/getFareValue");
// const getPaxSection = require("./utils/getPaxSection");
// const getAirDataSection = require("./utils/getAirDataSecion");
// const getFinalFare = require("./utils/getFinalFare");
// const dateTimeFormats = require("./helpers/dateTimeConverter");
// let [convertDate, convertTime] = dateTimeFormats;
// const correctOrder = require("./utils/correctOrder");
// const getExchangeData = require("./utils/getExchangeData")
const ProcessMir = require("./utils/ProcessMIRfile")
const whatcher = hound.watch(folder);
//T50PGN - number of pax items

whatcher.on("create", (file) => {
    let result = ProcessMir(file)
    console.log(result);
  }





);
