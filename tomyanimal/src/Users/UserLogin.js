import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css'
import { authInstance } from '../utils/api';

// axios.defaults.withCredentials = true;

const UserLogin = ({Login}) => {
    const [details, setDetails] = useState({id:"", password: ""});
    const [jwt, setJwt] = useState("", "jwt");
    const [error, setError] = useState("");
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const userdata = {
        identifier: details.id,
        password: details.password
    }
    
    
    const submitHandler = async e => {
        e.preventDefault();
        
        try {

            //const data = await authInstance.post('api/signin', userdata);
            const data = await axios.post(process.env.REACT_APP_BACK_BASE_URL + 'api/signin', userdata);
            const jwt = axios.defaults.headers.common['Authorization'] = data.data.result.data['accessToken'];
            localStorage.setItem('logintoken', jwt);
            localStorage.setItem('userInfo', JSON.stringify(data.data.result.data));
            localStorage.setItem('userid', data.data.result.data['member']);
            
            if (jwt) {
                navigate('/')
            } else {
                alert("다시 로그인해주세요")
            }
        } catch(error) {
            setError(error)
        }
    }

 
    return (
    <div className='login__container'>

        <form onSubmit={submitHandler}>
            <div className='login__form'>
                <h2>Login</h2>
                <p>{(error !== "") ? ( <div className='error'>올바른 아이디 및 비밀번호를 입력하세요</div> ) : ""}</p>
                <div className='login__input'>
                    <label htmlFor="id">Id : </label>
                    <input 
                    type="text" name='id' id='id' className='input' required
                    onChange={e => setDetails({...details, id: e.target.value})} value={details.id}/>
                </div>
                <div className='login__input'>
                    <label htmlFor="password">Password : </label>
                    <input 
                    type="password" name='password' id='password' className='input' required
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input className='login__btn' type="submit" value="LOGIN"/>
            </div>
        </form>

        <p className='login__register'>
            아이디가 없으신가요?&nbsp;
            <a href='/register'>Create one</a>
        </p>

    </div>
  )

}

export default UserLogin