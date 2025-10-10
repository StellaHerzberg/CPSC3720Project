const sqlite3 = require("sqlite3").verbose();
const path = require("path");



const dbPath = path.join(__dirname, "../shared-db/database.sqlite");
console.log("DB Trying to open:", dbPath);

// Set the path to the sqlite database equal to a new variable, opening in readwrite mode
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
if (err) {
    console.error(err.message);
}
else {
    console.log("Successfully connected to the SQLite Database")
}
});

module.exports = db;
