import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotificationSettingsButton() {
    const navigate = useNavigate();
    const handleOnClickNotification = (e) => {
      e.preventDefault();
      navigate('/notificationSettings')
    }
    return (
        <>
            <button className='btn-notification' onClick={handleOnClickNotification}>
                notification settings
            </button>
        </>
    )
}

export default NotificationSettingsButton;