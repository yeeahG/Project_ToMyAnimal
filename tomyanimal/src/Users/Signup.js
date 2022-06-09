import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    let [phoneNumber, setPhoneNumber] = useState("");
    let [username, setUsername] = useState("");
    let [signinId, setSigninId] = useState("");
    let [signinPassword, setSigninPassword] = useState("");
    let [signinPasswordCheck, setSigninPasswordCheck] = useState("");
    
    let [savedPhoneNumber, setSavedPhoneNumber] = useState("");
    let [savedUsername, setSavedUsername] = useState("");
    let [savedSigninId, setSavedSigninId] = useState("");
    let [savedSigninPassword, setSavedSigninPassword] = useState("");
  
    let localStorage = window.localStorage;
    const navigate = useNavigate();
    const [error, setError] = useState("");


    

  return (
    <div>
        <div className='signContainer'>
            <h2>Sign up</h2>
            {error}
            <input label="연락처" name="phone" placeholder="연락처" required onChange={(e) => {setPhoneNumber(e.target.value)}}></input>
            <input label="이름" name="username" placeholder="이름" required onChange={(e) => {setUsername(e.target.value)}}></input>
            <input label="아이디" name="userId" placeholder="아이디" required onChange={ (e) => {setSigninId(e.target.value)}}></input>
            <input label="비밀번호" name="password" placeholder="비밀번호" type="password" required onChange={(e) => {setSigninPassword(e.target.value)}}></input>
            {/* <input label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" required onChange={(e) => {setSigninPasswordCheck(e.target.value)}}></input>  */}
                
        <button onClick={onSubmitSignUp} className='resigter__btn'>
          회원가입
        </button>
      </div>

      <div>
        <h3>USER INFO</h3>
        {localStorage.userinfo}
      </div>


    </div>
  )
}

export default Signup