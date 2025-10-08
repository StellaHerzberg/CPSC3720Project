
// WILL NEED TO MODIFY, COPIED BASIC ROUTES STRUCTURE FROM PROVIDED TEMPLATE
// ADMIN ROUTES

const express = require('express');
const router = express.Router();
const { postEvents, listEvents } = require('../controllers/adminController');

router.post('/events', postEvents);


router.get('/events', listEvents);


module.exports = router;