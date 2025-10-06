
// NEED TO MODIFY, COPIED FROM PROVIDED CONTROLLER TEMPLATE
// ADMIN CLIENT CONTROLLER

const { getEvents } = require('../models/adminModel');
const listEvents = (req, res) => {
const events = getEvents();
res.json(events);
};
module.exports = { listEvents };