// This file defines routes for the client-facing side of the
// application. These endpoints allow clients to retrieve event
// listings and purchase tickets.
// Each route delegates request handling to controller functions
// in clientController.js.

// WILL NEED TO MODIFY, COPIED BASIC ROUTES STRUCTURE FROM PROVIDED TEMPLATE
// CLIENT ROUTES

const express = require('express');
const router = express.Router();
const { listEvents, handleTicketPurchase } = require('../controllers/clientController');
const { verifyUsingJWT } = require('../../user-authentication/controllers/uaController');
router.get('/events', listEvents);
router.post('/events/:id/purchase', verifyUsingJWT, handleTicketPurchase)
module.exports = router;
