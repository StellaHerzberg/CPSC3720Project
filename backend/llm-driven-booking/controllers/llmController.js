
import { ollamaInteraction } from '../models/llmModel.js';
import { listEvents, handleTicketPurchase } from '../../client-service/controllers/clientController.js';

// Just trying to mimic the client service rn, not actually sure what we need in here
function extractJsonBlock(text) {
    if (!text || typeof text !== 'string') return null;
    const obj = text.match(/\{[\s\S]*\}/);
    const arr = text.match(/\[[\s\S]*\]/);
    return obj?.[0] ?? arr?.[0] ?? null;
}

function getAssistantText(resp) {
    if (!resp) return '';
    if (typeof resp === 'string') return resp;
    if (resp?.choices?.[0]?.message?.content) return resp.choices[0].message.content;
    if (resp?.choices?.[0]?.content) return resp.choices[0].content;
    if (resp?.output) {
        try {
            return resp.output.map(o => {
                if (typeof o === 'string') return o;
                if (o?.content && typeof o.content === 'string') return o.content;
                if (o?.content && Array.isArray(o.content)) return o.content.map(c => c?.text || '').join('');
                return JSON.stringify(o);
            }).join(' ');
        } catch {
            return JSON.stringify(resp.output);
        }
    }
    if (resp?.message?.content) return resp.message.content;
    return JSON.stringify(resp);
}

function normalizeAssistantText(text) {
    if (!text) return '';
    text = String(text).trim();
    // If the model returned a quoted JSON string or escaped JSON, try JSON.parse to unescape
    if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
        try {
            const unquoted = JSON.parse(text); // handles escaped sequences
            return String(unquoted).trim();
        } catch {
            text = text.slice(1, -1).trim();
        }
    }
    return text;
}

export const handleOllama = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await ollamaInteraction(prompt);

        console.log('ollama.rawResponse', JSON.stringify(response));

        if (!response) {
            const help = { 
                intent: null,
                event: null, 
                tickets: null,
                instruction: "Please provide a short request that includes the desired action, event, and number of tickets!",
                example: "I want to book 2 tickets for the jazz concert."
            };
            // const instruction = "Please provide a short request that includes the desired action, event, and number of tickets!";
            // return res.status(200).type('text/plain').send(instruction);
            return res.status(200).json(help);
        }

        const rawText = normalizeAssistantText(getAssistantText(response) || JSON.stringify(response));

        console.log('assistant.rawText', rawText);

        if (!rawText) {
            const help = { 
                intent: null,
                event: null, 
                tickets: null,
                instruction: "Please provide a short request that includes the desired action, event, and number of tickets!",
                example: "I want to book 2 tickets for the jazz concert."
            };
            return res.status(200).json(help);
            // const instruction = "Please provide a short request that includes the desired action, event, and number of tickets!";
            // return res.status(200).type('text/plain').send(instruction);
        }
        // let rawText = '';
        // if (typeof response === 'string') rawText = response;
        // else if (response?.choices?.[0]?.message?.content) rawText = response.choices[0].message.content;
        // else if (response?.output) rawText = JSON.stringify(response.output);
        // else rawText = JSON.stringify(response);

        // Try to parse directly, else extract JSON block
        let parsed = null;
        try {
            parsed = JSON.parse(rawText);
        } catch (e) {
            const block = extractJsonBlock(rawText);
            if (block) {
                try { parsed = JSON.parse(block); rawText = block; } catch (e2) { /* fallthrough */ }
            }
        }

        console.log('assistant.parsed=', parsed);

        if (!parsed) {
            const help = { 
                intent: null,
                event: null, 
                tickets: null,
                instruction: "Please provide a short request that includes the desired action, event, and number of tickets!",
                example: "I want to book 2 tickets for the jazz concert."
            };
            return res.status(200).json(help);
            // const instruction = "Please provide a short request that includes the desired action, event, and number of tickets!";
            // return res.status(200).type('text/plain').send(instruction);
        }

        // const allEvents = Array.isArray( await listEvents()) ? await listEvents() : await listEvents(req,res) || [];
        let allEvents = [];
        try {
            const potentialEvents = await listEvents();
            console.log("Potential events: ", potentialEvents);
            // res.json(potentialEvents); 
            if (Array.isArray(potentialEvents)) {
                allEvents = potentialEvents;
                // return res.json(allEvents);
            }
            // else {
            //     console.warn('List events did not return an array; value: ', potentialEvents);

            //     const clientModel = await import('../../client-service/models/clientModel.js');
            //     const getEvents = clientModel.getEvents || clientModel.listEvents || clientModel.getAllEvents;
            //     if (typeof getEvents === 'function') {
            //         const tryingEvents = await getEvents();
            //         if (Array.isArray(tryingEvents)) allEvents = tryingEvents;
            //     }
            // }
        } catch (listErr) {
            console.error('listEvents threw: ', listErr);
        }

        console.log('allEvents.length=', Array.isArray(allEvents) ? allEvents.length : 0);

        const normalize = s => String(s || '').toLowerCase().replace(/[^\w\s]/g, '').trim();

        const queryName = parsed.event ? normalize(parsed.event) : null;

        let matched = [];
        try {
            if (queryName) {
                matched = allEvents.filter(ev => {
                    // const n = normalize(ev.name ?? ev.event ?? '');
                    const n = normalize(ev.eventName ?? ev.eventDate ?? '');
                    return n.includes(queryName) || queryName.split(' ').every(tok => tok && n.includes(tok));
                });
            }
            else if (parsed.intent === 'view') {
                matched = allEvents;
            }
        } catch (filterErr) {
            console.error("error filtering events: ", filterErr);
        }

        if (!matched || matched.length === 0) {
            const instruction = "No matching events found for your request. Please make another one.";
            return res.status(200).type('text/plain').send(instruction);
        }

        return res.status(200).json({events: matched});

        // if (parsed.intent === 'view') {
        //     const events = await listEvents(req, res);
        //     return res.status(200).json(events);
        // }

        // return res.status(200).json(parsed);

        // res.json(response);

    } catch (err) {
        // console.error(err);
        res.status(500).json({error: "Failed to correctly chat with the AI model."})
    }

}





