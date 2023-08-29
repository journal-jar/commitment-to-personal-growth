import React, { useState, useContext, useEffect } from 'react';
import { MasterContext } from '../App';

const SignupForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MasterContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const signupFormHandler = async (event) => {
    event.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setErrorMessage("Password is required to be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const response = await fetch('/user', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setIsLoggedIn(true);
    } else if (response.status === 409) {
      setErrorMessage("There is already an account registered with that email.");
    } else {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={signupFormHandler}>
      <div className="form-group">
        <label style={{ color: "#ffffff" }} htmlFor="email-signup">Email:</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email-signup" />
      </div>
      <div className="form-group">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ color: "#ffffff" }} htmlFor="password-signup">Password:</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} id="password-signup" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="form-group">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ color: "#ffffff" }} htmlFor="confirm-password-signup">Confirm Password:</label>
          <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id="confirm-password-signup" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div style={{ height: "37px"}}>
        {errorMessage && <div style={{ fontSize:"15px", color: "#ffffff" }}>{errorMessage}</div>}
      </div>
      <div className="form-group">
        <button type="submit">Signup</button>
      </div>
    </form>
  );
};

export default SignupForm;
