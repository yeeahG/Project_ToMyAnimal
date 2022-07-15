import React from 'react'
import CardItem from './CardItem';

export const ChecklistContext = React.createContext();

const checklistTab = [
  {
    id: 1,
    text: "산책",
    src: "1",
    label: 'Walking',
  }, 
  {
    id: 2,
    text: "사료",
    src: "2",
    label: 'Walking',
  }, 
  {
    id: 3,
    text: "간식",
    src: "3",
    label: 'Walking',
  }, 
  {
    id: 4,
    text: "미용",
    src: "4",
    label: 'Walking',
  }, 
  {
    id: 5,
    text: "진료",
    src: "5",
    label: 'Walking',
  }, 
  {
    id: 6,
    text: "목욕",
    src: "6",
    label: 'Walking',
  }, 
  {
    id: 7,
    text: "대소변",
    src: "7",
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
          <p>반려동물이 오늘 하루 했던 것, 좋아한 것, 잘 먹던 것을 기록해주세요</p>
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