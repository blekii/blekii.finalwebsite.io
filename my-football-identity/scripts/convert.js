const fs = require("fs");
const csv = require("csv-parser");

const results = [];

fs.createReadStream("../database.csv")
  .pipe(csv())
  .on("data", (row) => {
    results.push({
      name: row.Name,
      ovr: Number(row.OVR),
      pace: Number(row.PAC),
      shooting: Number(row.SHO),
      passing: Number(row.PAS),
      dribbling: Number(row.DRI),
      defending: Number(row.DEF),
      physical: Number(row.PHY),
      position: row.Position,
      team: row.Team,
      league: row.League,
      age: Number(row.Age),
      nation: row.Nation,
      url: row.url,
    });
  })
  .on("end", () => {
    fs.writeFileSync("../public/data/eafc_players.json", JSON.stringify(results));
    console.log("CSV converted → eafc_players.json");
  });
