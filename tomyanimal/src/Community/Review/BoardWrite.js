import React, { useState } from 'react'
import axios from 'axios';

const BoardWrite = ( {openButton, addPost} ) => {
  const [isOpen, setOpen] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSave = () => {
    addPost(newTitle, newContent);
    setNewTitle('')
    setNewContent('')
  }

  return (
    <div className='write__box'>

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

      <button onClick={handleSave}>
        Add
      </button>
      <button onClick={openButton}>
        {isOpen ? "Close" : ""}
      </button>

      
    </div>
  )
}

export default BoardWrite