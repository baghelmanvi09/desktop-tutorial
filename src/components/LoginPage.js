import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS for the LoginPage

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }
    
    
    onLogin(username);
    setError(''); 
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {/* Error handling is not needed anymore */}
    </div>
  );
};

export default LoginPage;
