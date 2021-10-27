const { google } = require("googleapis");
const path = require("path");
const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg";
const sheets = google.sheets("v4");
const tktToFind = "064-9903113763";

// async function getTicketsData() {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: path.join(__dirname, "credentials.json"),
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });
//   const client = await auth.getClient();
//   const googleSheets = google.sheets({ version: "v4", auth: client });
//   const request = {
//     spreadsheetId: spreadsheetId,
//     range: ["Galileo!A2:V"],
//     // includeGridData: true,
//   };
//   // indexes = 5(tkt) 9(fare) 10(taxes) 11 (total)
//   const res = await googleSheets.spreadsheets.values.get(request);
//   const resDataArray = res.data.values.reverse();
//   let found = resDataArray.find((item) => {
//     return item[5] === tktToFind;
//   });
//   //   console.log(res);
//   console.log(found);
// }
async function voidTicket(tkt) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "credentials.json"),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const request = {
    spreadsheetId: spreadsheetId,
    range: ["Galileo!A2:V"],
  };
  const res = await googleSheets.spreadsheets.values.get(request);
  let range = getVoidtktRange(res.data.values, tkt);
  const resource = {
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
        "void",
      ]],
    },
  };
  let upd = await googleSheets.spreadsheets.values.update(resource);
  console.log(upd);
}

function getVoidtktRange(arr, tkt) {
  let reverced = [...arr].reverse();
  let found = reverced.find((item) => {
    return item[5] === tkt ? item : null;
  });
  let initIndex = reverced.length - reverced.indexOf(found) + 1;
  return `Galileo!A${initIndex}:V${initIndex}`;
}

voidTicket(tktToFind);
// let addres = getVoidtktRange(initialArr, tktToFind);

// console.log(addres);
