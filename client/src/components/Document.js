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

export default function Document() {
    const { currentPrompt, setCurrentPrompt, dialogueList, setDialogueList, documentText, setDocumentText} = useContext(MasterContext)
    const [sendClicked, setSendClicked] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    

    useEffect(() => {
        if( documentText.length === 0) {
            setDocumentText(currentPrompt)
        }
    }, [documentText, currentPrompt]);


    const createFeedbackPrompt = () => {
        prompt = `
        Create a concise question to probe deeper into the user's journal entry. Aim to shed insight while instigating critical thinking.
        The following is the journal entry:
        ${documentText}
        `
        console.log("createFeedbackPrompt_______________", prompt)
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
        try {
            postEntry(documentText);
        } catch (error) {
            setErrorMessage("Error reaching database. Please try again in 30 seconds.")
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    // Inside your Document component
    const handleSubmit = async () => {
        setSendClicked(true);
        console.log("Document.js setsaveclicked true");

        setTimeout(() => {
            setSendClicked(false);
        }, 5000);

        if (documentText.trim() !== currentPrompt) {
            var prompt = createFeedbackPrompt();

            try {
                var promptResponse = await fetchOpenAiApi(prompt);
                setDocumentText(documentText + "\n\n" + "JournalGPT: " + promptResponse);
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
                    <textarea value={documentText} onChange={(e) => setDocumentText(e.target.value)} style={{ border: 'none', width: '100%', height: '100%', resize: "none", rows: "2", margin: "0px", boxSizing:"border-box", padding: "9px", fontSize: "15px", color: '#ffffff', backgroundColor:'#071952'}} />
                </div>
                {errorMessage && <div style={{ color: '#ffffff', fontSize: "15px"}}>{errorMessage}</div>}
                <button disabled={saveClicked} onClick={handleSave} style={{ width:"60px", alignSelf:"flex-end", backgroundColor: saveClicked ? "#0B666A" : "#ffffff", color: "#071952"}}>Save</button>
                <div style={{width: "100%"}}>
                    <div style={{ position: "static", bottom: "0px", width: "100%", borderTop: "1px solid #ffffff", background: '#071952', display: "flex", alignItems: "start", boxSizing:"border-box", padding: "2%" }}>
                        <button disabled={sendClicked} style={{padding: "0px", fontSize: "15px", width: "7%", height: "27px", borderRadius: "13px", border: {sendClicked} ? "1px solid #ffffff": "1px solid #071952", color: {sendClicked} ? "#071952": "#ffffff", backgroundColor: {sendClicked} ? "#DEEAF3": "#071952" }} onClick={handleSubmit}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                
            </div>
    )
}
