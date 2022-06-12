import React from 'react'
import { useNavigate } from 'react-router-dom';
import './UserHome.css'

const UserAccount = () => {
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
  <div className='userinfo__content'>
    <div className='userinfo__subtitle'>
      <h1>Details</h1>
      <button>Edit</button>
    </div>

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
      POST 로 회원정보 수정

    <div className='welcome'>
      <button onClick={Logout} className='welcome__btn'>
        <a href="/user">Logout</a>
      </button>
      <button className='welcome__btn'>
        <a href="/">Home</a>
      </button>
    </div>

  </div>
  )
}

export default UserAccount