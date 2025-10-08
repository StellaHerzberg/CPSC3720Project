
// backend/admin-service/controllers/adminController.js
//something wrong with insert
const { insertDataIntoDatabase, connectToDatabase } = require('../models/adminModel');


function postEvents(req, res) {
  const { eventName, eventDate, numTickets } = req.body;

  if (!eventName || !eventDate || numTickets == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = connectToDatabase();
  try {
    insertDataIntoDatabase(db, eventName, eventDate, numTickets);
  }
  catch(err) {
    console.error(err.message);
  }
}


function listEvents(req, res) {
  const db = connectToDatabase();
  db.all('SELECT * FROM events', [], (err, rows) => {
    db.close();
    if (err) {
      console.error("API GET /events error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
}

module.exports = { postEvents, listEvents };