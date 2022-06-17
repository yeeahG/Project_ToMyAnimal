import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = ( {title, body} ) => {
  const {id} = useParams();
  console.log(id);

  const [data, setData] = useState({})
  //useContext로 저장해야 id로 내용 불러오기가능

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
    .then((response)=> {
      setData(response.data);
    })
  }, []);
  
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
                    <span>조회수</span>
                    <span>작성시간</span>
                    <span>
                      댓글
                      <a>0</a>
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
                        <div className='profile__tbumb'>
                          <img />
                        </div>
                        <div className='comment__info'>
                          <div>
                            {/* 닉네임 클릭시 사용자의 정보 open */}
                            <a>사용자1</a>
                            <span>날짜</span>
                          </div>
                          <div className='post__box'>
                            <span>댓글내용</span>
                            <img/>
                          </div>
                          <div>
                            <button>답글</button>
                          </div>
                        </div>
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
                    <textarea></textarea>
                  </div>

                  <div className='comment__write__menu'>
                    <div className='area__l'>
                      <input type='file'></input>
                    </div>
                    <div className='area__r'>
                      <span>
                        <span>0</span>
                        <span>/</span>
                        <span>총글자수</span>
                      </span>
                      <button>등록</button>
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