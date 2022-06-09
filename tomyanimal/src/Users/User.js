import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import UserHome from '../Users/UserHome'


const User = () => {



  return (
    <div>
        <h3>Hello {name}</h3>
        {localStorage.getItem('logintoken') ? 
        <UserHome />
        :
        <div className='user__container'style={style}>

        </div>
        }
    </div>
  )
}

export default User