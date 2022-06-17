import React, { useEffect, useState } from 'react'
import Read from './components/Read'
import axios from 'axios';
import './Board.css'

const Board = () => {
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios({
          method: 'get', 
          url: 'https://jsonplaceholder.typicode.com/posts',
        }).then((article) => {
            setArticle(article.data);
        })
      }, []);
    

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
                {article.length}
            </div>
            <div className='control__menu'>
                control
            </div>
        </div>
        
        <Read article={article} />
    </div>
  )
}

export default Board