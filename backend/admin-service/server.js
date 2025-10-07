
// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// ADMIN SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const { createDatabaseTable } = require('./models/adminModel');
const routes = require('./routes/adminRoutes');
app.use(cors());
app.use(express.json());
app.use('/api', routes);


// ensure database table exists on startup
createDatabaseTable();

// Admin-service runs on port 5001
const PORT = 5001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));