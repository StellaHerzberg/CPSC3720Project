// Fuke defines express router responsible for handling routes related to LLM functionality in
// Tiger Tix. Connects incoming API requests to appropriate controller function that processes 
// user prompts using Ollama. Serves as link between backend server and LLM processing logic.

const express = require('express');
const ollama = require('ollama');
const router = express.Router();
const { handleOllama } = require('../controllers/llmController');
// router.get('/events', listEvents);
module.exports = router;
router.post('/llm/parse', handleOllama);

