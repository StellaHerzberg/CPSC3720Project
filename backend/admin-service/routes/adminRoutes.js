
// WILL NEED TO MODIFY, COPIED BASIC ROUTES STRUCTURE FROM PROVIDED TEMPLATE
// ADMIN ROUTES

const express = require('express');
const router = express.Router();
const { listEvents } = require('../controllers/adminController');
router.get('/events', listEvents);
module.exports = router;