import React, { useEffect, useState } from 'react'
import { authInstance } from '../utils/api';
import profile from './Checklist/img/imageex.png'
import AnimalMedicalInfoOne from './AnimalMedical/AnimalMedicalInfoOne';
import BtnSlider from './BtnSlider';
import ControlMenu from '../Pages/ControlMenu'
import './AnimalInfo.css'
import { useNavigate } from 'react-router-dom';

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
  const [animalList, setAnimalList] = useState([]);
  const [allpetimg, setAllpetImg] = useState([]);
  const [animalName, setAnimalName] = useState('')
  const [isLoad, setLoad] = useState('')

  const userId = localStorage.getItem('userid');

  const date = new Date();
  const dateYear = date.getFullYear()

  const putList = [];
  const putImgList = [];

  //slider
  useEffect(() => {
    try {
      async function callAPI() {
        const response = await authInstance.get(`api/my-animal?memberId=${userId}`);
        setLoad(response.data)
        for (let i=0; i<response.data.result.data.length; i++) {
          putList.push(response.data.result.data[i])
          putImgList.push(response.data.result.data[i].images[0].uniqueName)
        }
        setAnimalList(putList);
        setAllpetImg(putImgList);
      } callAPI();
    } catch(error) {
      console.log(error);
    }
  }, [])

  const [slideIndex, setSlideIndex] = useState(1);
  
  const nextSlide = () => {
    if (slideIndex !== animalList.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === animalList.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(animalList.length)
    }
  }

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    localStorage.removeItem('logintoken');
    navigate.push('/')
  }


  return (
  <div>

    {isLoad.success === true ?
  <>
    <div className='container__slide content__wrapper'>
      {animalList.map((obj, index) => {
        return (
          <div 
            key={obj.id} 
            className={slideIndex === index+1 ? "slide active__photo" : "slide"} 
          >
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

              {allpetimg ?
                <img
                  className='animal__blob__profile'
                  src={process.env.REACT_APP_BACK_BASE_URL + "image/" + obj.images[0].uniqueName} 
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
                <h1>I'm {obj.name}</h1>
                <p>{parseInt(dateYear) - parseInt(obj.birthday)} years old</p>
                <p>{obj.weight}kg</p>
              </div>
            </div>

          </div>
        )
      })}

      { (animalList.length >=2) ?
        <>
          <BtnSlider moveSlide={nextSlide} direction={"next"} />
          <BtnSlider moveSlide={prevSlide}  direction={"prev"} />
        </>
      :
        ""
      }

    </div>
    

    <section className='animal__info__wrapper'>

      <h2>Information</h2>
      <div className='animal__info__menu'>
        <ControlMenu 
          value={animalName} 
          onChange={setAnimalName}
          optionList={animalList}
          />
      </div>
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
    
    </>
    : 
      <div>
        <h3>다시 로그인해주세요</h3>
        <div className='welcome'>
          <button onClick={Logout} className='welcome__btn'>
            <a href="/user">Logout</a>
          </button>
          <button className='welcome__btn'>
            <a href="/">Home</a>
          </button>
        </div>
      </div>
  }
    
  </div>
  )
}

export default AnimalPage