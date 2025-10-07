
// NEED TO MODIFY, BASIC MODELS STRUCTURE FROM PROVIDED TEMPLATE
// CLIENT MODEL


const getEvents = () => {
return [


    // hardcoded data in here orignally
    // need to get the data from sql database dynamically
    // for client side of things, we just want to fetch the events through a GET api call
    // also will need to decrement ticket count with a post api call
];
};
module.exports = { getEvents };

// Hardcoded data format example: 
// { id: 1, name: 'Clemson Football Game', date: '2025-09-01' }
// { id: 2, name: 'Campus Concert', date: '2025-09-10' }
// { id: 3, name: 'Career Fair', date: '2025-09-15' }