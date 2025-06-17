import React from 'react'
import Backbutton from './Buttons/Backbutton'
import LogoutButton from './Buttons/LogoutButton'

function NotificationSettings() {

  return (
    <>
      <Backbutton path={'/dashboard'} />
      <LogoutButton />
    </>
  )
}

export default NotificationSettings