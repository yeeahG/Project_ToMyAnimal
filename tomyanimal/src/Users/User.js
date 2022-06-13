import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import UserHome from '../Users/UserHome'
import UserLogin from './UserLogin'


const User = () => {
    const style = {
      margin: "5vw auto"
    }

    // useEffect( async () => {
    //     (
    //         async () => {
    //             const {data} = axios.get('http://localhost:8084/api/auth/signin');
    //             setName(data.userName);
    //         }
    //     )();
    // }, []);



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