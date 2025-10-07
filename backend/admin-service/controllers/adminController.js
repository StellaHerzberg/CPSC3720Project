
// NEED TO MODIFY, COPIED FROM PROVIDED CONTROLLER TEMPLATE
// ADMIN CLIENT CONTROLLER

const { getEvents } = require('../models/adminModel');
const listEvents = (req, res) => {
    const events = getEvents();
    res.json(events);
};

const postEvents = (req, res) => {

    // Need to fill this out, (req, res) part might be wrong too, just making it into
    // a function to hopefully fix a bug
}
module.exports = { listEvents, postEvents };