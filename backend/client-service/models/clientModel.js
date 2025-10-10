
// import sqlite3 from "sqlite3";
// import path from "path";
// import {fileURLToPath} from "url";
const sqlite3 = require("sqlite3").verbose();
const path = require("path");


// Function to create and return a variable connected to the database
function connectToDatabase() {

    // const sqlite = sqlite3.verbose();

// Recreate __dirname in ES modules
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    const dbPath = path.join(__dirname, "../../shared-db/database.sqlite");
    console.log("DB Trying to open:", dbPath);
    // Set the path to the sqlite database equal to a new variable, opening in readwrite mode
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return db;
}

// Function to update a data entry already in the database
function updateDataInDatabase(db, attributeToUpdate, newData, dataIndex) {

    // Sets a new variable equal to the command to update the desired data
    let sql = 'UPDATE events SET ' + attributeToUpdate + ' = ? WHERE id = ?';

    // Runs the data update with the given command
    db.run(sql, [newData, dataIndex], (err) => {
        if (err) return console.error(err.message);
    });
}

const getEvents = async () => {
    const db = connectToDatabase();

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM events';
        db.all(sql, [], (err,rows) => {
            if (err) return reject(err);

            resolve(rows);
        });
    });
};

const purchaseTicket = async (id) => {
    const db = connectToDatabase();
    // const dbPath = path.join(__dirname, "../../shared-db/database.sqlite");
    // const db = await open({
    //     filename: dbPath,
    //     driver: sqlite3.Database
    // })
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM events WHERE id = ?', [id], (err, event) => {

            if (err) return reject(err);
            if (!event) return reject(new Error("Event not found."));
            if (event.numTickets <= 0) return reject(new Error("Event is sold out."));

            const ticketsRemaining = event.numTickets - 1;

            db.run(
                'UPDATE events SET numTickets = ? WHERE id = ?', 
                [ticketsRemaining, id], 
                function(err) {
                    if (err) return reject(err);
                    resolve(ticketsRemaining);
                }
            );
        });
    });
}




module.exports = { getEvents, purchaseTicket }

// const getEvents = (callback) => {

//     // Sets a new variable equal to the command to select data from all entries
//     const db = connectToDatabase();
//     let sql = 'SELECT * FROM events';

//     db.all(sql, [], (err, rows) => {
//         if (err) return callback(err, rows);
//         callback(null, rows);
//     });
// };


// export default { getEvents };


// Hardcoded data format example: 
// { id: 1, name: 'Clemson Football Game', date: '2025-09-01' }
// { id: 2, name: 'Campus Concert', date: '2025-09-10' }
// { id: 3, name: 'Career Fair', date: '2025-09-15' }