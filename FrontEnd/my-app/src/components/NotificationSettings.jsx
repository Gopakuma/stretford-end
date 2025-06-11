import React from 'react'
import Backbutton from './Backbutton'
import LogoutButton from './LogoutButton'

function NotificationSettings() {
  return (
    <>
    <div>
      Notification Settings
    </div>
    <Backbutton path={'/dashboard'}/>
    <LogoutButton/>
    </>
  )
}

export default NotificationSettings