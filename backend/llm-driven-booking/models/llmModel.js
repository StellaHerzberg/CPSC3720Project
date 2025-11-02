// Defines backend interaction with LLM for Tiger Tix. Provides functionality to send structured
// prompts to model and receive AI generated responses. File serves as the communication layer between 
// backend logic and AI model to ensure consistent, machine readable responses that can be processed 
// by other parts of application.


// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
import ollama from 'ollama'

// Sends a structured chat prompt to the Ollama LLM and retrieves parsed response. Interacts with
// Ollama API using a system prompt that defines the model's behavior. 
// Param - prompt - user's natural language input
// Param - optional object that can include a custom Ollama option
// Return - Response object returned from Ollama API or error otherwise
export const ollamaInteraction = async (prompt, opts = {}) =>  {

    const systemInstruction = `You are an expert even planning assistant for our event booking platform, Tiger Tix. Your task is to PARSE
    user input to extract structured information such as the specific event and the number of desired tickets.
    The user will give input such as "I want to book 2 tickets for the upcoming Jazz concert." or "I want 3 things for the football game this weekend."
    Return ONLY A STRUCTURED JSON object structured in the following format: 
    {
        "intent": "book" | "cancel" | "view",
        "event": "<event name>",
        "tickets": <number of tickets>
    }
        
    If any information is missing, respond with "null" for that field. 
    However, keep in mind that if the user simply types "ticket" with no number, it implies that the number is 1.
    Do not include any additional text or explanation, only return the JSON object.

    If the user's request is unclear or cannot be parsed, respond with: 
    "I'm sorry, your request is unclear. Please input a statement with your desired action, as well as the event that interests you and your desired number of tickets."`
    // const db = connectToDatabase(); 
    const exampleUser = "I want two tickets to the jazz concert."
    const exampleAssistant = '{"intent": "book", "event": "jazz concert", "tickets": 2}'

    try {
        const response = await ollama.chat({
            model: 'llama3:latest',
            messages: [ {role: 'system', content: systemInstruction},
                        {role: 'user', content: exampleUser},
                        {role: 'assistant', content: exampleAssistant},
                        {role: 'user', content: prompt}],
            temprature: 0,
            max_tokens: 512,
            ...(opts.ollamaOptions || {}) 
        });

        console.log('ollama.response', JSON.stringify(response, null, 2));

        return response;
    } catch (err) {
        throw err;
    }
};




