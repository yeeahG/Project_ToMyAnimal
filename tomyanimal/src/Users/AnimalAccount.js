import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AnimalAdd from './components/AnimalAdd';
import './UserHome.css'

const AnimalAccount = ( ) => {
  const [animal, setAnimal] = useState([]);

  const [petPhoto, setPetPhoto] = useState();
  const [petId, setPetId] = useState();
  const [petName, setPetName] = useState();
  const [petNumber, setPetnum] = useState();
  const [petBTD, setPetBTD] = useState();
  const [petKg, setPetKg] = useState();

  
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

  const navigate = useNavigate();

  const loginId = localStorage.getItem('userid');


  /*
  useEffect(() => {
    axios({
      method: 'get', 
      url: 'http://localhost:8084/api/pets/' + loginId,
      // url: 'https://jsonplaceholder.typicode.com/posts',
      headers: {Authorization: localStorage.getItem('logintoken')}
    }).then((animal) => {
      setAnimal(animal.data);

      console.log(animal.data);

    }).then((error) => {
      console.log(error.message)
    })
  }, []);
  */


  /*axios.get('http://localhost:8084/api/pets' + loginId,*/
  useEffect(() => {
    axios.get('http://localhost:8084/api/pets/5', { 
      headers: { 
        Authorization: localStorage.getItem('logintoken') 
      } 
    })
    .then(response => {
      //setAnimal(response.data);
      setPetId(response.data.result.data['id'])
      setPetName(response.data.result.data['petName'])
      setPetnum(response.data.result.data['registrationNumber'])
      setPetBTD(response.data.result.data['birthday'])
      setPetKg(response.data.result.data['weight'])

    })
    .catch((error) => {
      console.log('error ', error);
    });
  }, []);

  console.log(petId);

  const gotoLog = () => {
    navigate('/animal')
  }

  const animalDelete = async () => {
    localStorage.removeItem('animalinfo');

    axios.delete('http://localhost:8084/api/pets/4', {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('logintoken'),
      }
    })
    .then((data) => {
      console.log('성공:', data);
    })
    .catch((error) => {
      console.error('실패:', error);
    });

    navigate('/user')
  }

  return (
  <div>
    <div className='animal__banner'>
      <h2>
        WANT TO WRITE{"\n"}
        MORE ABOUT MY ANIMAL?
      </h2>
      <svg 
        className='arrow'
        viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={gotoLog}
      >
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
      animal.userid === 로그인시의 userid면 Animal info 불러오기
    </div>

  <div className='animalinfo__content'>
    {/*{localStorage.getItem("animalinfo")?  */}
    {petId ? 
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

          {/*
          {animal.map((it) =>
          <tbody>
            <tr>
              {animal}
              <td>{it.petName}</td>
              <td>{it.registrationNumber}</td>
              <td>{it.birthday} </td>
              <td>{it.weight}</td>
            </tr>
          </tbody>
           )}
          */}

          <tbody>
            <tr>
              <td>{petName}</td>
              <td>{petNumber}</td>
              <td>{petBTD}</td>
              <td>{petKg}</td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className='welcome'>
        <button className='welcome__btn'>
          <a href="/animal">PET LOG</a>
        </button>
        <button className='welcome__btn'>
          <a href="/">Home</a>
        </button>
        <button className='welcome__btn' onClick={animalDelete}>
          <a href="/">Delete</a>
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