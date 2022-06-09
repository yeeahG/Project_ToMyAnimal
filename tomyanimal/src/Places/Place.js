import React from 'react'
import './Places.css'

const Place = () => {
  return (
    <div className='place__container'>

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
        
      <div className='map__container'>
        Map
      </div>

      <div className='place__content'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>지역들</li>
            <div className='collection'>
              <a className='collection__content'>전체</a>
            </div>
            <div className='collection'>
              <a className='collection__content' href=''>Seoul</a>
            </div>
            <div className='collection'>
              <a className='collection__content'>Daegu</a>
            </div>
          </ul>
        </div>

        <div className='content__wrapper'>
          <div className='animal__imageform'>
            List
          </div>

          <div className='info__details'>

            <div className='details__description'>
              <h1>목록</h1>
              <p></p>
            </div>

            <div className='stack'>
              <button className='details__btn' aria-expanded="false">
                <span>Log</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.255" height="14.255">
                  <path fill='none' stroke="currentcolor" strokeWidth="1.5" d="M7.129 0v14.255M0 7.129h14.255"></path>
                </svg>
              </button>
              <div className='details__panel'>
                <p>세부내용 aria-expanded="true"로 변경되면서 이 부분이 열림
                  d="M0 7.128h14.255"로 바꿔주기
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Place