import React, { useState } from 'react'
import Map from './Map'
import { placeData } from './placeData'
import PlaceList from './PlaceList'
import './Places.css'


const Place = () => {
  const [coordinates, setCoordinates] = useState({ lat:0, lng:0});

  const [isLoading, setisLoading] = useState(true);

  /*Tab menu*/
  const [activeIndex, setActiveIndex]=useState(0);

  const tabClickHandler=(index)=>{
    setActiveIndex(index);
  };

  const tabContArr=[
    {
      tabTitle:(
        <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>전체 </li>
      ),
      tabCont:(
        <div><PlaceList placeData={placeData} isLoading={isLoading} /></div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> 서울</li>
      ),
      tabCont:(
        <div> 서울지역 </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>대구</li>
      ),
      tabCont:(
        <div> 대구지역 </div>
      )
    }
  ];


  return (
    <div className='place__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Where is</h1>
          <div className='header__detail'>
            <p>전국에 있는 병원과 훈련소를 찾아보세요</p>
          </div>
        </div>
      </div>
        
      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>
        
      <div className='map__container'>
        <Map />
      </div>

      <div className='place__content'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>지역들</li>
            {tabContArr.map((section)=>{
              return section.tabTitle
            })}
          </ul>
        </div>

        <div className='place__wrapper'>
          <div className='place__form'>
            {tabContArr[activeIndex].tabCont}
          </div>
        </div>
        
      </div>


    </div>
  )
}

export default Place