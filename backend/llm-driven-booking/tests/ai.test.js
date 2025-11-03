
const request = require('supertest');
const app = require('../server');

describe('Testing the LLM Model', () => {
  it('should return a structured JSON object from Ollama', async () => {
    const userPrompt = 'I want two tickets for the spring concert.';

    const res = await request(app)
      .post('/api/llm/parse')
      .send({ prompt: userPrompt });

    console.log('LLM Response:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
  }, 200000); 
});