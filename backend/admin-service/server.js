
// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// ADMIN SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const { createDatabaseTable } = require('./models/adminModel');
const { queryFullDatabase } = require('./models/adminModel');
const routes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes under /api
app.use('/api', routes);

// Test route
app.get('/api/test', (req, res) => {
  console.log(" /api/test route reached");
  res.json({ message: "Test route working" });
});

// Ensure database table exists
createDatabaseTable();
queryFullDatabase();

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));