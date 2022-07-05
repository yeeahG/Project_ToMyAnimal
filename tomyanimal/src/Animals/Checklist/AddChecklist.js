import React, { useRef, useState } from 'react'

const AddChecklist = ( {submitHandler} ) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const contentRef = useRef();
    const characterLimit = 200;

    const handleChange = (e)=> {
        if(characterLimit - e.target.value.length >= 0) {
            //setTitle(e.target.value);
            setContent(e.target.value);
        }
    }

    const handleSave = () => {
        submitHandler(title, content);
        //submitHandler(content);
        setTitle('')
        setContent('')
    }


  return (
    <div className='checklist__note add'>
        <input
            name="title" 
            placeholder='title'
            value={title}
            ref={contentRef}
            //onChange={handleChange}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
            rows='8'
            cols='10'
            placeholder='내용을 입력하세요'
            name="content"
            value={content}
            ref={contentRef}
            onChange={handleChange}
            //onChange={(e) => setContent(e.target.value)}
        />
        <div className='checklist__note__footer'>
            <small>{characterLimit - content.length} 글자</small>
            <button 
                className='checklist__save'
                onClick={handleSave}
                //onClick={submitHandler}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default AddChecklist