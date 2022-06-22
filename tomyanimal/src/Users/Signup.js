import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'

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


    const onSubmitSignUp = async () => {
        const item = {
          userPhoneNumber: phoneNumber,
          userId: signinId,
          username: username,
          password: signinPassword,
        }
        console.log(item);
    
        if( phoneNumber!="" || signinId!="" || username!="" || signinPassword!="" || signinPasswordCheck!="") {
          // if (signinPassword === signinPasswordCheck) {
    
            await fetch('http://localhost:8084/api/signup', {
              method: 'POST',
              // credentials: 'include',
              // mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json;',
                // 'Content-Type': 'application/json; charset=UTF-8',
                // 'Access-Control-Allow-Origin': 'http://localhost:8082/',
                // 'Accept': '*/*'
              },
              body: JSON.stringify(item),
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('성공:', data);
              })
    
            /*
            .then((result) => {
              result.message === 'SUCCESS' ? alert("가입이 완료되었습니다") : alert("다시 시도해주세요")
            })*/
    
            .catch((error) => {
              console.error('실패:', error);
            });
        
            localStorage.setItem("userinfo", JSON.stringify(item))
            alert('가입이 완료되었습니다')
            navigate('/user')
    
          // } else {
          //   setError("비밀번호가 일치하지 않습니다")
          // }
        } else {
          setError("한 글자 이상 입력하세요")
        }
    }

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

      {/*<div>
        <h3>USER INFO</h3>
        {localStorage.userinfo}
      </div>*/}


    </div>
  )
}

export default Signup