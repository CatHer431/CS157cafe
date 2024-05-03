import React, { useState } from "react";
import "./LoginPage.css"; // Import the CSS file
import axios from "axios";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [err, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Simulate checking credentials (replace with actual authentication logic)
    try {
      axios.post(
        "http://localhost:3001/login",
        {
          username,
          password,
        },
        {  withCredentials: true, },
      );
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.response.data);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {isLoggedIn && <p>Login successful!</p>}
    </div>
  );
}

export default LoginPage;
