
// backend/admin-service/controllers/adminController.js
//something wrong with insert
const { insertDataIntoDatabase, connectToDatabase } = require('../models/adminModel');


function postEvents(req, res) {
  const { eventName, eventDate, numTickets } = req.body;

  console.log("[API] Received POST /api/events");
  console.log("Payload:", req.body);

  if (!eventName || !eventDate || numTickets == null) {
    console.log("[API] Missing required fields!");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const db = connectToDatabase();
  const sql = 'INSERT INTO events(eventName, eventDate, numTickets) VALUES (?,?,?)';

  console.log("[API] Connected to DB. Attempting to run INSERT...");

  db.run(sql, [eventName, eventDate, numTickets], function (err) {
    if (err) {
      console.error("[DB] Insert error details:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("Inserted event into DB!");
    res.status(201).json({
      message: "Event added successfully!",
      eventId: this.lastID,
    });
  });
}

function listEvents(req, res) {
  const db = connectToDatabase();
  db.all('SELECT * FROM events', [], (err, rows) => {
    db.close();
    if (err) {
      console.error("[API] GET /events error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
}

module.exports = { postEvents, listEvents };