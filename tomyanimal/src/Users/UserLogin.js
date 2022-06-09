import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [details, setDetails] = useState({id:"", password: ""});

    const userdata = {
        userPhoneNumberOrUserId: details.id,
        userPassword: details.password
    }



  return (
    <div>

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