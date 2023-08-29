import React, { useState, useContext, useEffect } from 'react';
import { MasterContext } from '../App';

const LoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MasterContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

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
        <label style={{ color: "#ffffff" }} htmlFor="email-login">Email:</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email-login" />
      </div>
      <div className="form-group">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ color: "#ffffff" }} htmlFor="password-login">Password:</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} id="password-login" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div style={{ height: "37px" }}>
        {/* {errorMessage && <div style={{ fontSize:"15px", color: "#ffffff" }}>{errorMessage}</div>} */}
      </div>
      <div className="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
