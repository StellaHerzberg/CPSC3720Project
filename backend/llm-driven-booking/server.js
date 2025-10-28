
// Actually not sure if we need this setup for the llm thing or not but I'm trying to replicate it just in case

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/llmRoutes');
app.use(cors());
app.use('/api', routes);

// It actually didn't say a port which makes me think that I'm setting this up wrong
const PORT = 7001;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
