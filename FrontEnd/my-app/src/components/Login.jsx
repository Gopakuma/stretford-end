import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import './style/Login.css';

function Login() {
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_LOGIN = import.meta.env.VITE_API_LOGIN;
  const loginEndpoint = `${API_BASE}${API_LOGIN}`;

  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate, isAuthenticated]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    callLoginAPI();
  }

  const callLoginAPI = async () => {
    try {
      const res = await axios.post(loginEndpoint, formdata);
      
      if (res.status === 200) {
        login(res.data.data.token);
        navigate('/dashboard');
      } 
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              onChange={handleChange}
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formdata.email}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={handleChange}
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formdata.password}
            />
          </div>
          
          <div className="button-group">
            <button
              type="submit"
              className="btn primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner">LOADING...</span>
              ) : (
                "Login"
              )}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setFormdata({
                  email: '',
                  password: ''
                });
                setError(null);              
              }}
            >
              RESET
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Don't have an account? Sign Up
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;