import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Read = ( {id, title} ) => {
    const navigate = useNavigate();
    // const [article, setArticle] = useState([]);

    // useEffect(() => {
    //     axios({
    //       method: 'get', 
    //       url: 'https://jsonplaceholder.typicode.com/posts',
    //     }).then((article) => {
    //         setArticle(article.data);
    //     })
    //   }, []);
    const goDetail = () => {
        navigate(`/community/board/${id}`)
    }
    
  return (
    <tbody>
        <tr className='board__content'>
            <td>
                <div>
                    <div>{id}</div>
                </div>
            </td>
            <td>
                <span>
                    <span>
                        {/* <a href='/community/board/{id}'>{it.title}</a> */}
                        <a onClick={goDetail}>{title}</a>
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

  )
}

export default Read