import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AnimalAdd from './components/AnimalAdd';
import './UserHome.css'

const AnimalAccount = ( ) => {
  const [animal, setAnimal] = useState([]);
  //console.log(animal);

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
      <h1>About My Animal</h1>
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


    {!animal? 
      <form>
        <table className='animal__detail__form'>
          <thead>
            <tr>
              <th>Name</th>
              <th>No</th>
              <th>Age</th>
              <th>Weight</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>GET method로 animalname, age, 등등 가져오기</td>
              <td>GET method로 animalname, age, 등등 가져오기</td>
              <td>GET method로 animalname, age, 등등 가져오기</td>
              <td>GET method로 animalname, age, 등등 가져오기</td>
            </tr>
          </tbody>
        </table>
      </form>
    :
    <>
      <AnimalAdd />
    </>
    }
          

  </div>
  )
}

export default AnimalAccount