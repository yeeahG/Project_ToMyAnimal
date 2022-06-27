import React from 'react'
import { useNavigate } from 'react-router-dom'

const Walk = () => {
  const navigate = useNavigate();

  const checklistBack = () => {
    navigate(-1);
  }

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

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>My animal</li>
            <p onClick={checklistBack}>Back</p>
          </ul>
        </div>

        <div className='log__wrapper'>
          
          <section className='input__container'>
            <section className='checklist__wrapper'>

              <div className='checklist__swiper'>
                <div className='checklist__content'>
                  산책
                </div>
              </div>

            </section>
          </section>

        </div>
      </div>

    </div>
  )
}

export default Walk