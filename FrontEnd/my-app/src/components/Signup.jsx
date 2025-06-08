import axios from "axios";
import { useState } from "react";

async function Signup() {
  const [formdata, setFormdata] = useState({
    email: '',
    username: ''
  })

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    callSignupAPI();
  }

  const callSignupAPI = async () => {
    try {      
      const res = await axios.post('api/users/signup', formdata);
      if(res) {
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(formdata);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <label>Type your email here
          <input onChange={handleChange} name='email' type="text" />
        </label>
        <label>User Name
          <input onChange={handleChange} name='username' type="text" />
        </label>
        <button onSubmit={handleSubmit}>DONE</button>
      </form>
    </>
  )
}

export default Signup;