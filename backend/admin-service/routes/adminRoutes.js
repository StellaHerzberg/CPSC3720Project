// This file defines the Express router for all admin-related
// API endpoints. It maps HTTP requests to their corresponding
// controller functions. This is a basic version of the file that was copied from
// template and may need to be modified for added functionality.

// WILL NEED TO MODIFY, COPIED BASIC ROUTES STRUCTURE FROM PROVIDED TEMPLATE
// ADMIN ROUTES

const express = require('express');
const router = express.Router();
const { postEvents, listEvents } = require('../controllers/adminController');

router.post('/events', postEvents);


router.get('/events', listEvents);


module.exports = router;
