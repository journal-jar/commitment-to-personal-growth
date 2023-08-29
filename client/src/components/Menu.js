import React, { useEffect, useState, useContext } from "react";
import { MasterContext } from "../App";
import { fetchOpenAiApi } from "../utils/ai"; 

export default function Menu() {
    const { isLoggedIn, setIsLoggedIn, blurDivIsVisible, setBlurDivIsVisible, promptOptionsIsVisible, setPromptOptionsIsVisible, mainOptionsIsVisible, setMainOptionsIsVisible,
        currentPrompt, setCurrentPrompt, currentPage, setCurrentPage, dialogueList, setDialogueList } = useContext(MasterContext)

    const logoutFetch = async () => {
        await fetch('/user/logout', {
            method: 'POST'
          })
          .then(response => {
            if (response.status === 204) {
              console.log('Successfully logged out.');
            } else if (response.status === 404) {
              console.log('Not logged in.');
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
    }

    const handleLogout = async () => {
        logoutFetch()
        setIsLoggedIn(false)
    }
    
    return (
        <div >
            {mainOptionsIsVisible &&
            <div style={{boxSizing: "border-box", padding: "30px", display: "flex", flexDirection: "column", zIndex:"2", position:"absolute", top: "0px", left:"0px", backgroundColor: "#0B666A", marginLeft: "5%", height: "100%", width: "300px", borderRight: "1px solid #ffffff"}}>
                    <i class="fa-solid fa-xmark" onClick={() => {setMainOptionsIsVisible(!mainOptionsIsVisible); setBlurDivIsVisible(!blurDivIsVisible)}}
                        style={{fontSize: "30px", color: "#ffffff", boxSizing:"border-box"}}></i>
                <ul style={{flexGrow: "1", color: "#ffffff", listStyleType: "none", padding: "0px"}}>
                    <li onClick={() => setCurrentPage("chat")} style={{color: currentPage === "chat" ? "#071952" : "#ffffff"}}>Chat</li>
                    <li>Journal</li>
                    <li onClick={() => setCurrentPage("view")} style={{color: currentPage === "view" ? "#071952" : "#ffffff"}}>View</li>
                    <li>Incentives</li>
                    <li>SMS Interface</li>
                    <li>Account</li>
                </ul>
                {isLoggedIn &&
                    <p onClick={handleLogout} style={{color: "#ffffff"}}>Logout</p>
                }
            </div>}

            {promptOptionsIsVisible && currentPage=="chat" &&
            <div style={{boxSizing: "border-box", padding: "30px", display: "flex", flexDirection: "column", zIndex:"2", position:"absolute", top:"0px", right:"0px", backgroundColor: "#0B666A", marginRight: "5%", height: "100%", width: "300px", borderLeft: "1px solid #ffffff"}}>
                    <i class="fa-solid fa-xmark" onClick={() => {setPromptOptionsIsVisible(!promptOptionsIsVisible); setBlurDivIsVisible(!blurDivIsVisible)}}
                        style={{alignSelf: "flex-end", fontSize: "30px", color: "#ffffff", boxSizing:"border-box"}}></i>
                <ul style={{color: "#ffffff", listStyleType: "none", padding: "0px"}}>
                    <li style={{padding: "5px"}} onClick={() => {console.log("Nav.js onclick"); setCurrentPrompt("What are you grateful for today?"); setDialogueList([]) }}>Gratitude</li>
                    <li style={{padding: "5px"}} onClick={async () => { var promptResponse = await fetchOpenAiApi("Return an unusual journaling prompt in quotes. Don't say anything besides the journaling prompt."); setCurrentPrompt(promptResponse); setDialogueList([]); }}>Curated</li>
                </ul>
            </div>}

            {blurDivIsVisible &&
            <div style={{boxSizing: "border-box", margin: "0 5%", zIndex: "1", position:"absolute", left: "0px", top: "0px", backgroundColor:"#ffffff", opacity: ".8", width: "100%", height: "100vh"}}></div>
            }
        </div>
    )
}
