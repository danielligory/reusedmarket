import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const response = await axios.post('http://localhost:3001/login', {
          email,
          password,
        });
        localStorage.setItem('token', response.data.token);
        setMessage('Logged in successfully!');
      } else {
        // Registration
        await axios.post('http://localhost:3001/register', {
          email,
          password,
        });
        setMessage('Registered successfully!');
      }
      // Reset placeholder
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
      </p>
    </div>
  );
};

export default App;
