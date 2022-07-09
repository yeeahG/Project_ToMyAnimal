import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AnimalAdd from './components/AnimalAdd';
import './UserHome.css'

const AnimalAccount = ( ) => {
  const [animal, setAnimal] = useState([]);

  const [petPhoto, setPetPhoto] = useState();
  const [petName, setPetName] = useState();
  const [petNumber, setPetnum] = useState();
  const [petBTD, setPetBTD] = useState();
  const [petKg, setPetKg] = useState();

  
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", 
    contact: "",
  });

  const [isOpen, setOpen] = useState(false);

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

  const putPetsList = [];
  const putPetsIdList = [];
  const [petArray, setPetArray] = useState([]);
  const [petId, setPetId] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8084/api/my-animal?memberId=${loginId}`, { 
      headers: { 
        Authorization: localStorage.getItem('logintoken') 
      } 
    })
    .then(response => {
      //setPetArray(response.data)
      
      for (let i=0; i < response.data.result.data.length; i++) {
        putPetsList.push(response.data.result.data[i])
        putPetsIdList.push(response.data.result.data[i].id)
      }
      setPetArray(putPetsList)
      setPetId(putPetsIdList)
    })
    .catch((error) => {
      console.log('error ', error);
    });
  }, []);

  const gotoLog = () => {
    navigate('/animal')
  }

  const animalDelete = async (it) => {
    it.preventDefault();
    console.log(it.id);

    await axios.delete('http://localhost:8084/api/animals/' + it.id, {
      headers: {
        'Authorization': localStorage.getItem('logintoken'),
      }
    })
    .then((data) => {
      console.log('성공:', data);
      setPetArray(it.filter((p) => p.id !== it.id));
    })
    .catch((error) => {
      console.error('실패:', error);
    });

  }

  const date = new Date();
  const dateYear = date.getFullYear()

  //putPetsList[0].birthday
  //const birthDate = new Date(petBTD.getFullYear(), petBTD.getFullMonth(), petBTD.getDate())

  //let age = date.getFullYear() - birthDate.getFullYear() +1;
 // console.log(age);

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
      {/*animal.userid === 로그인시의 userid면 Animal info 불러오기*/}
    </div>

  <div className='animalinfo__content'>
    { (petArray.length >= 1 ) ? 
    <>
      { !isOpen ?
      <form>
        <table className='animal__detail__form'>
          <thead>
            <tr>
              <th>Name</th>
              <th>No</th>
              <th>Birthday</th>
              <th>Age</th>
              <th>Weight</th>
            </tr>
          </thead>

          <tbody>
          {petArray.map((it) =>
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{it.registrationNumber}</td>
              <td>{it.birthday}</td>
              <td>{parseInt(dateYear) - parseInt(it.birthday)}살</td>
              <td>{it.weight}kg</td>
              <td><button onClick={() => animalDelete(it)}>delete</button></td>
            </tr>
          )}
          </tbody>

        </table>
      </form>
      :
      <>
        <AnimalAdd />
      </>
      
    }
      <div className='welcome'>
        <button className='welcome__btn' onClick={()=>setOpen(!isOpen)}>
          {isOpen ? "Close" : "Add"}
        </button>
        {/* <button className='welcome__btn' onClick={animalDelete}>
          Delete
        </button> */}
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