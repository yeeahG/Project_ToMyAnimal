import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import ReviewRead from './ReviewRead';
import ReviewWrite from './ReviewWrite';
import Pagination from '../components/Pagination';


export const ArticleStateContext = React.createContext();

const Review = () => {
    const [article, setArticle] = useState([]);
    const [data, dispatch] = useReducer(article);
    const [sortType, setSortType] = useState('latest');

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [isOpen, setOpen] = useState(false);
    const [error, setError] = useState("");

    const userid = localStorage.getItem('userid');

    const postList = [];

    useEffect(() => {
        //axios.get('https://jsonplaceholder.typicode.com/posts', {
        //axios.get(`http://localhost:8084/api/my-board?memberId=${userid}&categoryId=1&page=0&size=4&type=PUBLIC`, {
        axios.get(`http://localhost:8084/api/public-board?categoryId=1&type=PUBLIC&page=0&size=4`, {
            headers: {
                Authorization: localStorage.getItem('logintoken'),
            }
        })
        .then((response) => {
            //setArticle(article.data);
            
            for (let i=0; i<response.data.result.data.length; i++) {
                postList.push(response.data.result.data[i])
            }
            setArticle(postList);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);


    /*
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
    }*/

    /*const currentPosts = (article) => {
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
    }; */

    const addArticle = async () => {
        const post = {
            title: "New", 
            body: "Hello world", 
            userId: "yeji"
        }

        //await axios.post('https://jsonplaceholder.typicode.com/posts', post)
        setArticle([post, ...article]);
    }


    const addPost = async (newTitle, newContent) => {

        const newPost = {
          type: "PUBLIC",
          title: newTitle, 
          content: newContent,
          categoryId: 1
        }
    
        const newPosts = [...article, newPost];
        console.log(newPosts);
        setArticle(newPosts);
    
        if(newTitle != "" || newContent != "") {
          //await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
          await axios({
            method: 'post', 
            url: 'http://localhost:8084/api/board',
            data: newPost,
            headers: { 
              'Authorization': localStorage.getItem('logintoken'),
              'Content-Type': 'application/json',
            }
          })
          .then((data) => {
            console.log('성공:', data);
          })
          .catch((error) => {
            console.error('실패:', error);
          });
          alert('작성이 완료되었습니다')
          window.location.reload();
        } else {
          setError("한 글자 이상 입력하세요")
        }
    }    

    const openButton = ()=> {
    setOpen(!isOpen)
    }

    //pagination
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    let currentPosts = 0;
    currentPosts = article.slice(indexOfFirst, indexOfLast);

    

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
            <ReviewWrite 
                openButton={openButton}  
                addPost={addPost}
            />
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

                {/*{getProcessedList().map((it) => */}
                {currentPosts.map((it) => 
                <ReviewRead key={it.id} {...it} />
                )}
            </table>
        </div>
        

        {localStorage.getItem('logintoken') ?
        <div className='write__article'>
            {error}
            <button onClick={openButton}>
                {isOpen ? "" : "Write"}
            </button>
            <button>내글</button>
        </div>
        :
        ""}
        
        </>
        }

        <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={article.length}
            paginate={setCurrentPage}
          />
    </div>
  )
}

export default Review