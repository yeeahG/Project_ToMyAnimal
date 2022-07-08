import React from 'react'
import CardItem from './CardItem';
//import img from './img/imageex.png'

export const ChecklistContext = React.createContext();

const checklistTab = [
  {
    id: 1,
    text: "산책",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 2,
    text: "사료",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 3,
    text: "간식",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 4,
    text: "미용",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 5,
    text: "진료",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 6,
    text: "목욕",
    src: "../Checklist/img/1.png",
    label: 'Walking',
  }, 
  {
    id: 7,
    text: "대소변",
    src: "../Checklist/img/1.png",
    label: 'Walking',
    path: '/animal/walk'
  }, 
]

const CheckList = () => {

  return (
    <ChecklistContext.Provider value={checklistTab}>

      <div className='log__wrapper'>

        <div className='userinfo__subtitle'>
          <a href='/animal'>
            <h1>Check list</h1>
          </a>
          <p>Write things about your pet</p>
        </div>

        <section className='input__container'>

          <section className='checklist__wrapper'>
            <div className='checklist__swiper'>

              <div className='checklist__content'>
                <CardItem />
              </div>
            
            </div>
          </section>
        </section>

      </div>
    </ChecklistContext.Provider>
  )
}

export default CheckList