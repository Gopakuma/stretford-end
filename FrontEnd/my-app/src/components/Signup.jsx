import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


function Signup() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); 

  const [status, setStatus] = useState();

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
      if(res.status === 200){
        navigate('/dashboard');
        login(res.data['response'].token);
        setStatus(true);
      }
      console.log(res);
    } catch (error) {
      navigate('/');
      console.log(error);
      setStatus(false);
    }
  }

  function handleOnclick(e) {
    e.preventDefault();
    navigate('/login');
  }


  return (
    <>
    <div>
      signup
    </div>
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
        <button type='submit'>DONE</button>
        <button onClick={handleOnclick}>Login</button>
        {status === false && <div>Error signing up. {error}.</div>}

      </form>
    </>
  )
}

export default Signup;