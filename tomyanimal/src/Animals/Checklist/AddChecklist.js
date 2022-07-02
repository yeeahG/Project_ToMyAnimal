import React from 'react'

const AddChecklist = () => {
  return (
    <div className='checklist__note add'>
        <textarea 
            rows='8'
            cols='10'
            placeholder='내용을 입력하세요'
        />
        <div className='checklist__note__footer'>
            <small>200 글자</small>
            <button className='checklist__save'>Save</button>
        </div>
    </div>
  )
}

export default AddChecklist