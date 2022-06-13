import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './UserHome.css'

const AnimalAccount = ( user ) => {
  console.log(user);

  const [animal, setAnimal] = useState([]);
  useEffect(() => {
    axios({
      method: 'get', 
      // url: 'http://localhost:8084/api/auth/',
      url: 'https://jsonplaceholder.typicode.com/posts',
    }).then((animal) => {
      setAnimal(animal.data);
    })
  }, []);

  //console.log(animal[0]);

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
            <td>animal[0].animalName</td>
            {/* <td>{animal[0].title}</td> */}
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
        <a href="/">ADD</a>
      </button>
      <button className='welcome__btn'>
        <a href="/">Home</a>
      </button>
    </div>

  </div>
  )
}

export default AnimalAccount