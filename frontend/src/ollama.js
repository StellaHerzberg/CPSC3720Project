
export const callOllama = async (prompt) => {
    try {
        const response = await fetch('http://localhost:7001/api/llm/parse', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return data;

    }

    catch (error) {
        console.error("Error fetching from ollama: ", error)
        throw error
    }
    
  }