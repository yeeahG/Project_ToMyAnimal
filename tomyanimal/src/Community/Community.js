import React, { useState } from 'react'
import DummyBoard from './DummyBoard';
import Board from './Review/Board';

const Community = () => { 
    const [activeIndex, setActiveIndex]=useState(0);

    const tabClickHandler=(index)=>{
      setActiveIndex(index);
    };

    const tabContArr=[
      {
        tabTitle:(
          <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>Board</li>
      ),
        tabCont:(
          <div><Board /></div>
        )
      },
      {
        tabTitle:(
          <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>Dummy</li>
        ),
        tabCont:(
          <div>
            <DummyBoard /> 
          </div>
        )
      }
    ];

  return (
    <div>
      <main>
        <div className='info__container'>

          <div className='header'>
            <div className='space'></div>
            <div className='header__wrapper'>
                <h1 className='header__content'>Commuinity</h1>
              <div className='header__detail'>
                <p>자유게시판</p>
              </div>
            </div>
          </div>
                
          <div className='space'></div>
          <div className='line'></div>
          <div className='space'></div>
            
          <section className='wrapper'>

            <div className='left__menu'>
              <ul className='menu__wrap'>
                <li className='menu__list'>Community</li>
                {tabContArr.map((section)=>{
                  return section.tabTitle
                })}
              </ul>
            </div>

            {tabContArr[activeIndex].tabCont}
                    
          </section>
          
        </div>
      </main>

    </div>
  )
}

export default Community