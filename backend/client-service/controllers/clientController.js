
// NEED TO MODIFY, COPIED FROM PROVIDED CONTROLLER TEMPLATE
// CLIENT CONTROLLER

const { getEvents } = require('../models/clientModel');
const listEvents = (req, res) => {
const events = getEvents();
res.json(events);
};
module.exports = { listEvents };