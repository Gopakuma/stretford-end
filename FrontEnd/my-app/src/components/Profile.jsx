import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import img from '../assets/react.svg'
import './style/Profile.css';
import LogoutButton from './Buttons/LogoutButton';

function Profile() {
    const {user} = useAuth();
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

  return (
    <>
    <div className='profile-container'> 
        <div className='profile-icon' onClick={handleToggle}>
            <img src={img}></img>
        </div>
        <div className='profile-name' onClick={handleToggle}>
            {user}
        </div>
    </div>
    <div className='menu-container'>
    {toggle && 
            <ul className='menu-list'>
                <li>
                    <LogoutButton/>
                </li>
                <li>
                    <button>
                    Settings
                    </button> 
                </li>
            </ul>
        }
    </div>
    </>
  )
}

export default Profile;