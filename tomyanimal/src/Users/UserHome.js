import React from 'react'
import { useNavigate } from 'react-router-dom';
import './UserHome.css'

const UserHome = () => {
    const navigate = useNavigate();

    const Logout = () => {
        // console.log("log out");
        // setUser({name: "", id: ""});
    
        // localStorage.clear();
        localStorage.removeItem('logininfo');
        navigate.push('/')
    }


  return (
    <div className='userinfo__container'>
      
      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>user Info</h1>
          <div className='header__detail'>
            <p>
              details
            </p>
          </div>
        </div>
      </div>

      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>

      <div className='userinfo__content'>

        {localStorage.getItem('userinfo')}
        <div className='welcome'>
          <h2>Welcome, <span></span></h2>
          <button onClick={Logout}>
            <a href="/user">Logout</a>
          </button>
          <button>
            <a href="/">Home</a>
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserHome