// Server file initializes the Express application for the client-facing API. Handles incoming
// requests from frontend then handles it accordingly to mount all routes defined in clientRoutes.
// Client-service allows users to view events and purchase tickets.


const express = require('express');
const cors = require('cors');
const cookierParser = require('cookie-parser');

const app = express();
const routes = require('./routes/uaRoutes');
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookierParser());

app.use('/api/authentication', routes);


module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = 8001;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}