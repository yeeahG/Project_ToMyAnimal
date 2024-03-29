import React, { useRef, useState } from 'react'
import axios from 'axios';

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const LogWrite = () => {
    const [date, setDate] = useState(getStringDate(new Date()));

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const contentRef = useRef();


    const submitHandler = async () => {
        const newPost = {
            title: title,
            content: content,
            categoryId: 1,
            type: "PRIVATE"
        }

        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if(title != "" || content != "") {
            await axios({
                method: 'post', 
                url: process.env.REACT_APP_BACK_BASE_URL + 'api/posts',
                data: newPost,
                headers: { 
                    'Authorization': localStorage.getItem('logintoken'),
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((data) => {
                console.log('성공:', data);
            })
            
            .catch((error) => {
                console.error('실패:', error);
            });
            alert('작성이 완료되었습니다')
            //window.location.reload();
        } else {
            setError("한 글자 이상 입력하세요")
        }

    }

  return (
    <div>
        {error}
        <form>
            <div className='title__container'>
            <span>Title </span>
            <input 
                name="title" 
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <span>Day </span>

            </div>
            <p>
                <textarea 
                name="content" 
                placeholder='What about your animal?'
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </p>
            <p><input type="file" accept="image/*"/></p>
        </form>

        <button className='upload__btn' onClick={submitHandler}>write</button>
    </div>
  )
}

export default LogWrite