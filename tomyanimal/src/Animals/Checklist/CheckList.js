import React, { useState, createContext} from 'react'
import { Link } from 'react-router-dom';
import CardItem from './CardItem';
import ControlMenu from '../../Pages/ControlMenu';
import img from './img/imageex.png'
import Walk from './Walk';

export const ChecklistContext = React.createContext();

const checklistTab = [
  {
    id: 1,
    text: "산책",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 2,
    text: "사료",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 3,
    text: "간식",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 4,
    text: "미용",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 5,
    text: "진료",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 6,
    text: "목욕",
    src: "/img/imageex.png",
    label: 'Walking',
  }, 
  {
    id: 7,
    text: "대소변",
    src: "/img/imageex.png",
    label: 'Walking',
    path: '/animal/walk'
  }, 
]

const CheckList = () => {
  //console.log(checklistTab);

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

              {/* <div className='checklist__content'>
                <CardItem 
                  text = "산책"
                  src = "/img/imageex.png"
                  label = 'Walking'
                  path='/animal/walk'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "사료"
                  src = "/"
                  label = 'Walking'
                  path='/'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "간식"
                  src = "/"
                  label = 'Walking'
                  path='/animal'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "미용"
                  src = "/"
                  label = 'Walking'
                  path='/animal'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "진료"
                  src = "/"
                  label = 'Walking'
                  path='/animal'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "목욕"
                  src = "/"
                  label = 'Walking'
                  path='/animal'
                />
              </div>

              <div className='checklist__content'>
                <CardItem 
                  text = "대소변"
                  src = "/"
                  label = 'Walking'
                  path='/animal'
                />
              </div> */}

              {/*
              <div className='checklist__content'>
                {checklistTab.map((it) => 
                <CardItem
                  key={it.id}
                  {...it}
                />
                )}
              </div>
                
              
              <div className='checklist__content'>
                <Link to="/animal" >
                  산책
                  <div className='checklist__img'><img src={img} /></div>
                </Link>
              </div>
              */}
              
            </div>
          </section>
        </section>

      </div>
    </ChecklistContext.Provider>
  )
}

export default CheckList