import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Read = ( {article} ) => {
    // const [article, setArticle] = useState([]);

    // useEffect(() => {
    //     axios({
    //       method: 'get', 
    //       url: 'https://jsonplaceholder.typicode.com/posts',
    //     }).then((article) => {
    //         setArticle(article.data);
    //     })
    //   }, []);
    
  return (
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

            {/*글목록*/}
            {article.map((it) => 
            <tbody>
                <tr className='board__content'>
                    <td>
                        <div>
                            <div>글 id</div>
                            <div>{it.id}</div>
                        </div>
                    </td>
                    <td>
                        <span>
                            <span>
                                <a href='/community/board/1'>{it.title}</a>
                                <a>댓글수</a>
                                <span>사진첨부되면 아이콘으로</span>
                                <span>새글이면 아이콘으로</span>
                            </span>
                        </span>
                    </td>
                    <td>
                        <a>작성자이름</a>
                    </td>
                    <td>
                        <span>작성시간</span>
                    </td>
                    <td>
                        <span>조회수</span>
                    </td>
                </tr>
            </tbody>
            )}


        </table>

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

export default Read