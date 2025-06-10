import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

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
      const res = await axios.post('http://localhost:3000/api/v1/users/signup', formdata);
      if(res.statusText == 'Accepted'){
        navigate('/dashboard');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(formdata);

  function handleOnclick(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <label>Type your email here
          <input onChange={handleChange} name='email' type="text" />
        </label>
        <label>Password
          <input onChange={handleChange} name='password' type="text" />
        </label>
        <button onSubmit={handleSubmit}>DONE</button>
        <button onClick={handleOnclick}>Signup</button>
      </form>
    </>
  )
}

export default Login;