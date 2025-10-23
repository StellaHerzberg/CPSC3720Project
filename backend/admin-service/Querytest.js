// debugQuery.js
// This connects to the SQLite database using the same
// functions already defined and runs a full query for debugging.

const { connectToDatabase, queryFullDatabase } = require('./models/adminModel');

const db = connectToDatabase();
queryFullDatabase(db);
db.close();
