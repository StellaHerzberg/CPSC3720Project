
// NEED TO MODIFY, COPIED FROM PROVIDED CONTROLLER TEMPLATE
// CLIENT CONTROLLER

// const { getEvents } = require('../models/clientModel').default;
// const listEvents = (req, res) => {
// const events = getEvents();
// res.json(events);
// };


// module.exports = { listEvents };


// backend/admin-service/controllers/adminController.js
//something wrong with insert
// const { insertDataIntoDatabase, connectToDatabase } = require('../models/clientModel');

import { getEvents } from '../models/clientModel.js';

export const listEvents = async (req, res) => {
    try {
        const events = await getEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch events", details: err.message})
    }
};



// function postEvents(req, res) {
//   const { eventName, eventDate, numTickets } = req.body;

//   if (!eventName || !eventDate || numTickets == null) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const db = connectToDatabase();
//   try {
//     insertDataIntoDatabase(db, eventName, eventDate, numTickets);
//   }
//   catch(err) {
//     console.error(err.message);
//   }
// }


// function listEvents(req, res) {
//   const db = connectToDatabase();
//   db.all('SELECT * FROM events', [], (err, rows) => {
//     db.close();
//     if (err) {
//       console.error("API GET /events error:", err.message);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// }

// module.exports = { postEvents, listEvents };

// const { insertDataIntoDatabase, connectToDatabase } = require('../models/adminModel');


// function postEvents(req, res) {
//   const { eventName, eventDate, numTickets } = req.body;

//   if (!eventName || !eventDate || numTickets == null) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const db = connectToDatabase();
//   try {
//     insertDataIntoDatabase(db, eventName, eventDate, numTickets);
//   }
//   catch(err) {
//     console.error(err.message);
//   }
// }


// function listEvents(req, res) {
//   const db = connectToDatabase();
//   db.all('SELECT * FROM events', [], (err, rows) => {
//     db.close();
//     if (err) {
//       console.error("API GET /events error:", err.message);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// }

// module.exports = { postEvents, listEvents };