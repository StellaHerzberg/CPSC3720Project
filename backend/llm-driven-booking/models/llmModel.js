// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");
import ollama from 'ollama'


export const ollamaInteraction = async (prompt) =>  {
    // const db = connectToDatabase(); 

    const response = await ollama.chat({
        model: 'llama3:latest',
        messages: [{role: 'user', content: prompt }], 
    })
    return response;
};




