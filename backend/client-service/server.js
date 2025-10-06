
// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// CLIENT SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/clientRoutes');
app.use(cors());
app.use('/api', routes);

// Client-service runs on port 6001
const PORT = 6001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));