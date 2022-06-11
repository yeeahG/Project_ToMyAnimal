import React from 'react'
import './UserHome.css'

const AnimalAccount = () => {
  return (
    <div className='userinfo__content'>
    <div className='userinfo__subtitle'>
      <h1>My Animal</h1>
      <button>Edit</button>
    </div>

    <div className='userinfo__table'>

      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>userName</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>email or phonenumebr</td>
          </tr>
        </tbody>
      </table>
    </div>
      GET method로 userName, userPhoneNumberOrUserId 가져오기

    <div className='welcome'>
      <button className='welcome__btn'>
        <a href="/">Home</a>
      </button>
    </div>

  </div>
  )
}

export default AnimalAccount