import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Login() {
  const { login, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/dashboard')
    }
  }, [navigate, isAuthenticated])
  
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    callLoginAPI();
  }

  const callLoginAPI = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', formdata);
      if (res.status == 200) {
        setIsLoggedIn(true);        
        login(res.data['data'].token)
        setStatus(true)
      } 
    } catch (error) {
      console.log(error);
      setStatus(false);
    }
  }

  function handleOnclick(e) {
    e.preventDefault();
    navigate('/');
  }

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  return (
    <>
    <div>
    LOGIN
    </div>
      <form className='form' onSubmit={handleSubmit}>
        <label>Type your email here
          <input onChange={handleChange} name='email' type="text" />
        </label>
        <label>Password
          <input onChange={handleChange} name='password' type="text" />
        </label>
        <button type="submit">DONE</button>
        <button onClick={handleOnclick}>Signup</button>
      </form>
        {status === false && <div>Error signing up..</div>}
    </>
  )
}

export default Login;