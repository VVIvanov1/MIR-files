const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
// const { authenticate } = require("@google-cloud/local-auth");
// const sheets = google.sheets("v4");

const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg";

async function writeToSheets(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "gsheets-serviceacc-30569f096671.json"),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    const client = await auth.getClient();
    
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const res = await googleSheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: "Galileo",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data],
      },
    });
    // console.log(res);
    
  } catch (error) {
    console.error;
  }
}

async function voidTicket(tkt) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "gsheets-serviceacc-30569f096671.json"),
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const request = {
    spreadsheetId: spreadsheetId,
    range: ["Galileo!A2:V"],
  };
  const res = await googleSheets.spreadsheets.values.get(request);
  let row = getVoidtktRange(res.data.values, tkt);
  let range = `Galileo!E${row}`;

  let upd = await googleSheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["VOID"]]
    }
  });
  
}

function getVoidtktRange(arr, tkt) {
  let reverced = [...arr].reverse();
  let found = reverced.find((item) => {
    return item[5] === tkt ? item : null;
  });
  let initIndex = reverced.length - reverced.indexOf(found) + 1;

  return initIndex;
}

module.exports = { writeToSheets, voidTicket };
// async function saveRefundRecord(refund) {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: path.join(__dirname, "lustrous-baton-327814-78c876fb8436.json"),
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });
//   const client = await auth.getClient();
//   const googleSheets = google.sheets({ version: "v4", auth: client });
//   const request = {
//     spreadsheetId: spreadsheetId, // TODO: Update placeholder value.
//     range: ["Galileo!A2:R1000"], // TODO: Update placeholder value.
//     //  includeGridData: true,  // TODO: Update placeholder value.
//   };
//   // indexes = 5(tkt) 9(fare) 10(taxes) 11 (total)
//   const res = await googleSheets.spreadsheets.values.get(request);
//   //   console.log(res);
// }