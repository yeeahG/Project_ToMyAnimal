import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Read = ( {props, id, title, body, userId} ) => {
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
            <td style={{width:'5%'}}>
                <div>
                    <div>{id}</div>
                </div>
            </td>
            <td style={{width:'80%'}}>
                <span>
                    <span>
                        {/* <a href='/community/board/{id}'>{it.title}</a> */}
                        <span
                            onClick={goDetail} 
                            title={title} body={body} 
                            className='board__title'
                        >{title}</span>
                        <a>댓글수</a>
                        <span>사진</span>
                        <span>New</span>
                    </span>
                </span>
            </td>
            <td style={{width:'5%'}}>
                {/* <a>작성자이름</a> */}
                <a>{userId}</a>
            </td>
            <td style={{width:'5%'}}>
                <span>작성시간</span>
            </td>
            <td style={{width:'5%'}}>
                <span>조회수</span>
            </td>
        </tr>
    </tbody>

  )
}

export default Read