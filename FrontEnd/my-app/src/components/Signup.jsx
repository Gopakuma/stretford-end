import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style/Signup.css'
import { useAuth } from "./AuthProvider";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_SIGNUP = import.meta.env.VITE_API_SIGNUP;
  const signUpEndpoint = `${API_BASE}${API_SIGNUP}`;


  const [formdata, setFormdata] = useState({
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/dashboard')
    }
  },[navigate, isAuthenticated])

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value});
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);    
    callSignupAPI();
}

  const callSignupAPI = async () => {
    try {
        const res = await axios.post(signUpEndpoint, formdata);
        console.log(res.status, "res.status");
        if (res.status === 200) {
          console.log(res, "res.data");
            if(res.data.success == true) {
              login(res.data.token);
              navigate('/dashboard');
              setIsLoading(false);
            } else {
              console.log(res.data.message, "res.data.message,");
              setError(res.data.message ? `${res.data.message}` : "User Already exist. Please login");
              setIsLoading(false);
            }
        }
    } catch (error) {
        
        console.log(error);
        setError(error.response?.data?.message || "Signup failed. Please try again.");
        setIsLoading(false);
    }
}
  
  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Your Account</h1>
          <p>Join our community today</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
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
            <label htmlFor="username">Username</label>
            <input
              id="username"
              onChange={handleChange}
              name="username"
              type="text"
              required
              placeholder="Choose a username"
              value={formdata.username}
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
              minLength={6}
              placeholder="At least 6 characters"
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
                "Sign Up"
              )}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setError(false)
                setIsLoading(false)
                setFormdata({...formdata, username : '', password: '', email: ''})
              }}
            >
              RESET
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Already have an account? Login
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </form>
        
        <div className="form-footer">
          <p>GLORY GLORY MAN UNITED</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;