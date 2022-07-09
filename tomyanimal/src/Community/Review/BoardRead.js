import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BoardRead = ( {props, id, title, content, createdAt, member} ) => {
    const navigate = useNavigate();
    // const [article, setArticle] = useState([]);
    const [comment, setComment] = useState([])
    const [view, setView] = useState(0);
    const userName = localStorage.getItem('usename')

    useEffect(() => {
        axios({
            method: 'get', 
            url: `https://jsonplaceholder.typicode.com/posts/${id}/comments/`
        })
        .then((response)=> {
          setComment(response.data);
        })
    }, []);
    
    const goDetail = () => {
        navigate(`/community/review/${id}`, { 
            state: {
                name: comment.name,
                id: comment.id,
                postId: comment.postId,
                view: view
            }})
        setView(+1)
    }
    
    
  return (
    <tbody>
        <tr className='board__content'>
            <td style={{width:'5%'}}>
                <div>
                    <div>{id}</div>
                </div>
            </td>
            <td style={{width:'75%', textAlign: 'left'}}>
                <span className='title__span'>
                    <span
                        onClick={goDetail} 
                        title={title} content={content} 
                        co={comment}
                        className='board__title'
                    >{title}</span>
                    {/*<a>댓글수</a>*/}
                    <a>{comment.length}</a>
                    {/* <span>New</span> */}
                </span>
            </td>
            <td style={{width:'7.5%'}}>
                {/* <a>작성자이름</a> */}
                <p>{member.name}</p>
            </td>
            <td style={{width:'7.5%'}}>
                <span>{createdAt}</span>
            </td>
            <td style={{width:'5%'}}>
                <span>{view}</span>
            </td>
        </tr>
    </tbody>

  )
}


export default BoardRead