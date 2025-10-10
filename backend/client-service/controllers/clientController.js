
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

export const listEvents = async (req, res) => {
    try {
        const events = await getEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch events", details: err.message})
    }
};

export const handleTicketPurchase = async (req, res) => {
    
    const id = req.params.id;

    try {
        const ticketsRemaining = await purchaseTicket(id);
        res.json({success: true, ticketsRemaining})
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};




