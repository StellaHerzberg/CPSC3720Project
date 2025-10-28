const sqlite3 = require("sqlite3").verbose();
const path = require("path");


// Trying to replicate client model rn, not sure what we actually need in here


function connectToDatabase() {

//     const dbPath = path.join(__dirname, "../../shared-db/database.sqlite");
//     console.log("DB Trying to open:", dbPath);
//     // Set the path to the sqlite database equal to a new variable, opening in readwrite mode
//     const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//   });
//   return db;
}


function updateDataInDatabase(db, attributeToUpdate, newData, dataIndex) {

    // // Sets a new variable equal to the command to update the desired data
    // let sql = 'UPDATE events SET ' + attributeToUpdate + ' = ? WHERE id = ?';

    // // Runs the data update with the given command
    // db.run(sql, [newData, dataIndex], (err) => {
    //     if (err) return console.error(err.message);
    // });
}


const getEvents = async () => {
    // const db = connectToDatabase();

    // return new Promise((resolve, reject) => {
    //     const sql = 'SELECT * FROM events';
    //     db.all(sql, [], (err,rows) => {
    //         if (err) return reject(err);

    //         resolve(rows);
    //     });
    // });
};


const purchaseTicket = async (id) => {
    // const db = connectToDatabase();

    // return new Promise((resolve, reject) => {
    //     db.get('SELECT * FROM events WHERE id = ?', [id], (err, event) => {

    //         if (err) return reject(err);
    //         if (!event) return reject(new Error("Event not found."));
    //         if (event.numTickets <= 0) return reject(new Error("Event is sold out."));

    //         const ticketsRemaining = event.numTickets - 1;

    //         db.run(
    //             'UPDATE events SET numTickets = ? WHERE id = ?', 
    //             [ticketsRemaining, id], 
    //             function(err) {
    //                 if (err) return reject(err);
    //                 resolve(ticketsRemaining);
    //             }
    //         );
    //     });
    // });
}




module.exports = { getEvents, purchaseTicket }