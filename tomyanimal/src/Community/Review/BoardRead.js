import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BoardRead = ( {props, id, title, content, createdAt, member} ) => {
    const navigate = useNavigate();
    // const [article, setArticle] = useState([]);
    const [comment, setComment] = useState([])
    const [view, setView] = useState(0);
    const userName = localStorage.getItem('usename');
    

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
                    <Link
                        className='board__title'
                        to={`/community/review/${id}`}
                        state={{
                            title: title, 
                            content: content,
                            createdAt: createdAt,
                            member: member,
                            comment: comment
                        }}
                    >
                        {title}
                    </Link>

                    <a>{comment.length}</a>
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