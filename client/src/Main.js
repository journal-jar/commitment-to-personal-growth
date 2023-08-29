import React, { useEffect, useState, useContext } from "react";
import { fetchOpenAiApi, createAssistantPrompt } from "./utils/ai";
import Nav from "./components/Nav.js"
import Menu from "./components/Menu.js"
import Home from "./components/Home.js"
import Chat from "./components/Chat.js"
import View from "./components/View.js"
import styled from 'styled-components'
import { MasterContext } from "./App";

export default function Main() {
    const { isLoggedIn, setIsLoggedIn, currentPage, setCurrentPage } = useContext(MasterContext)

    useEffect(() => {
        fetch('/session')
          .then(async response => {
            const data = await response.json();
            console.log("Main.js get session_______", data)
            if (data.loggedIn) {
                setIsLoggedIn(true)
            }
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);
    

    return (
        <div style={{height:"100vh", margin:"0 5%", backgroundColor: "#071952"}}>
            <Nav/>
            <Menu/>
            {currentPage == "home" &&
            <Home/>
            }
            {currentPage == "chat" &&
            <Chat/>
            }
            {currentPage == "view" &&
            <View/>
            }
        </div>
    )
}
