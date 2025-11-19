// Module defines all database related functions for the user-authentication service. It connects to the shared
// database and provides methods to add users, get users, and verify passwords.


const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcryptjs");


// Function to create and return a variable connected to the database
// Params: None
// Return: db a SQLite database connection object used for queries
// Side effects: creates database file if doesn't exist, print error message if fails
function connectToDatabase() {

    const dbPath = path.join(__dirname, "../userData/userData.sqlite");

    console.log("DB Trying to open:", dbPath);
    // Set the path to the sqlite database equal to a new variable, opening in readwrite mode
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  return db;
}


// Function to create the new database table for users set up like:
// Columns:
//   - id: Primary key 
//   - email: User's entered email address
//   - hashedPassword: encrypted password using bcryptjs
// No parameters
function createDatabaseTable() {

    const db = connectToDatabase();
    // Set variable equal to command to create the new database table with needed categories
    let sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, hashedPassword TEXT)';

    // Create the database table

    db.run(sql, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("User table successfully made!");
        }
    });
}



// Function to insert a new data entry into the database
// Params: db - database connection
// Params: email - user's email address
// Params: hashedPassword - user's encrypted password using bcryptjs
// Return: None
function addUser(email, hashedPassword) {

    const db = connectToDatabase();

    // Sets a variable equal to the sqlite command to insert data
      const sql = 'INSERT INTO users(email, hashedPassword) VALUES (?,?)';
  
    // Runs the sqlite command to add to the table with new data entires passed into the funciton
    db.run(sql, 
        [email, hashedPassword], 
        (err)=> {
            if (err) return console.error(err.message);
    });
    

}


// Function to select the entire database and print out each entry
function queryFullDatabase(db) {

    // Sets a new variable equal to the command to select data from all entries
    let sql = 'SELECT * FROM users';

    // Runs the data query with the given command
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);

        // Prints out each individual data entry and its associated values
        rows.forEach((row) => {
            console.log(row);
        })
    });
}

// Function to filter through the users database and find all matching data
// entries with the desired email address.
// Params: email - user's entered email address
// Return: all sqlite entries with the matching email address
const getUser = async (email) => {

    const db = connectToDatabase();

    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";

        db.get(sql, [email], (err, row) => {
            if (err) reject(err);
            else resolve(row || null);

        });
    });
}


// Function to verify the entered password from the user currently trying to login.
// Params: email - the user's entered email address
//         password - the unencrypted version of the user's password
// Return: true or false depending on if the password correctly matches with the stored hashed password
const verifyPassword = async (email, password) => {

    const user = await getUser(email);

    if (!user) return false;

    const userMatch = await bcrypt.compare(password, user.hashedPassword);
    return userMatch ? user : false;
}


module.exports = {connectToDatabase, queryFullDatabase, createDatabaseTable, addUser, getUser, verifyPassword};



