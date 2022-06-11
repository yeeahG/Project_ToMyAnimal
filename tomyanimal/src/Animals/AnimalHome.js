import React, { useState } from 'react'
import AnimalPage from './AnimalPage';
import AnimalLog from './AnimalLog';
import CheckUp from './CheckUp';
import './AnimalInfo.css'

const AnimalHome = () => {
  const [activeIndex, setActiveIndex]=useState(0);

  const tabClickHandler=(index)=>{
    setActiveIndex(index);
  };

  const tabContArr=[
    {
      tabTitle:(
        <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>My Animal </li>
      ),
      tabCont:(
        <div> <AnimalPage /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> My Log</li>
      ),
      tabCont:(
        <div> <AnimalLog /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>Check up</li>
      ),
      tabCont:(
        <div> <CheckUp /> </div>
      )
    }
  ];

  return (
    <div className='info__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Header</h1>
          <div className='header__detail'>
            <p>details</p>
          </div>
        </div>
      </div>
        
      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>

      <div className='info__content'>
        {/* <div className='grid'> */}

          <div className='left__menu'>
            <ul className='menu__wrap'>
              <li className='menu__list'>My animal</li>
              {tabContArr.map((section, index)=>{
              return section.tabTitle
            })}
            </ul>
          </div>



          {tabContArr[activeIndex].tabCont}


        {/* </div> */}

      </div>
      
    </div>
  )
}

export default AnimalHome