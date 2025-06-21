import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Use environment variables
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_SIGNUP = import.meta.env.VITE_API_SIGNUP;

function Signup() {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();
    const [error, setError] = useState(null);

    const [formdata, setFormdata] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        callSignupAPI();
    }
    
    useEffect(() => {
      if(isAuthenticated){
        navigate('/dashboard')
      }
    },[isAuthenticated])

    const callSignupAPI = async () => {
        try {
            const res = await axios.post(`${API_BASE}${API_SIGNUP}`, formdata);
            
            if (res.status === 200) {
                login(res.data.response.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        onChange={handleChange} 
                        name='email' 
                        type="email" 
                        required 
                    />
                </label>
                
                <label>
                    Username:
                    <input 
                        onChange={handleChange} 
                        name='username' 
                        type="text" 
                        required 
                    />
                </label>
                
                <label>
                    Password:
                    <input 
                        onChange={handleChange} 
                        name='password' 
                        type="password" 
                        required 
                        minLength={6}
                    />
                </label>
                
                <div className="button-group">
                    <button type='submit'>Sign Up</button>
                    <button 
                        type="button" 
                        className="secondary"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>
                </div>
                
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;