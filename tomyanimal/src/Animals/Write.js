import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './AnimalHome'

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
}

const Write = () => {
  const navigate = useNavigate();
  console.log(getStringDate(new Date()));
  const [date, setDate] = useState(getStringDate(new Date()));

  //일기저장
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  //내용을 안적으면 저장이 안되게 하는 기능을 위해
  const contentRef = useRef();
  

  //App.js에서 작성한 onCreate는 DiaryDispatchContext에 저장되어 있어서 호출
  const {onCreate, onEdit} = useContext(DiaryDispatchContext);

  const submitHandler = (e) => {
    // e.preventDefault();
    // const title = e.target.title.value;
    // const date = e.target.date.value;
    // const content = e.target.content.value;

    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, title);
    navigate('/animal')
    alert("작성이 완료되었습니다. ")
  }
  
  return (
    <div>
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
          <input 
            type="date" name='date' value={date} 
            onChange={(e) => setDate(e.target.value)}
          />
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

    {/* <input type="submit" value="upload" className='upload__btn' /> */}
    <button className='upload__btn'onClick={submitHandler} >write</button>
  </div>
  )
}

export default Write