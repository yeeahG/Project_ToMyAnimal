import React, { useEffect, useReducer, useState } from 'react'
import Read from './components/Read'
import axios from 'axios';
import './Board.css'
import ControlMenu from '../Pages/ControlMenu';
import Pagination from './components/Pagination';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        axios({
          method: 'get', 
          url: 'https://jsonplaceholder.typicode.com/posts',
        }).then((article) => {
            setArticle(article.data);
        })
      }, []);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (article) => {
        let currentPosts = 0;
        currentPosts = article.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };
    

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
                        <th style={{width:'5%'}}>id</th>
                        <th style={{width:'75%'}}>글제목</th>
                        <th style={{width:'8%'}}>글쓴이</th>
                        <th style={{width:'7%'}}>작성일</th>
                        <th style={{width:'5%'}}>조회</th>
                    </tr>
                </thead>

                {/* {article.map((it) =>  */}
                {currentPosts(article).map((it) => 
                <Read key={it.id} {...it}/>
                )}
            </table>
        </div>

        {/* <Read article={article} /> */}
        <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={article.length}
            paginate={setCurrentPage}
        />
    </div>
  )
}

export default Board