import React from 'react'
import axios from 'axios';
 
const Signout = () => {
  const userid = localStorage.getItem('userid')

  const userDelete = async () => {
    axios.delete(`http://localhost:8084/api/members/${userid}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('logintoken'),
      }
    })
    .then((data) => {
      console.log('성공:', data);
      localStorage.clear();
    })
    .catch((error) => {
      console.error('실패:', error);
    });
  }
  
  return (
    <div>
      <div className='userinfo__subtitle'>
        <h1>ByeBye</h1>
      </div>
      
      <p>탈퇴하기</p>
      <p>비밀번호 재 확인 후 확인창 띄우고 삭제</p>

      <div className='userinfo__content'>
        input.password === DB의 userid password ? 탈퇴창 : error
        <form>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Contact</th>
            </tr>
          </thead>
        </form>

        <div className='welcome'>
          <button className='welcome__btn' onClick={userDelete}>
            <a href="/">Delete</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signout