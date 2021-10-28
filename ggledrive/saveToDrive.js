const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const mime = "text/plain";
// const folderId = "18tAuB_F8BEV6aRYsEzhAJf21vD7H_xMP";
// const folderName = "Processed MIR files";

async function saveToDrive(folderId,file, name) {
  // 
  // const folderId = '134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5 @name = file name @file = path to file @ folderId = google drive'
  // 134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "resender-gdrive-access-40037-0040b5f7fab3.json"),
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const client = await auth.getClient();
  const drive = google.drive({
    version: "v3",
    auth: auth,
    client,
  });
  // console.log(folderId);
  // console.log(name);
  // console.log(file);

  let fileMetadata = {
    name: name,
    parents: [folderId],
  };
  let media = {
    mimeType: "text/plain",
    body: fs.createReadStream(file),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        console.error(err);
      } 
    }
  );
}

// async function getFolderById(folderId) {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: path.join(
//       __dirname,
//       "resender-gdrive-access-40037-0040b5f7fab3.json"
//     ),
//     scopes: "https://www.googleapis.com/auth/drive",
//   });
//   const client = await auth.getClient();
//   const drive = google.drive({
//     version: "v3",
//     auth: auth,
//     client,
//   });

//   const params = { q: "mimeType='application/vnd.google-apps.folder'", pageSize: 10 };

//   const res = await drive.files.list(params);

//   let folders = res.data.files.filter(
//     (obj) =>
//       // obj.mimeType === "application/vnd.google-apps.folder" &&
//       obj.id === folderId
//   );
//   if (folders.length > 0) {
//     return { exist: true, folder: folders[0] };
//   } else {
//     return { exist: false };
//   }
// }
// async function processFolder(id) {
//   let folderExists = await getFolderById(id);
//   // let folderId;
//   // if (folderExists.exist === true) {
//   //   folderId = folderExists.folder.id;
//   // } else {
//   //   let newFolder = await createFolder(name);
//   //   console.log(newFolder);
//   // }
//   console.log(folderExists);
// }
module.exports = {saveToDrive}




