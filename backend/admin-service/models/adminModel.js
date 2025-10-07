
// NEED TO MODIFY, BASIC MODELS STRUCTURE FROM PROVIDED TEMPLATE
// ADMIN MODEL


const sqlite3 = require("sqlite3").verbose();
const path = require("path");


// Function to create and return a variable connected to the database
function connectToDatabase() {

    const dbPath = path.join(__dirname, "../../shared-db/database.sqlite");
    // Set the path to the sqlite database equal to a new variable, opening in readwrite mode
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error("[DB] connection error:", err.message);
    } else {
      console.log("Database connection established");
    }
  });
  return db;
}


// Function to create the new database table for events
function createDatabaseTable() {
    const db = connectToDatabase();
    // Set variable equal to command to create the new database table with needed categories
    let sql = 'CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT, eventName TEXT, eventDate TEXT, numTickets INTEGER)';

    // Create the database table
    db.run(sql, (err) =>{
        if (err) {
        console.error("[DB] Table creation error:", err.message);
        }
        else {
            console.log("Table sucessfully made!")
        }
    });
}


// Function to delete the events database table if needed
function deleteDatabaseTable(db) {
    db.run("DROP TABLE events");
}


// Function to insert a new data entry into the database
function insertDataIntoDatabase(db, eventName, eventDate, numTickets) {

    // Sets a variable equal to the sqlite command to insert data
    let sql = 'INSERT INTO events(eventName, eventDate, numTickets) VALUES (?,?,?)';
    
    // Runs the sqlite command to add to the table with new data entires passed into the funciton
    db.run(sql, 
        [eventName, eventDate, numTickets], 
        (err)=> {
            if (err) return console.error(err.message);
    });
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


// Function to delete a specified data entry in the database
function deleteDataInDatabase(db, indexToDelete) {

    // Sets a new variable equal to the command to delete the data at the given id
    let sql = 'DELETE FROM events WHERE id = ?';

    // Runs the data deletion with the given command
    db.run(sql, indexToDelete, (err) => {
        if (err) return console.error(err.message);
    });
}


// Function to select the entire database and print out each entry
function queryFullDatabase(db) {

    // Sets a new variable equal to the command to select data from all entries
    let sql = 'SELECT * FROM events';

    // Runs the data query with the given command
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);

        // Prints out each individual data entry and its associated values
        rows.forEach((row) => {
            console.log(row);
        })
    });
}


module.exports = { connectToDatabase, createDatabaseTable, insertDataIntoDatabase, queryFullDatabase };




// !!! Will need to put final product in this format below, the const getEvents and return stuff and set equal to module.exports

// const getEvents = () => {
// return [

//     // hardcoded data in here orignally
//     // need to get the data from sql database dynamically
//     // not sure precisely what we're doing here on the admin side of things
//     // might be updating events in here through a postAPI, but then it would not be called get Events
// ];
// };
// module.exports = { getEvents };

// Hardcoded data format example: 
// { id: 1, name: 'Clemson Football Game', date: '2025-09-01' }
// { id: 2, name: 'Campus Concert', date: '2025-09-10' }
// { id: 3, name: 'Career Fair', date: '2025-09-15' }