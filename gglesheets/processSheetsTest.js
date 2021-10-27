const { google } = require("googleapis");
const path = require("path");
const spreadsheetId = "1hs47pgyM4-DigvGmLAstmH0phOcyy9o3HbvDswe17Eg";
const sheets = google.sheets("v4");
const tktToFind = "064-9903113763";


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
  console.log(upd);
}

function getVoidtktRange(arr, tkt) {
  let reverced = [...arr].reverse();
  let found = reverced.find((item) => {
    return item[5] === tkt ? item : null;
  });
  let initIndex = reverced.length - reverced.indexOf(found) + 1;

  return initIndex;
}

voidTicket(tktToFind);

