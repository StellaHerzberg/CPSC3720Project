// Server file initializes the Express application for the client-facing API. Handles incoming
// requests from frontend then handles it accordingly to mount all routes defined in clientRoutes.
// Client-service allows users to view events and purchase tickets.

// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// CLIENT SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/clientRoutes');
app.use(cors());
app.use('/api', routes);


module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = 6001;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}