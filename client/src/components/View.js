import React, { useEffect, useState, useContext } from "react";
import { fetchOpenAiApi, createAssistantPrompt } from "../utils/ai";
import { MasterContext } from "../App";


export default function View() {
    const {currentPage} = useContext(MasterContext)

    const fetchEntries = async () => {
        try {
          const response = await fetch("/entry");
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("View.js fetchEntries data________", data)
          return data;
        } catch (error) {
          console.error("There was a problem with the fetch:", error);
        }
    }

    const [entries, setEntries] = useState([])

    useEffect(() => {
        if (currentPage === "view") {
            fetchEntries().then(data => {
                setEntries(data);
            });
        }
    }, [currentPage]);

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
                    {Array.isArray(entries) && entries.map((entry) => (
                        <p style={{ margin: "0px", boxSizing:"border-box", padding: "9px", fontSize: "15px", color: '#ffffff'}}>
                            {entry.content}
                        </p>
                    ))}
                </div>
            </div>
    )
}
