import React from 'react'
import Read from './components/Read'
import './Board.css'

const Board = () => {
  return (
    <div className='log__wrapper'>

        <div className='userinfo__subtitle'>
            <a href='/community'>
                <h1>Board</h1>
            </a>
            <p>Write everything</p>
        </div>
        
        <div className='add_info'>
            <div className='count__item'>
                새글
                {/*새글갯수*/}
                1
                /
                {/* 총 글 갯수 */}
                100
            </div>
            <div className='control__menu'>
                control
            </div>
        </div>
        
        <Read />
    </div>
  )
}

export default Board