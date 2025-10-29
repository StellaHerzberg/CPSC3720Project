

const ollama = require('ollama')
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/llmRoutes');
app.use(cors());
app.use(express.json())
app.use('/api', routes);


// app.post()

// Client-service runs on port 6001
const PORT = 7001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
