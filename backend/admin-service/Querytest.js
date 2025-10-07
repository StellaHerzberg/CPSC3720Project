// debugQuery.js
const { connectToDatabase, queryFullDatabase } = require('./models/adminModel');

const db = connectToDatabase();
queryFullDatabase(db);
db.close();