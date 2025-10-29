
import { ollamaInteraction } from '../models/llmModel.js';

// Just trying to mimic the client service rn, not actually sure what we need in here

export const callOllama = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await ollamaInteraction(prompt);
        res.json(response);

    } catch (err) {
        // console.error(err);
        res.status(500).json({error: "Failed to correctly chat with the AI model."})
    }

}





