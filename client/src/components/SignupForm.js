import React, { useState, useContext } from 'react';
import { MasterContext } from '../App';

const SignupForm = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MasterContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupFormHandler = async (event) => {
    event.preventDefault();
    if (email && password) {
      const response = await fetch('/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // document.location.replace('/');
        setIsLoggedIn(true)
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <form onSubmit={signupFormHandler}>
      <div className="form-group">
        <label style={{color:"#ffffff"}} htmlFor="email-signup">Email:</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email-signup" />
      </div>
      <div className="form-group">
        <label style={{color:"#ffffff"}} htmlFor="password-signup">Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password-signup" />
      </div>
      <div className="form-group">
        <button type="submit">Signup</button>
      </div>
    </form>
  );
};

export default SignupForm;
