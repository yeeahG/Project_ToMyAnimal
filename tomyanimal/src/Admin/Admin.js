import React from 'react'

const Admin = () => {
  return (
    <div>
        <form>
            <div className='login__form'>
                <h2>Login</h2>
                {/*{(error !== "") ? ( <div className='error'>Enter a correct ID and PASSWORD</div> ) : ""}*/}
                <div className='login__input'>
                    <label htmlFor="id">Id : </label>
                    <input 
                    type="text" name='id' id='id' className='input' required
                    />
                </div>
                <div className='login__input'>
                    <label htmlFor="password">Password : </label>
                    <input 
                    type="password" name='password' id='password' className='input' required
                    />
                </div>
                <input className='login__btn' type="submit" value="LOGIN"/>
            </div>
        </form>
    </div>
  )
}

export default Admin