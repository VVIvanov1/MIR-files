const parser = require('./index')
const path = require('path')
const fs = require('fs')
const file = path.join(__dirname, "files/AAAHTGAL.MIR");
const { google } = require('googleapis')
// files/AAAHWGAL.MIR 
// files/AAAHVGAL  EMD BAG issue.MIR
// files/AAAHXGAL.MIR ??
// files/AAAIAGAL.MIR   VOID
// files/AAAJTGAL.MIR REFUND
// files/AAAJVGAL.MIR EMD
// files/AAAJWGAL.MIR EMD-VOID
// files/AAAJXGAL.MIR RFND

let rawText = fs.readFileSync(file, "utf8", (err, text) => {
  if (err) {
    console.error(err);
  } else {
    return text;
  }
});
let res = parser(rawText)
let src = Object.entries(res).map(([key, val]) => { return val })

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets"
})
// const client = await auth.getClient()
const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg"

// read sheets info function
// async function getGoogleSheets(auth, googleSheets) {
//   const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg"
//   const googleSheets = google.sheets({ version: "v4", auth: client })
//   const metaData = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId
//   })
//   console.log(metaData.data);
// }

// getGoogleSheets()
// read sheet data
// async function getSheetData(auth) {
//   // const auth = new google.auth.GoogleAuth({
//   //   keyFile: "credentials.json",
//   //   scopes: "https://www.googleapis.com/auth/spreadsheets"
//   // })
//   const client = await auth.getClient()
//   const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg"
//   const googleSheets = google.sheets({ version: "v4", auth: client })
//   // const client = await auth.getClient()
//   const getRows = await googleSheets.spreadsheets.values.get({
//     auth,
//     spreadsheetId,
//     range: "Galileo"
//   })
//   console.log(getRows.data);

// }

// getSheetData(auth)


// write rows to spreadsheets
async function writeToSheets(auth) {
  const client = await auth.getClient()
  const googleSheets = google.sheets({ version: "v4", auth: client })
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Galileo",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        src
      ]
    }
  })
}
writeToSheets(auth)
