import React, { useState } from 'react'
import axios from 'axios';

const Write = ( {openButton} ) => {
    const [isOpen, setOpen] = useState(true);
    const [post, setPost] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [error, setError] = useState("");


    const addPost = async () => {
        const newPost = {
            title: newTitle,
            body: newContent,
            userId: localStorage.getItem('usename'),
            date: new Date()
        }
        console.log(newPost);

        if(newTitle != "" || newContent != "") {
            await axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
            .then((data) => {
                console.log('성공:', data);
                setPost(data);
            })
            
            .catch((error) => {
                console.error('실패:', error);
            });
            alert('작성이 완료되었습니다')
        } else {
            setError("한 글자 이상 입력하세요")
        }
    }
    console.log(post.data);

  return (
    <div className='write__box'>
        {error}
        <div className='write__head'>
            <input 
                placeholder='Write title' 
                type="text"
                name="title"
                onChange={(e) => {setNewTitle(e.target.value)}}
            />
        </div>

        <div className='write__container'>
            <textarea 
                className='board__write'
                type='text'
                name='content'
                onChange={(e) => {setNewContent(e.target.value)}}
            />
        </div>


        <button onClick={addPost}>
            Add
        </button>
        <button onClick={openButton}>
            {isOpen ? "Close" : ""}
        </button>

    </div>
  )
}

export default Write