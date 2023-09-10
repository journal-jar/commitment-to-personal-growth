import React, { useState, useContext, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./Main.js"

export const MasterContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mainOptionsIsVisible, setMainOptionsIsVisible] = useState(false);
  const [promptOptionsIsVisible, setPromptOptionsIsVisible] = useState(false)
  const [blurDivIsVisible, setBlurDivIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState("document")
  const [currentPrompt, setCurrentPrompt] = useState("What are you grateful for today?")
  const [dialogueList, setDialogueList] = useState([]);
  const [documentText, setDocumentText] = useState('');

  return (
    <MasterContext.Provider value={{
      isLoggedIn, setIsLoggedIn, 
      currentPrompt, setCurrentPrompt,
      dialogueList, setDialogueList,
      currentPage, setCurrentPage,
      blurDivIsVisible, setBlurDivIsVisible,
      promptOptionsIsVisible, setPromptOptionsIsVisible,
      mainOptionsIsVisible, setMainOptionsIsVisible,
      documentText, setDocumentText}}>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
    </MasterContext.Provider>
  );
}

export default App;




