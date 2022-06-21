import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import './UserLogin.css'
import axios from 'axios';

const LOGIN_URL = 'https://jsonplaceholder.typicode.com/posts';
// axios.defaults.withCredentials = true;

const UserLogin = ({Login, error}) => {
    const [details, setDetails] = useState({id:"", password: ""});
    const [jwt, setJwt] = useState("", "jwt");
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    /*
    const submitHandler = async (e) => {
        e.preventDefault();
        
        //Login(details); //details에 id, password 임시 저장되어있음
        const userdata = {
            userPhoneNumberOrUserId: details.id,
            userPassword: details.password
        }
        
        /*1후보*/
        /*Axios.post('https://jsonplaceholder.typicode.com/posts', userdata
        ,{
            headers: {
                //"Authorization": `Bearer ${accessToken}`,
                //"Authorization": 'Bearer' + accessToken,
                //"Authorization": `Bearer ${accessToken}`,
                "Authorization": `Bearer ${accessToken.token}`,
                "Content-Type": 'application/json',
            }
        }
        )
        .then((details) => {
            Login(details);
            //db에 login 정보가 입력이 되면 detail에 저장되게 하는 방식이 될까..?
            //console.log(details);
            console.log(details.data.id);
            console.log(userdata);
            //Axios.defaults.headers.common['Authorization'] = 'Bearer ' + details.userdata;
            //Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            console.log("details.userdata.accessToken : " + details.userdata);
            //console.log(Authorization);
            //const { accesToken } = details.userdata;
            //Axios.defaults.headers.common['Authorization']  = `Bearer ${accessToken}`;
        })

        // .then(result => {
        // //     result.token ? goToMain() : alert(result.message)
        //         if(result.TOKEN) {
        //             localStorage.setItem("TOKEN", result.TOKEN)
        //             goToMain();
        //         } else {
        //             alert("로그인에 실패하였습니다")
        //         }
        // });
        */

        // await fetch('https://jsonplaceholder.typicode.com/posts', {
        //     method: "Post",
        //     headers: {
        //         "Content-Type":'application/json',
        //     },
        //     body: JSON.stringify(userdata),
        // })
        // .then((response) => {
        //     if(response.status === 200) {
            //     Login(details); //details에 id, password 저장, toekn으로 해야할까?
            //     return Promise.all([response.json(), response.headers]);
        //      }
        //          else
        //         return Promise.reject("Invalid login attempt")
        // })
        // .then(([body, headers]) => {
        //     setJwt(headers.get("Authorization"));
        //     window.location.href ='dashboard';
        // })
        // .then(res => {
        //     const token = res.data.token;
        //     localStorage.setItem('jwtToken', token);
        // })
    //}

    
    const userdata = {
        userId: details.id,
        password: details.password
    }
    
    
    const submitHandler = async e => {
        e.preventDefault();
        
        // const {data} = await axios.post('http://localhost:8084/api/auth/signin', userdata, {withCredentials: true});
        const data = await axios.post('http://localhost:8084/api/signin', userdata);
        //console.log(data);
        //console.log(data.data.result.data['accessToken']);
        // const jwt = axios.defaults.headers.common['Authorization'] = `${data['accessToken']}`;
        const jwt = axios.defaults.headers.common['Authorization'] = data.data.result.data['accessToken'];
        localStorage.setItem('logintoken', jwt);

        localStorage.setItem('userid', data.data.result.data['member']);
        // console.log(data.data.result.data['member']);
        // localStorage.setItem('id', jwt);
        localStorage.setItem('usename', data.data.result.data['userName']);

        if (jwt) {
            navigate('/')
        } else {
            alert("다시 로그인해주세요")
        }
    }

 
    return (
    <div className='login__container'>

        <form onSubmit={submitHandler}>
            <div className='login__form'>
                <h2>Login</h2>
                {/*{(error !== "") ? ( <div className='error'>Enter a correct ID and PASSWORD</div> ) : ""}*/}
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