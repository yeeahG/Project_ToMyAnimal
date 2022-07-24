import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authInstance } from '../../utils/api';
import AnimalInfo from './AnimalInfo';
import AnimalAdd from './AnimalAdd';
import '../UserHome.css'

const AnimalAccount = ( ) => {
  const [petArray, setPetArray] = useState([]);
  const [petId, setPetId] = useState();

  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const loginId = localStorage.getItem('userid');

  const putPetsList = [];
  const putPetsIdList = [];

  useEffect(() => {
    try {
      async function callAPI() {
        const response = await authInstance.get(`api/my-animal?memberId=${loginId}`);

        for (let i=0; i < response.data.result.data.length; i++) {
          putPetsList.push(response.data.result.data[i])
          putPetsIdList.push(response.data.result.data[i].id)
        }
        setPetArray(putPetsList)
        setPetId(putPetsIdList)
      } callAPI();
    } catch(error) {
      console.log('error ', error);
    }
  }, []);

  const gotoLog = () => {
    navigate('/animal')
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
                <AnimalInfo 
                  key={it.id}
                  {...it}
                />
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