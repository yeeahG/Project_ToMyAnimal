import React, { useEffect, useState, useContext, useRef } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LikeOutlined, LikeFilled, DownOutlined, UpOutlined } from '@ant-design/icons';
import CommentsBox from '../components/CommentsBox';
import TopCommentsBox from './TopCommentsBox';
import MessageScroll from './MessageScroll';
import { ContextProvider } from './Context/Context';


const showReply = React.createContext();

export function useOpenReply() {
  return useContext(showReply);
}

const ReviewDetail = ( {title, content} ) => {
    const {id} = useParams();
    console.log(id);
    const location = useLocation();
    const name = location.state.name;
    const bid = location.state.id;
    const postId = location.state.postId;
    const view = location.state.view;
  
  
    const [data, setData] = useState({})
    const [com, setCom] = useState([])
    const [comtext, setComText] = useState("")
  
    const [isOpen, setOpen] = useState(false);
  
    const [error, setError] = useState("");
  
    const [isCheck, setCheck] = useState([false, false, false, false, false]);
    const [like, setLike] = useState([0, 0, 0, 0, 0]);
    const likeList = [];
  
    //useContext로 저장해야 id로 내용 불러오기가능
    const userName = localStorage.getItem('usename')
  
    const navigate = useNavigate();

    const userid = localStorage.getItem('userid');
    const postList = [];
  
    useEffect(() => {
      //axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
      axios.get(`http://localhost:8084/api/my-board?memberId=${userid}&categoryId=1&page=0&size=4&type=PUBLIC`, {
        headers: {
          Authorization: localStorage.getItem('logintoken'),
        }
      })
      .then((response)=> {
        setData(response.data.result.data[0]);
        // for (let i=0; i<response.data.result.data.length; i++) {
        //   if (response.data.result.data[i].id === id) {
        //     postList.push(response.data.result.data[i])
        //   }
        // } 
        //setData(postList)
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
  
    const boardBack = () => {
      navigate(-1);
    }
  
    
    /*
    useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments/`)
      .then((response)=> {
        setCom(response.data);
      })
    }, []); */
  
  
    const addComment = async () => {
      const newComment = {
        //body: comtext,
        //userId: localStorage.getItem('usename'),
        //date: new Date(),
        //postId: id
  
        content: comtext,
        postId: id
      }
      console.log(newComment);
  
      if(comtext != "" ) {
        //await axios.post('https://jsonplaceholder.typicode.com/posts/${id}/comments/', newComment)
        await axios.post('http://localhost:8084/api/comments', newComment, {
          headers: {
            Authorization: localStorage.getItem('logintoken'),
          }
        })
        .then((data) => {
          console.log('성공:', data);
          setCom([newComment, ...com]);
          alert('작성이 완료되었습니다')
        })
          
        .catch((error) => {
          console.error('실패:', error);
        });
      } else {
          setError("한 글자 이상 입력하세요")
      }
    }
  
    const openButton = () => {
      setOpen(!isOpen)
    }
  
    const clickHeart = () => {
      //let checkToggle = [...isCheck]
      //checkToggle[i]++;
      //setLike(likeCnt);
  
      //setCheck(!isCheck)
  
      const checks = false;
      setCheck([...isCheck, checks]);
    }
  
    const likeIcon = useRef();
    const numLikes = useRef();
    
    //Like comment
    let toggleLike = false;
    let likes = 0;
  
    const likeComment = () => {
      toggleLike = !toggleLike;
  
      if (toggleLike) {
        likes++;
        //likeIcon.current.style.color = '#559df2'
        document.getElementById("thunmbLike").style.color = "#559df2";
      } else {
        likes--;
        //likeIcon.current.style.color = "gray";
        document.getElementById("thunmbLike").style.color = "black";
      }
      numLikes.current.innerHTML = likes;
    }
  
    const [arrowUp, setArrowUp] = useState(false);
    const [openReply, setOpenReply] = useState(false);
  
    let arrow = <DownOutlined />
  
    const changeArrow = () => {
      setArrowUp(prevState => prevState = !prevState);
    }
  
    if(arrowUp) {
      arrow = <UpOutlined />
    } else {
      arrow = <DownOutlined />
    }
  
    const [isEdit, setEdit] = useState(false);
  
    const changeOpenReply = () => {
      setOpenReply(prevState => prevState = !prevState)
    }
  
    const deleteMessage = () => {
  
    }
  
    
    return (
      <div>
        <main>
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
  
            <section className='wrapper'>
              <div className='left__menu'>
                <ul className='menu__wrap'>
                  <li className='menu__list'>Community</li>
                  <li onClick={boardBack}>Back</li>
                </ul>
              </div>
  
              <div className='log__wrapper'>
  
                <div className='userinfo__subtitle'>
                  <a href='/community/board'>
                    <h1>Board</h1>
                  </a>
                  <p>Write everything</p>
                </div>
  
                <div className='area__container'>
                  <div className='area__l'>
                    <button>목록</button>
                    <button>이전글</button>
                    <button>다음글</button>
                  </div>
                  
                  <div className='area__r'>
                    <button>수정</button>
                  </div>
                </div>
  
                <section className='article__container'>
  
                  <div className='read__title'>
                    <a>자유게시판</a>
                    {/* <strong>title</strong> */}
                    <strong>{data.title}</strong>
                    <div className='info__desc'>
                      <div className='profile__thumb'>
                        {/* 글쓴이이름 */}
                        <a>{data.userId}</a>
                        <div className='content__info'>
                          <span>조회수</span>
                          <span>{view}</span>
                          <span>작성시간</span>
                          <span>
                            댓글
                            {com.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className='read__content'>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className='user__content'>
                              <p>
                                {id}
                                {content}
                                {/* 게시글 내용 */}
                                {data.content}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
  

                      <div className='comment__list'>
                        <div className='comment__view'>
  

                          
                        </div>
                      </div>
  

                    
                  <div className='comment__write'>
                    <div className='comment__write__area'>
  
                      <div className='box__textarea'>
                        {error}
                        <textarea 
                          type='text'
                          name='comment' 
                          onChange={(e) => setComText(e.target.value)} 
                        />
                      </div>
  
                      <div className='comment__write__menu'>
  
                        <div className='area__r'>
                          <span>
                            <span>0</span>
                            <span>/</span>
                            <span>총글자수</span>
                          </span>
                          <button onClick={addComment}>등록</button>
                        </div>
                        
                      </div>


                      <ContextProvider>            
                        <TopCommentsBox />
                        <MessageScroll />
                      </ContextProvider>
                    
                    </div>
                  </div>
  
                </section>
  
              </div>
  
            </section>
  
          </div>
        </main>
      </div>
    )
  }
  

export default ReviewDetail