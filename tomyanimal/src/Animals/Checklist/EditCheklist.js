import React, { useRef, useState } from 'react'

const EditCheklist = ( {notes, editFormData, handleCancelClick, handleEditFormChange} ) => {
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

  return (
    <div className='checklist__text'>
        <input
            name="title" 
            placeholder='title'
            value={editFormData.title}
            required='required' 
            onChange={handleEditFormChange}
        />
        <textarea 
            required='required' 
            rows='8'
            cols='10'
            placeholder='내용을 입력하세요'
            name="content"
            value={editFormData.content}
            ref={contentRef}
            onChange={handleEditFormChange}
        />
        <div className='checklist__note__footer'>
            <small>{characterLimit - editFormData.content.length} 글자</small>
            <div className='checklist__note__btn'>
                <button className='checklist__save'>
                    Save
                </button>
                <button 
                    className='checklist__save'
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>

  )
}

export default EditCheklist