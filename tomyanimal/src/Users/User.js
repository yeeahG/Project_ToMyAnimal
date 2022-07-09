import React from 'react'
import UserHome from '../Users/UserHome'
import UserLogin from './UserLogin'


const User = () => {

  return (
    <div>
      {localStorage.getItem('logintoken') ? 
        <UserHome />
        :
      <div className='user__container'>
        <UserLogin />
      </div>
      }
    </div>
  )
}

export default User