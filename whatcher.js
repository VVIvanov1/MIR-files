const fs = require("fs");
const path = require('path')
const hound = require("hound");
const { checkOwner } = require("./utils/getMirOwner");
const ProcessMir = require("./utils/ProcessMIRfile");

function watcher(folder, sons) {
  const whatcher = hound.watch(folder);

  whatcher.on("create", (file) => {
    setTimeout(function () {
      let mirOwner = checkOwner(file, sons);
      if (mirOwner) {
        
        ProcessMir(file);
        
      } else {
        console.log("we skip this MIR as it is not ours");
      }
    }, 1000)
   
  });
}

module.exports = { watcher };
