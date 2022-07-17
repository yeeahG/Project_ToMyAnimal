import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ControlMenu from '../Pages/ControlMenu';
import { baseInstance } from '../utils/api';
import './Signup.css'

const golbalPhoneNumberList = [
  {value: "+82", name: "+82"},
  {value: "+82", name: "+82"},
]

const Signup = () => {
  let [globalPhoneNumber, setGlobalPhoneNumber] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [username, setUsername] = useState("");
  let [signinId, setSigninId] = useState("");
  let [signinEmail, setSigninEmail] = useState("");
  let [signinPassword, setSigninPassword] = useState("");
  
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const location = useLocation();

  // 핸드폰번호 유효성 검사
  const isPhone = (e) => {
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    console.log('이메일 유효성 검사 : ', phoneRegex.test(e.target.value));

    if ((!e.target.value || (phoneRegex.test(e.target.value)))) setError("");
    else setError("핸드폰 번호 형식이 맞지않습니다")
    setPhoneNumber(e.target.value);
  }
  
  // 이메일 유효성 검사
  const isEmail = (e) => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    console.log('이메일 유효성 검사 : ', emailRegex.test(e.target.value));

    if ((!e.target.value || (emailRegex.test(e.target.value)))) setError("");
    else setError("이메일 형식이 맞지 않습니다")
    setSigninEmail(e.target.value);
  }

  const onSubmitSignUp = async () => {
    const item = {
      phoneNumber: phoneNumber,
      identifier: signinId,
      name: username,
      email: signinEmail,
      password: signinPassword,
    }
    
    if( phoneNumber !=="" && signinId !=="" && username !=="" && signinPassword !=="" && signinEmail !== "") {

      try {
        async function callAPI() {
          const result = await baseInstance.post('api/signup', item);

          if(result.success === 'success'){
            alert("가입이 완료되었습니다") 
          } else if (result.success === 'false') {
            alert("가입을 다시 진행해주세요")
            window.location.reload();
          }
          navigate('/user')
          
        } callAPI();
      } catch(error) {
        console.error('실패:', error);
        alert("다시 시도해주세요")
      }
    } else {
      setError("한 글자 이상 입력하세요")
    }
  }

  return (
    <div>
      <div className='signContainer'>

        <h2>Sign up</h2>
        {error}

        <div className='phoneNumber__container'>
          <ControlMenu
            value={globalPhoneNumber} 
            onChange={setGlobalPhoneNumber}
            optionList={golbalPhoneNumberList}
          />
          <input 
            label="연락처" name="phone" placeholder="연락처" 
            required onChange={isPhone}
          />
        </div>

        <input 
          label="이름" name="username" placeholder="이름" 
          required onChange={(e) => {setUsername(e.target.value)}}
        />
        <input 
          label="아이디" name="userId" placeholder="아이디" 
          required onChange={ (e) => {setSigninId(e.target.value)}} 
        />
        <input 
          label="이메일" name="userEmail" placeholder="이메일" 
          required 
          onChange={isEmail}
        />
        <input 
          label="비밀번호" name="password" placeholder="비밀번호" type="password" 
          required onChange={(e) => {setSigninPassword(e.target.value)}} 
        />
                
        <button onClick={onSubmitSignUp} className='resigter__btn'>
          회원가입
        </button>

      </div>
    </div>
  )
}

export default Signup