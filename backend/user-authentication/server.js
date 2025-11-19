// Server file initializes the Express application for the user-authentication API. Handles incoming
// requests from frontend then handles it accordingly to mount all routes defined in uaRouters.
// User-authentication allows users to have login, logout, and registration functionalities.


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