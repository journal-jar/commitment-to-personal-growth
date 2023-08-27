import React, { useEffect, useState, useContext } from "react";
import { MasterContext } from "../App";

export default function Nav() {
    const { blurDivIsVisible, setBlurDivIsVisible, promptOptionsIsVisible, setPromptOptionsIsVisible, mainOptionsIsVisible, setMainOptionsIsVisible } = useContext(MasterContext)

    return (
        <nav className="chat-box-nav" style={{backgroundColor: "#0B666A", display: "flex", justifyContent: "space-between", height: "5%", borderBottom: "1px solid #ffffff"}}>
            <i onClick={() => {setMainOptionsIsVisible(!mainOptionsIsVisible); setBlurDivIsVisible(!blurDivIsVisible)}} className="fa-solid fa-bars" style={{fontSize: "30px", color: "#ffffff", boxSizing:"border-box", padding: "10px"}}></i>
            <i onClick={() => {setPromptOptionsIsVisible(!promptOptionsIsVisible); setBlurDivIsVisible(!blurDivIsVisible)}} className="fa-solid fa-sliders" style={{fontSize: "30px", color: "#ffffff", boxSizing:"border-box", padding: "10px"}}></i>
        </nav>
    )
}
