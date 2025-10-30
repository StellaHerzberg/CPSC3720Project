
// Guys I'm confused I don't really know what we're supposed to be doing here

const express = require('express');
const ollama = require('ollama');
const router = express.Router();
const { handleOllama } = require('../controllers/llmController');
// router.get('/events', listEvents);
module.exports = router;
router.post('/llm/parse', handleOllama);

