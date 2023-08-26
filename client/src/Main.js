import React, { useEffect, useState, useContext } from "react";
import { fetchOpenAiApi, createAssistantPrompt } from "./utils/ai";
import Nav from "./components/Nav.js"
import Menu from "./components/Menu.js"
import Chat from "./components/Chat.js"
import View from "./components/View.js"
import styled from 'styled-components'
import { MasterContext } from "./App";

export default function Main() {
    const { currentPage, setCurrentPage } = useContext(MasterContext)

    return (
        <div style={{height:"100vh", margin:"0 5%", backgroundColor: "#071952"}}>
            <Nav/>
            <Menu/>
            {currentPage == "chat" &&
            <Chat/>
            }
            {currentPage == "view" &&
            <View/>
            }
        </div>
    )
}
