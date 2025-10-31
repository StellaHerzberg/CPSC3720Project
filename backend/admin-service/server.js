// Basic template for an admin-server entry point file. 
// It sets up an Express server, enables CORS, configures middleware, mounts
// the admin routes, ensures the database table exists, and starts listening on a port.
// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// ADMIN SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const { createDatabaseTable } = require('./models/adminModel');
const routes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());

// Mount routes under /api
app.use('/api/admin', routes);


// Ensure database table exists (only run if not testing)
if (process.env.NODE_ENV !== 'test') {
  createDatabaseTable();
  const PORT = 5001;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

//Export app for Jest
module.exports = app;
