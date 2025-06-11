import React from 'react'
import { useAuth } from './AuthProvider';

function LogoutButton() {
    const { logout } = useAuth();
    const handleOnClickLogout = () => {
        logout()
    }
    return (
        <button className='btn-logout' onClick={handleOnClickLogout}>
            Logout
        </button>
    )
}

export default LogoutButton