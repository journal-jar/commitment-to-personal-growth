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
    const { currentPrompt, setCurrentPrompt} = useContext(MasterContext)
    const {dialogueList, setDialogueList} = useContext(MasterContext);
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

    const postEntry = async (content) => {
        try {
          const response = await fetch('/entry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({content: content}),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const json = await response.json();
          console.log('Success:', json);
        } catch (error) {
          console.error('Error:', error);
        }
      }

    const handleSave = async () => {
        var prompt = createSummaryPrompt() 
        var content = await fetchOpenAiApi(prompt)
        console.log("Chat.js handleSave() content_______", content)
        postEntry(content)
    }

    const handleSubmit = async () => {
        if(userInput.trim() !== '') {
            setDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'User', 'text': userInput}]);
            setUserInput('');
            var prompt = createAssistantPrompt([...dialogueList, {'speaker': 'User', 'text': userInput}])
            var promptResponse = await fetchOpenAiApi(prompt)
            setDialogueList(prevDialogues => [...prevDialogues, {'speaker': 'Bot', 'text': promptResponse}]);
        }
    };

    return (
            <div className="chat-box-body" style={{ display: 'flex', flexDirection: 'column', height: "95%" }}>
                <div className="chat-box-text" style={{ flex: '1 0', overflowY: 'scroll'}}>
                    <style>
                        {`
                            *::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {dialogueList.map((dialogue, index) => (<p style={{ margin: "0px", boxSizing:"border-box", padding: "9px", fontSize: "15px", color: '#ffffff', backgroundColor: dialogue.speaker === "Bot" ? '#0B666A' : '#071952'}} key={index}>{dialogue.speaker === "Bot" ? `${dialogue.speaker}: ${dialogue.text}`: dialogue.text}</p>))}
                </div>
                <button onClick={handleSave} style={{ width:"60px", alignSelf:"flex-end", backgroundColor:"#ffffff", color: "#071952"}}>Save</button>
                <div style={{width: "100%"}}>
                    <div style={{ position: "static", bottom: "0px", width: "100%", borderTop: "1px solid #ffffff", background: '#071952', display: "flex", alignItems: "start", boxSizing:"border-box", padding: "2%" }}>
                        <TextArea
                            style={{border:"none", resize: "none", outline: "none", backgroundColor: '#071952', color: "#ffffff", flex: "1 0 90%", rows: "2", position: "relative", bottom: "0px" }}
                            value={userInput}
                            placeholder="Send a message"
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button style={{padding: "0px", fontSize: "15px", width: "7%", height: "27px", borderRadius: "13px", border: userInput.length > 0 ? "1px solid #ffffff": "1px solid #071952", color: userInput.length > 0 ? "#071952": "#ffffff", backgroundColor: userInput.length > 0 ? "#DEEAF3": "#071952" }} onClick={handleSubmit}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
    )
}
