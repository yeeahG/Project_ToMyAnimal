import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Article = ( {title, body} ) => {
  const {id} = useParams();
  //console.log(id);
  const location = useLocation();
  const name = location.state.name;
  const bid = location.state.id;
  const postId = location.state.postId;
  const view = location.state.view;


  const [data, setData] = useState({})
  const [com, setCom] = useState([])
  const [comtext, setComText] = useState("")
  const [error, setError] = useState("");
  //useContext로 저장해야 id로 내용 불러오기가능
  const userName = localStorage.getItem('usename')

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
    .then((response)=> {
      setData(response.data);
    })
  }, []);

  
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments/`)
    .then((response)=> {
      setCom(response.data);
      //console.log(com);
    })
  }, []);


  const addComment = async () => {
    const newComment = {
      body: comtext,
      userId: localStorage.getItem('usename'),
      date: new Date()
    }
    console.log(newComment);

    if(comtext != "" ) {
      await axios.post('https://jsonplaceholder.typicode.com/posts/${id}/comments/', newComment)
      .then((data) => {
        console.log('성공:', data);
        setCom([newComment, ...com]);
      })
        
      .catch((error) => {
        console.error('실패:', error);
      });
      alert('작성이 완료되었습니다')
    } else {
        setError("한 글자 이상 입력하세요")
    }
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
                <li>a</li>
                <li>a</li>
              </ul>
            </div>

            <div className='log__wrapper'>

              <div className='userinfo__subtitle'>
                <a href='/community/board'>
                  <h1>Board</h1>
                </a>
                <p>Write everything</p>
              </div>

              <div>
                <div className='area__l'>
                  <button>목록</button>
                  <button>이전글</button>
                  <button>다음글</button>
                </div>
                <div className='area__r'>
                  <button>수정</button>
                </div>
              </div>

              <div className='read__title'>
                <a>자유게시판</a>
                {/* <strong>title</strong> */}
                <strong>{data.title}</strong>
                <div className='info__desc'>
                  <div className='profile__thumb'>
                    <img />
                  </div>
                  <div className='content__info'>
                    {/* <a>글쓴이이름</a> */}
                    <a>{data.userId}</a>
                    <a>{postId}</a>
                    <span>조회수</span>
                    <span>{view}</span>
                    <span>작성시간</span>
                    <span>
                      댓글
                      {com.length}
                      {/*<a>{comment.length}</a>*/}
                    </span>
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
                            {/* 게시글 내용 */}
                            {data.body}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                {/* isOpen으로 구현하기 */}
                <button>댓글</button>
              </div>

              <div className='comment__list'>
                <div className='comment__view'>
                  <ul>
                    <li>

                      <div className='comment__section'>
                        {com.map((it) => 
                        <div className='comment__info'>
                          <div className='comment__user'>
                            {/*사용자*/}
                            <span>{it.id}</span>
                            <span>{userName}</span>
                            <span>날짜</span>
                          </div>
                          <div className='comment__reply'>
                            <div className='post__box'>
                              {/*<span>댓글내용</span>*/}
                              <span>{it.body}</span>
                              <img/>
                            </div>
                            <div className='reply__reply'>
                              <button>답글</button>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>

                    </li>
                  </ul>
                </div>
              </div>


              <div className='comment__paging'>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

              <div className='comment__write'>
                <div className='comment__write__area'>

                  <div className='box__textarea'>
                    {error}
                    <textarea 
                      type='text'
                      name='comment' 
                      onChange={(e) => setComText(e.target.value)} />
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
                </div>

              </div>
                
            </div>


          </section>

        </div>
      </main>
    </div>
  )
}

export default Article