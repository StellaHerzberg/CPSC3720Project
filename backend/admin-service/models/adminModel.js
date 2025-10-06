
// NEED TO MODIFY, BASIC MODELS STRUCTURE FROM PROVIDED TEMPLATE
// ADMIN MODEL


const getEvents = () => {
return [

    // hardcoded data in here orignally
    // need to get the data from sql database dynamically
    // not sure precisely what we're doing here on the admin side of things
    // might be updating events in here through a postAPI, but then it would not be called get Events
];
};
module.exports = { getEvents };

// Hardcoded data format example: 
// { id: 1, name: 'Clemson Football Game', date: '2025-09-01' }
// { id: 2, name: 'Campus Concert', date: '2025-09-10' }
// { id: 3, name: 'Career Fair', date: '2025-09-15' }