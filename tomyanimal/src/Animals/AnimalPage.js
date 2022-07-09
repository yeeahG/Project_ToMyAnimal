import React, { useEffect, useState } from 'react'
import axios from 'axios';
import profile from './Checklist/img/imageex.png'
import './AnimalInfo.css'
import AnimalMedicalInfoOne from './AnimalMedical/AnimalMedicalInfoOne';

export const MedicalInfoContext = React.createContext();

const medicalinfoDummy = [
  {
    id:1,
    type: "접종",
    data: [
      {
      id: 1, 
      type: "접종",
      text: "광견병 접종",
      date: '2022-07-01',
      },
      {
      id: 2, 
      type: "접종",
      text: "심장 사상충 접종",
      date: '2022-07-03',
      },
      {
      id: 3, 
      type: "접종",
      text: "~~~접종",
      date: '2022-07-04',
      },
    ]
  },
  {  
    id:2,
    type: "수술",
    data: [
      {
        id: 1, 
        type: "수술",
        text: "중성화 수술",
        date: '2022-07-06',
      },
      {
        id: 2, 
        type: "수술",
        text: "슬개골 수술",
        date: '2022-07-07',
      },
    ]
  },

]

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
  const [petName, setPetname] = useState();
  const [petBTD, setPetBTD] = useState();
  const [petKg, setPetKg] = useState();
  const [petimg, setPetimg] = useState();
  const [petprofile, setPetprofile] = useState();

  const userId = localStorage.getItem('userid');

  useEffect(() => {
    //axios.get(`http://localhost:8084/api/my-pet?memberId=${userId}`, {
    axios.get('http://localhost:8084/api/animals/1', {
      headers: {
        Authorization: localStorage.getItem('logintoken') 
      }
    }).then((response) => {
      console.log(response);
      // 내가 데리고 있는 동물이 여러마리 일때는 data[0] 이곳을
      // i를 length만큼 돌려서 가져와야될것으로 보임
      setPetname(response.data.result.data.name);
      setPetBTD(response.data.result.data.birthday);
      setPetKg(response.data.result.data.weight);
      setPetimg(response.data.result.data.images[0].uniqueName);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  //console.log(petimg[0].uniqueName);
  //const imageurl = petimg[0].uniqueName
  //localhost:8084/image/uniqueName
  console.log(petimg);

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

        <div className='details__description'>
          <h1>I'm {petName}</h1>
          <p>{parseInt(dateYear) - parseInt(petBTD)} years old</p>
          <p>{petKg}kg</p>
        </div>

      </div>

    </div>

    <section className='animal__info__wrapper'>
      <h2>{petName} Information</h2>

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



      <div className='animal__info__container'>

        <div className='animal__info__content'>

          <h3>심장사상충 접종</h3>
          <p>2022 06 29
          광견병 접종</p>

        </div>

        <div className='animal__info__content'>

          <h3>수술 내역</h3>
          <p>2022 06 29
            중성화 수술</p>

        </div>

        <div className='animal__info__content'>

          <h3>복용 내역</h3>
          <p>2022 06 29
            심장사상충</p>
        </div>
      </div>

    </section>

    

  </div>
  )
}

export default AnimalPage