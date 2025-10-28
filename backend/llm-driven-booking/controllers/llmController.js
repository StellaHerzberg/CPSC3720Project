import { getEvents, purchaseTicket } from '../models/llmModel.js';

// Just trying to mimic the client service rn, not actually sure what we need in here


export const listEvents = async (req, res) => {
    // try {
    //     const events = await getEvents();
    //     res.json(events);
    // } catch (err) {
    //     res.status(500).json({error: "Failed to fetch events", details: err.message})
    // }
};


export const handleTicketPurchaseLLM = async (req, res) => {
    
    // const id = req.params.id;

    // try {
    //     const ticketsRemaining = await purchaseTicket(id);
    //     res.json({success: true, ticketsRemaining})
    // } catch (err) {
    //     res.status(400).json({error: err.message});
    // }
};




