import React, { useEffect, useReducer, useState } from 'react'
import Read from './components/Read'
import axios from 'axios';
import './Board.css'
import ControlMenu from '../Pages/ControlMenu';
import Pagination from './components/Pagination';
import Write from './components/Write'
 
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
    const [isOpen, setOpen] = useState(false);

    const userid = localStorage.getItem('userid');

    //http://localhost:8084/api/my-board?memberId=${userid}&categoryId=1&page=0&size=4&type=0
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
    
    const getProcessedList = () => {
        const compare = (a,b) => {
            if(sortType === 'latest') {
                return parseInt(b.id) - parseInt(a.id);
            } else {
                return parseInt(a.id) - parseInt(b.id);
            }
        }
        
        const copyList = JSON.parse(JSON.stringify(article));
        const sortedList = copyList.sort(compare);
        
        let currentPosts = 0;
        currentPosts = sortedList.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    
    const currentPosts = (article) => {
        let currentPosts = 0;
        currentPosts = article.slice(indexOfFirst, indexOfLast);

        const compare = (a,b) => {
            if(sortType === 'latest') {
                return parseInt(b.id) - parseInt(a.id);
            } else {
                return parseInt(a.id) - parseInt(b.id);
            }
        }

        const sortedList = currentPosts.sort(compare)
        return sortedList;
    };

    const addArticle = async () => {
        const post = {
            title: "New", 
            body: "Hello world", 
            userId: "yeji"
        }

        await axios.post('https://jsonplaceholder.typicode.com/posts', post)
        setArticle([post, ...article]);
    }

    const openButton = ()=> {
    setOpen(!isOpen)
    }

    

  return (
    <div className='log__wrapper'>

        <div className='userinfo__subtitle'>
            <a href='/community/board'>
                <h1>Board</h1>
            </a>
            <p>Write everything</p>
        </div>

        {isOpen ?
        <div className='input__container'>
            <Write openButton={openButton} />
        </div>
        :
        <>
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
                article={article}
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
                {/*{currentPosts(article).map((it) => */}
                {getProcessedList().map((it) => 
                <Read key={it.id} {...it} />
                )}
            </table>
        </div>
        

        {/* <Read article={article} /> */}
        <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={article.length}
            paginate={setCurrentPage}
        /> 
        
        {localStorage.getItem('logintoken') ?
        <div className='write__article'>
            <button onClick={addArticle}>글쓰기</button>
            <button onClick={openButton}>
                {isOpen ? "" : "Write"}
            </button>
            <button>내글</button>
        </div>
        :
        ""}
        
        </>
        }
    </div>
  )
}

export default Board