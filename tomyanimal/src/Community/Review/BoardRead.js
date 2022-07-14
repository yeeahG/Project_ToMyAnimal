import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BoardRead = ( {props, id, title, content, modifiedAt, member} ) => {
    const navigate = useNavigate();
    const [comment, setComment] = useState([])
    const [view, setView] = useState(0);
    
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
                            modifiedAt: modifiedAt,
                            member: member,
                            comment: comment,
                            view: view
                        }}
                    >
                        {title}
                    </Link>

                    <a>{comment.length}</a>
                </span>
            </td>
            <td style={{width:'7.5%'}}>
                <p>{member.name}</p>
            </td>
            <td style={{width:'7.5%'}}>
                <span>{modifiedAt.slice(0, 10)}</span>
            </td>
            <td style={{width:'5%'}}>
                <span>{view}</span>
            </td>
        </tr>
    </tbody>

  )
}


export default BoardRead