import React, { useEffect, useState } from 'react'
import axios from 'axios';
 
const Signout = () => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState("");

  const [isOpen, setOpen] = useState(false);
  const userid = localStorage.getItem('userid')

  useEffect(() => {
    axios({
      method: 'get', 
      url: 'http://localhost:8084/api/members/' + userid,
    }).then((user) => {
      setPassword(user.data.result.data['userPhoneNumber']) 
    })
  }, []);

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
  
  //console.log(checkPassword);

  const checkHandler = (e) => {
    e.preventDefault();
    console.log('contacn check');

    if (password === checkPassword) {
      setOpen(true)
    } else {
      setError('연락처를 다시 입력하세요')
    }
  }

  return (
    <div>
      <div className='userinfo__subtitle'>
        <h1>ByeBye</h1>
      </div>
      
      <p>탈퇴하기</p>
      <p>비밀번호 재 확인(전화번호로 임시대체) 후 확인창 띄우고 삭제</p>
      <p>input.password === DB의 userid password ? 탈퇴창 : error</p>
      <div className='userinfo__content'>
        {error}
        <form onSubmit={checkHandler}>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  placeholder='연락처를 입력하세요' 
                  onChange={(e) => setCheckPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <input type="submit" className='welcome__btn' value="SEND" />
        </form>

        {isOpen ?
        <div className='welcome'>
          <button className='welcome__btn' onClick={userDelete}>
            <a href="/">Delete</a>
          </button>
        </div>
        :
        ""
        }
      </div>
    </div>
  )
}

export default Signout