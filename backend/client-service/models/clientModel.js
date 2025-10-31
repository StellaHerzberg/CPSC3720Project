// Module defines all database related functions for the client-service. It connects to the shared
// database and provides methods to read events and handle ticket purchases.

// import sqlite3 from "sqlite3";
// import path from "path";
// import {fileURLToPath} from "url";
const sqlite3 = require("sqlite3").verbose();
const path = require("path");


// Function to create and return a variable connected to the database
// Params: None
// Return: db a SQLite database connection object used for queries
// Side effects: creates database file if doesn't exist, print error message if fails
function connectToDatabase() {

    const dbPath =
    process.env.NODE_ENV === "test"
      ? path.join(__dirname, "../../shared-db/test.sqlite")
      : path.join(__dirname, "../../shared-db/database.sqlite");

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
// Params: db - SQLite database connection 
// Params: attributeToUpdate - name of attribute in table to be updated
// Params: newData - new value to assign to attribute
// Params: dataIndex = ID of event record to update
// Return: None
// Side Effects: Executes SQL UPDATE command to modify the table, prints an error if fails
function updateDataInDatabase(db, attributeToUpdate, newData, dataIndex) {

    // Sets a new variable equal to the command to update the desired data
    let sql = 'UPDATE events SET ' + attributeToUpdate + ' = ? WHERE id = ?';

    // Runs the data update with the given command
    db.run(sql, [newData, dataIndex], (err) => {
        if (err) return console.error(err.message);
    });
}

// Function to retrieve all event records from table in shared database. Establishes a 
// database connection, executes SQL query, and returns all rows
// Params: None
// Returns: Promise<Array<Object>> - resolves to an array of records corresponding to row in table
// Side Effects: opens connection to database and logs the connection
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

// Handles purchase of a single ticket for a specified event. Function retrieves event from the table
// verifies that tickets are available, manipulates number of tickers and updates database
// Params: id - unique ID of event
// Returns: Promise<number> - promise resolves to updated number of remaining tickets after purchase
// Side Effects: reads and updates table in database. Decrements numTickets column if no error.
const purchaseTicket = async (id) => {
    const db = connectToDatabase();

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
