export async function fetchOpenAiApi(prompt, temperature=0.4) {
    const response = await fetch('/api/openai/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: temperature
        }),
    });

    // Check if the response is OK before trying to parse it
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const promptResponse = await response.json();
    console.log("fetchOpenAiApi() promptResponse___________", promptResponse);
    return promptResponse;
}



export function createAssistantPrompt(chatHistory) {
    let chatHistoryString = '';
    for (let item of chatHistory) {
        chatHistoryString += `${item.speaker}: ${item.text}\n`;
    }

var prompt = 
`
You are an interactive diary/journal bot. You should give feedback or encouragment to the user based on their entries. Maybe ask them some concise follow up questions that help them grow. Your perspective should be grounded in the first principles thinking of Elon Musk and the wit and pragmatism Benjamin Franklin was known for (But don't explicitly say you are modeling after the minds of these two or make it cheesy).
Here is the diary entry so far.
${chatHistoryString}

Put your response dialogue in quotes with nothing else around it or it will mess up the program. Keep your responses very short-- less than a paragraph.
`
console.log("createAssistantPrompt_______________", prompt)
    return prompt
}
