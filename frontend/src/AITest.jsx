import React, { useState } from 'react';
import { callOllama } from './ollama.js';

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
            setResponse(message);
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
            />
            <button onClick = {handleOllama}>Process Request</button>
            <div className = "response"> 
                <strong>Response:</strong> {response}
            </div>
            </div>
    )
}