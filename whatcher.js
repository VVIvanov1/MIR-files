// const fs = require("fs");
const hound = require("hound");
const folder = "C:\\Users\\Biletalu\\Desktop\\Новая папка\\Новая папка";
// const folder = 'C:\\Users\\user\\Desktop\\Новая папка\\Новая папка'

const ProcessMir = require("./utils/ProcessMIRfile")
const whatcher = hound.watch(folder);
//T50PGN - number of pax items

whatcher.on("create", (file) => {
    let result = ProcessMir(file)
    console.log(result);
  }





);
