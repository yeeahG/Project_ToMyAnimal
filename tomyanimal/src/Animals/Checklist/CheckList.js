import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CardItem from '../../Pages/CardItem';
import ControlMenu from '../../Pages/ControlMenu';
import img from './img/imageex.png'
import Walk from './Walk';

const CheckList = () => {
  const [sortType, setSortType] = useState('latest');
  const [isOpen, setOpen] = useState(false);

  const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
  ]

  return (
    <div className='log__wrapper'>

      <div className='navi__container'>
        <ControlMenu 
          value={sortType} 
          onChange={setSortType}
          optionList={sortOptionList}
        />

        <button onClick={()=>setOpen(!isOpen)}>
          {isOpen ? "Close" : "Write"}
        </button>
      </div>

      <section className='input__container'>

        <section className='checklist__wrapper'>
          <div className='checklist__swiper'>


            <div className='checklist__content'>
              <CardItem 
                text = "산책"
                src = "/img/imageex.png"
                label = 'Walking'
                path='/animal'
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
            </div>
            
            <div className='checklist__content'>
              <Link to="/animal" >
                산책
                <div className='checklist__img'><img src={img} /></div>
              </Link>
            </div>

          </div>
        </section>
      </section>

    </div>
  )
}

export default CheckList