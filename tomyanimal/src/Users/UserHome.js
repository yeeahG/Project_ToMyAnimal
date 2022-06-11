import React from 'react'
import { useNavigate } from 'react-router-dom';
import './UserHome.css'

const UserHome = () => {
    const navigate = useNavigate();

    const Logout = () => {
        // console.log("log out");
        // setUser({name: "", id: ""});
    
        // localStorage.clear();
        //localStorage.removeItem('logininfo');
        localStorage.removeItem('logintoken');
        navigate.push('/')
    }


  return (
    <div className='userinfo__container'>
      
      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>My account</h1>
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
        <h1>Details</h1>

        <div className='userinfo__table'>

          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>userName</td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>email or phonenumebr</td>
              </tr>
            </tbody>
          </table>
        </div>
          {localStorage.getItem('userinfo')}&nbsp;
          GET method로 userName, userPhoneNumberOrUserId 가져오기

        <div className='welcome'>
          <button onClick={Logout} className='welcome__btn'>
            <a href="/user">Logout</a>
          </button>
          <button className='welcome__btn'>
            <a href="/">Home</a>
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserHome