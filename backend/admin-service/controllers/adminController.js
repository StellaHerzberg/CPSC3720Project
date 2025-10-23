// This file defines controller functions for handling admin-related
// API requests. Controllers sit between the routes and models.
// Contains business logic (input validation, error
// handling, and calling model functions) to perform DB operations.

// backend/admin-service/controllers/adminController.js
//something wrong with insert
const { insertDataIntoDatabase, connectToDatabase } = require('../models/adminModel');

// Handles requests to add a new event to the database. Will validate that all fields
// are provided (eventName, eventDate, numTickets)
// Param: req - Express request object containing event data
// Param: res - Express response object used to send a JSON response.
// Return: void
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

// Handles GET request for all events. Connects to SQL datbase, selects all rows from events
// table and returns them as JSON array.
// Params: req - Express request object 
// Params: res - Exress response object used to send back result
// Returns: void
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
