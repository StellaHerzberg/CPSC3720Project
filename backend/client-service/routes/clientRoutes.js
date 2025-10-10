
// WILL NEED TO MODIFY, COPIED BASIC ROUTES STRUCTURE FROM PROVIDED TEMPLATE
// CLIENT ROUTES

const express = require('express');
const router = express.Router();
const { listEvents, handleTicketPurchase } = require('../controllers/clientController');
router.get('/events', listEvents);
router.post('/events/:id/purchase', handleTicketPurchase)
module.exports = router;
