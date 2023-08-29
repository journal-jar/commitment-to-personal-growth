import React, { useState, useContext } from 'react';
import { MasterContext } from '../App';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const App = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MasterContext)
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      {!isLoggedIn ? (
        <div className="row">
          <div className="col-md-6">
            <h2 style={{color:"#ffffff"}}>Login</h2>
            <LoginForm />
          </div>
          <div className="col-md-6">
            <h2 style={{color:"#ffffff"}}>Signup</h2>
            <SignupForm />
          </div>
        </div>
      ) : (
        <div>
          <p style={{color:"#ffffff"}}>You are logged in.</p>
        </div>
      )}
    </>
  );
};

export default App;