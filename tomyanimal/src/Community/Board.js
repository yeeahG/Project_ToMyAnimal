import React, { useEffect, useReducer, useState } from 'react'
import Read from './components/Read'
import axios from 'axios';
import './Board.css'
import ControlMenu from '../Pages/ControlMenu';

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

//상태관리를 담을 context
export const ArticleStateContext = React.createContext();

const Board = () => {
    const [article, setArticle] = useState([]);
    const [data, dispatch] = useReducer(article);
    const [sortType, setSortType] = useState('latest');

    console.log(article);

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
                <ControlMenu 
                value={sortType}
                onChange={setSortType}
                optionList={sortOptionList}
                />
            </div>
        </div>

        <div className='list__board'>
            <table>

                <thead>
                    <tr className='board__index'>
                        <th>id</th>
                        <th>글제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                        <th>조회</th>
                    </tr>
                </thead>

                {article.map((it) => 
                <Read key={it.id} {...it}/>
                )}
            </table>
        </div>

        {/* <Read article={article} /> */}

        <div className='paging'>
            <div className='paging__number'>
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>...</li>
                    <li>마지막페이지</li>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default Board