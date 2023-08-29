import React, { useState, useContext } from 'react';
import { MasterContext } from '../App';

const LoginForm = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MasterContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFormHandler = async (event) => {
    event.preventDefault();
    if (email && password) {
      const response = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <form onSubmit={loginFormHandler}>
      <div className="form-group">
        <label style={{color:"#ffffff"}} htmlFor="email-login">Email:</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email-login" />
      </div>
      <div className="form-group">
        <label style={{color:"#ffffff"}} htmlFor="password-login">Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password-login" />
      </div>
      <div className="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
