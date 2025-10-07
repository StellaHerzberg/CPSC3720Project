
// WILL NEED TO CHANGE, COPIED BASIC SERVER FROM PROVIDED TEMPLATE
// ADMIN SERVER

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/adminRoutes');
app.use(cors());
app.use('/api', routes);

// New
const res = require("node_modules/express/lib/response")

app.post("/../shared-db/database.sqlite", (req, res) => {

    try {
        console.log(req.body.event);
        return res.json({
            status: 200, 
            success: true,
        });
    } catch (error) {
        return res.json ({
            status: 400,
            success: false,
        });
}});


// Admin-service runs on port 5001
const PORT = 5001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));