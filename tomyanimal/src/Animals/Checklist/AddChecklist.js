import React, { useRef, useState } from 'react'

const AddChecklist = ( {submitHandler} ) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const contentRef = useRef();
    const characterLimit = 200;

    const handleChange = (e)=> {
        if(characterLimit - e.target.value.length >= 0) {
            setContent(e.target.value);
        }
    }

    const handleSave = () => {
        submitHandler(title, content);

        if(title != "" && content != "") {
            setTitle('')
            setContent('')
        } else {
            alert("한 글자 이상 입력하세요")
        }
    }


  return (
    <div className='checklist__note add'>
        <input
            name="title" 
            placeholder='title'
            value={title}
            ref={contentRef}
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
        />
        <div className='checklist__note__footer'>
            <small>{characterLimit - content.length} 글자</small>
            <button 
                className='checklist__save'
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default AddChecklist