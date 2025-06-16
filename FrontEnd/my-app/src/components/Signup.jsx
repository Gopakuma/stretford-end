import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


function Signup() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); 

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/dashboard')
    }
  }, [navigate, isAuthenticated])

  const [formdata, setFormdata] = useState({
    email: '',
    username: ''
  })

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callSignupAPI();
  }

  const callSignupAPI = async () => {
    try {      
      const res = await axios.post('http://localhost:3000/api/v1/users/signup', formdata);
      if(res.statusText == 'Accepted'){
        navigate('/dashboard');
        login('token');
      }
      console.log(res);
    } catch (error) {
      navigate('/');
      console.log(error);
    }
  }

  function handleOnclick(e) {
    e.preventDefault();
    navigate('/login');
  }


  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <label>Type your email here
          <input onChange={handleChange} name='email' type="text" />
        </label>
        <label>User Name
          <input onChange={handleChange} name='username' type="text" />
        </label>
        <label>Password
          <input onChange={handleChange} name='password' type="text" />
        </label>
        <button onSubmit={handleSubmit}>DONE</button>
        <button onClick={handleOnclick}>Login</button>
      </form>
    </>
  )
}

export default Signup;