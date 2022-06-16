import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AnimalAdd from './components/AnimalAdd';
import './UserHome.css'

const AnimalAccount = ( ) => {
  const [animal, setAnimal] = useState([]);
  //console.log(animal);

  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

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
  <div>
    <div className='animal__banner'>
      <h2>
        WANT TO WRITE{"\n"}
        MORE ABOUT MY ANIMAL?
      </h2>
      <svg 
        className='arrow'
        viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line 
          x1="0.753418" y1="10.1284" x2="24.7946" y2="10.1284" 
          stroke="white" strokeWidth="1.5"></line>
        <line 
          y1="-0.75" x2="13.6226" y2="-0.75"
          transform="matrix(0.705929 0.708283 -0.705929 0.708283 15.178 1.22998)"
          stroke="white" strokeWidth="1.5"></line>
        <line
          y1="-0.75" x2="13.6226" y2="-0.75"
          transform="matrix(0.705929 -0.708283 0.705929 0.708283 15.178 20.5273)"
          stroke="white" strokeWidth="1.5"></line>
      </svg>

    </div>

    <div className='animalinfo__subtitle'>
      <h1>About My Animal</h1>
    </div>

  <div className='animalinfo__content'>
    {/* {localStorage.getItem("animalinfo")?  */}
    {(animal != "" )?
    <>
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

          {animal.map((it) => 
          <tbody>
            <tr>
              <td>{it.userId}</td>
              <td>{it.title}</td>
              <td>{it.title}</td>
            </tr>
          </tbody>
          )}
        </table>
      </form>

      <div className='welcome'>
        <button className='welcome__btn'>
          <a href="/animal">PET LOG</a>
        </button>
        <button className='welcome__btn'>
          <a href="/">Home</a>
        </button>
      </div>
    </>
    :
    <>
      <AnimalAdd />
    </>
    }
          

  </div>
  </div>
  )
}

export default AnimalAccount