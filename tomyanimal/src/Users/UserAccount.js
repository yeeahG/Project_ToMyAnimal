import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserEdit from './UserEdit'
import './UserHome.css'

const UserAccount = () => {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios({
      method: 'get', 
      // url: 'http://localhost:8084/api/auth/',
      url: 'https://jsonplaceholder.typicode.com/posts',
    }).then((user) => {
      setUser(user.data);
    })
  }, []);
  //console.log(user);
  console.log(user.data);
  
  //useEffect( async () => {
  //     (
  //         async () => {
  //             const {data} = axios.get('http://localhost:8084/api/auth/signin');
  //             setName(data.userName);
  //         }
  //     )();
  // }, []);

    
  const Logout = () => {
    // console.log("log out");
    // setUser({name: "", id: ""});
  
    // localStorage.clear();
    //localStorage.removeItem('logininfo');
    localStorage.removeItem('logintoken');
    navigate.push('/')
  }

  //EDIT
  const editHandler = (e) => {
    e.preventDefault();

    user.history.push('/UserEdit')({
      pathname: '/UserEdit',
      userInfo: {
        userName: user[0].userId,
        userPhoneNumberOrUserId: user[0].title,
      },
    });
  }

  


        
  return (
  <div className='userinfo__content'>
    <div className='userinfo__subtitle'>
      <h1>Details</h1>
      {/* <button onClick={editHandler}>Edit</button> */}
      <button onClick={()=>setOpen(!isOpen)}>
          {isOpen ? "X" : "Edit"}
      </button>
    </div>

    {isOpen ?
      <UserEdit isOpen={isOpen}/>
      :
    <>
      <div className='userinfo__table'>
        <table>
          <tbody>
            <tr>
              <td>Name </td>
              {/* <td>userName</td> */}
              {/* <td>{user[0].userId}</td> */}
            </tr>
            <tr>
              <td>Contact </td>
              {/* <td>email or phonenumebr</td> */}
              {/* <td> {user[0].title}</td> */}
            </tr>
          </tbody>
        </table>
      </div>

      <div className='welcome'>
        <button onClick={Logout} className='welcome__btn'>
          <a href="/user">Logout</a>
        </button>
        <button className='welcome__btn'>
          <a href="/">Home</a>
        </button>
      </div>
    </>
    }

    {localStorage.getItem('userinfo')}&nbsp;
    GET method로 userName, userPhoneNumberOrUserId 가져오기
    PUT or PATCH 로 회원정보 수정

  </div>
  )
}

export default UserAccount