import React, { useEffect, useState, useContext } from "react";
import { fetchOpenAiApi, createAssistantPrompt } from "../utils/ai";
import Nav from "./Nav"
import styled from 'styled-components'
import { MasterContext } from "../App";

const TextArea = styled.textarea`
  ::placeholder {
    color: red;
  }
`;

export default function Chat() {
    const { currentPrompt, setCurrentPrompt} = useContext(MasterContext);

    // added variables for summaries + tagging
    const [previousSummary, setPreviousSummary] = useState("");
    const [previousTags, setPreviousTags] = useState("");
    const [currentDialogueList, setCurrentDialogueList] = useState([]);

    const {dialogueList, setDialogueList} = useContext(MasterContext);
    const [sendClicked, setSendClicked] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        if( dialogueList.length === 0) {
            setDialogueList(prevDialogues => [{'speaker': "Bot", "text": currentPrompt}]);
        }
    }, [dialogueList, currentPrompt]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit();
        }
    }

    const createSummaryAndTagsPrompt = () => {
        const aggregatedDialogueList = currentDialogueList.map(obj => `${obj.speaker}: ${obj.text}`).join(' ||| ');

        prompt = `REQUIRED: ONLY RETURN JSON. Summarize the conversation, and focus more on USER instead of bot dialogue. Don't set the context of this being in an intelligent diary. Just write a briefer version of the user's thoughts. The summary should be about 25% as long as the conversation itself.\
        IMPORTANT: MUST return result as json with the format {summary: String, tags: [String]}, where tags are descriptors / tags for the journal, each one word. Maximum number of tags MUST be 15. CRITICAL: DO NOT include anything else besides JSON result.\
        Conversation: ${aggregatedDialogueList},\
        `
        setCurrentDialogueList([]);
        console.log("createSummaryAndTagsPrompt_______________", prompt)
        return prompt
    }

    const createSummaryPrompt = () => {
        const aggregatedDialogueList = dialogueList.map(obj => `${obj.speaker}: ${obj.text}`).join('|||');
        
        prompt = `
        Compassionately summarize the following journal entry. Focus much more on what the user was thinking/writing about. It doesn't matter much what the bot says (it's merely there to stimulate the user's growth and reflection). Don't set the context of this being in an intelligent diary. Just write a briefer version of the user's thoughts. The summary should be about 25% as long as the conversation itself.
        Conversation: 
        ${aggregatedDialogueList}
        `
        console.log("createSummaryPrompt_______________", prompt)
        return prompt
    }

    // posts entry to db
    const postEntry = async (content) => {
        try {
          const response = await fetch('/entry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({content: content}),
            body: JSON.stringify({content: content}),
          });
      
          if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);       
          }

          const json = await response.json();
          console.log('Success:', json);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      const handleSave = async () => {
        setSaveClicked(true)
        setTimeout(() => {
            setSaveClicked(false)
            console.log("chat.js setsaveclicked true")
        }, 5000); 
        var json;
        try {
            //var prompt = createSummaryPrompt();
            var prompt = createSummaryAndTagsPrompt();
            var content = await fetchOpenAiApi(prompt);
            console.log("Chat.js handleSave() content_______", content);
        } catch (error) {
            setErrorMessage("Error reaching OpenAI. Please try again in 30 seconds.")
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return
        }
        try {
            json = JSON.parse(content)
            setPreviousSummary(json['summary'])
            setPreviousTags(json['tags'])
        } catch (error) {
            setErrorMessage("Error parsing OpenAI response into json. Please try again.")
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }

        json['content'] = prompt;
        try {
            postEntry(json);
        } catch (error) {
            setErrorMessage("Error reaching database. Please try again in 30 seconds.")
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    // Inside your Chat component
    const handleSubmit = async () => {
        setSendClicked(true)
        setTimeout(() => {
            setSendClicked(false)
            console.log("chat.js setsendclicked true")
        }, 5000);
        if (userInput.trim() !== '') {
            // updating complete and current dialogue lists for user
            setCurrentDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'User', 'text': userInput}]);
            setDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'User', 'text': userInput}]);
            setUserInput('');
            var prompt = createAssistantPrompt([...dialogueList, {'speaker': 'User', 'text': userInput}]);
            
            try {
                var promptResponse = await fetchOpenAiApi(prompt);
                // updating complete and current dialogue lists for bot
                setCurrentDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'Bot', 'text': promptResponse}]);
                setDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'Bot', 'text': promptResponse}]);
            } catch (error) {
                setErrorMessage("An error occurred with OpenAI. Please try again in 30 seconds.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            }
        }
    };


    return (
            <div style={{ display: 'flex', flexDirection: 'column', height: "95%" }}>
                <div style={{ flex: '1 0', overflowY: 'scroll'}}>
                    <style>
                        {`
                            *::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {dialogueList.map((dialogue, index) => (<p style={{ margin: "0px", boxSizing:"border-box", padding: "9px", fontSize: "15px", color: '#ffffff', backgroundColor: dialogue.speaker === "Bot" ? '#0B666A' : '#071952'}} key={index}>{dialogue.speaker === "Bot" ? `${dialogue.speaker}: ${dialogue.text}`: dialogue.text}</p>))}
                </div>
                {errorMessage && <div style={{ color: '#ffffff', fontSize: "15px"}}>{errorMessage}</div>}
                <button disabled={saveClicked} onClick={handleSave} style={{ width:"60px", alignSelf:"flex-end", backgroundColor: saveClicked ? "#0B666A" : "#ffffff", color: "#071952"}}>Save</button>
                <div style={{width: "100%"}}>
                    <div style={{ position: "static", bottom: "0px", width: "100%", borderTop: "1px solid #ffffff", background: '#071952', display: "flex", alignItems: "start", boxSizing:"border-box", padding: "2%" }}>
                        <TextArea
                            style={{border:"none", resize: "none", outline: "none", backgroundColor: '#071952', color: "#ffffff", flex: "1 0 90%", rows: "2", position: "relative", bottom: "0px" }}
                            value={userInput}
                            placeholder="Send a message"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button disabled={sendClicked} style={{padding: "0px", fontSize: "15px", width: "7%", height: "27px", borderRadius: "13px", border: userInput.length > 0 ? "1px solid #ffffff": "1px solid #071952", color: userInput.length > 0 ? "#071952": "#ffffff", backgroundColor: userInput.length > 0 ? "#DEEAF3": "#071952" }} onClick={handleSubmit}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                
            </div>
    )
}
