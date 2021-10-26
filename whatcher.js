// const fs = require("fs");
const hound = require("hound");
const { checkOwner } = require("./utils/getMirOwner");
const ProcessMir = require("./utils/ProcessMIRfile");

function watcher(folder, sons) {
  const whatcher = hound.watch(folder);

  whatcher.on("create", (file) => {
    // console.log(file);
    let mirOwner = checkOwner(file, sons);
    if (mirOwner) {
      console.log("we take this MIR as its ours");
      let result = ProcessMir(file);
      console.log(result);
    } else {
      console.log("we skip this MIR as it is not ours");
    }
  });
}

module.exports = { watcher };
