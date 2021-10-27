const { watcher } = require("./whatcher");
// const folder = "C:\\Users\\user\\Desktop\\Новая папка\\Новая папка\\tickets\\MIR files";
const folder = "C:\\Users\\Biletalu\\Desktop\\Новая папка\\Новая папка\\tickets\\MIR files"
let signOns = [89, 75, 64, 56];

watcher(folder, signOns);
// console.log(whatcher);
