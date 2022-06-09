import React from 'react'

const AnimalLog = () => {
  return (
    <div>
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
            <div className='collection'>
                <a className='collection__content' href='/animal'>Info</a>
            </div>
            <div className='collection'>
                <a className='collection__content' href='./log'>Log</a>
            </div>
            <div className='collection'>
                <a className='collection__content'>Check up</a>
            </div>
            </ul>
        </div>

        <div className='content__wrapper'>
            <div>
            입력
            </div>
            <div>
            목록
            </div>
        </div>

        </div>

        

        <section className='etc'>
        <h2>New section</h2>
        </section>
    </div>
  )
}

export default AnimalLog