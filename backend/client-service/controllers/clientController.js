
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

import { getEvents, purchaseTicket } from '../models/clientModel.js';

// Handles request to retrieve events from database and returns as JSON response
// Params: req - the request object
// Params: res - response object to sent retrieved event 
// Return: None because responds with server status
// Side Effects: Calls getEvents() and sends JSON
export const listEvents = async (req, res) => {
    try {
        const events = await getEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch events", details: err.message})
    }
};

// Handles request to purchase ticket for an event. Function extracts event ID, calls purchaseTicket() to decrement,
// and returns the number of tickets remaining.
// Params: req - request object to contain the ID of event being purchased
// Params: res - response object to send success or error
// Return: None because responds directly with status
// Side Effects: Modifies "numTickets" in database for event and sends JSON response.
export const handleTicketPurchase = async (req, res) => {
    
    const id = req.params.id;

    try {
        const ticketsRemaining = await purchaseTicket(id);
        res.json({success: true, ticketsRemaining})
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};




