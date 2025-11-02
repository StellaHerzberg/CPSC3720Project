// React component provides simple frontend interface for testing LLM requests through
// callOllana() function. Allows users to send to Ollama API and displays generated responses.
// Used to verify integration and responses.

import React, { useState } from 'react';
import { callOllama } from './ollama.js';

// Testing interact for sending text prompts to Ollama API. User enters request and component calls 
// callOllama to get AI generated response. Result is displayed.
// Returns - React component with input, button, and display area.
export default function AITest() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

//   const handleOllama = async (req, res) => {
//     const rest = await callOllama(prompt);
//     setResponse(res.message?.content || JSON.stringify(res));
//   }

    const handleOllama = async () => {
        try {
            const res = await callOllama(prompt);
            // setResponse(res.message?.content || JSON.stringify(res));
            // const message = res.choices?.[0]?.message?.content || JSON.stringify(res);
            // setResponse(message);
            const message = res.choices?.[0]?.message?.content?.trim() || JSON.stringify(res);
            setResponse(message); //change this back if broken
        }
        catch (error) {
            console.error('Error calling Ollama', error);
            setResponse('Error: ' + error.message);
        }
    };


    return (
        <div className = "AI API Test" >
            <textarea 
                value = {prompt}
                onChange = {(e) => setPrompt(e.target.value)}
                placeholder = "Enter your desired event!"
                style={{
                    padding: "12px 24px",
                    fontSize: "20px",
                    borderRadius: "8px",
                    alignContent: "center"
        }}
            />
            <button onClick = {handleOllama}
                    style = {{alignContent: "center"}}
                    >Process Request</button>
            <div className = "response"
            style = {{fontSize: "30px"}}> 
                <strong
                    style = {{fontSize: "30px"}}
                    >Response:</strong> {response}
            </div>
            </div>
    )
}
