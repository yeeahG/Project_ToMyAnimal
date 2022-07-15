import React, { useEffect, useState } from 'react'
import profile from './Checklist/img/imageex.png'
import './AnimalInfo.css'
import AnimalMedicalInfoOne from './AnimalMedical/AnimalMedicalInfoOne';
import { authInstance } from '../utils/api';

export const MedicalInfoContext = React.createContext();

const messagelist = [
  {
    id: 1,
    type: "접종",
    editable: false,
    replies: [
      {
        id: 1, 
        date: "2022-07-01",
        type: "광견병",
        likes: 231
      },
      {
        id: 2, 
        date: "2022-07-03",
        type: "심장 사상충",
        likes: 2
      },
    ]
  },
  {
    id: 4, 
    type: "수술",
    editable: false,
    replies: [
      {
        id: 5,
        date: "2022-07-06",
        type: "중성화",
        likes: 2
      },
      {
        id: 5,
        date: "2022-07-07",
        type: "슬개골",
        likes: 2
      },
    ]
  },
  {
    id: 6,
    type: "복용",
    editable: false,
    replies: [
      {
        id: 1,
        date: "2022-07-06",
        type: "유산균",
        likes: 2
      },
      {
        id: 2,
        date: "2022-07-07",
        type: "칼슘",
        likes: 2
      },
    ]
  },
]

const AnimalPage = () => {
  const [petimg, setPetimg] = useState();
  const [petprofile, setPetprofile] = useState([]);

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    try {
      async function callAPI() {
        const response = await authInstance.get('api/animals/1');
        
        setPetprofile(response.data.result.data);
        setPetimg(response.data.result.data.images[0].uniqueName);
      } callAPI();
    } catch(error) {
        console.log(error);
    }

  }, []);

  const date = new Date();
  const dateYear = date.getFullYear()

  return (
  <div>

    <div className='content__wrapper'>
      <div className='animal__imageform'>
        <svg className="animal__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0" mask-type="alpha">
            <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
              130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
              97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
              0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
          </mask>
          <g mask="url(#mask0)">
            <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
              165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
              129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
              -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
            <img className="animal__blob__profile"  xlinkHref="{profile}"/>
          </g>
        </svg>

        {petimg? 
          <img 
          className="animal__blob__profile" 
          src={'http://localhost:8084/image/' + petimg}
          alt="animal profile"
          />
          :
          <img 
          className="animal__blob__profile" 
          src={profile}
          alt="animal profile"
          />
        }

      </div>


      <div className='info__details'>

        <div className='animal__description'>
          <h1>I'm {petprofile.name}</h1>
          <p>{parseInt(dateYear) - parseInt(petprofile.birthday)} years old</p>
          <p>{petprofile.weight}kg</p>
        </div>

      </div>

    </div>

    <section className='animal__info__wrapper'>
      <h2>{petprofile.name}'s Information</h2>

      <div className='animal__info__container'>

        {messagelist.map(message => (
          <div className='animal__info__content'>
            <AnimalMedicalInfoOne 
              editable={message.editable} 
              type={message.type}
              likes={message.likes} 
              replies={message.replies}
            />
          </div>
        ))}

      </div>

    </section>

    

  </div>
  )
}

export default AnimalPage