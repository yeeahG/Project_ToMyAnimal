import React from 'react'

const EditLog = ( {logs, editFormData, handleEditFormChange, handleCancelClick} ) => {

  return (
    <div>
      <div className='log__content'>
        <h3>Day {logs.id}</h3>
        <p>{logs.date}</p>
        <button type='submit'>Save</button>
        <button type='button' onClick={handleCancelClick}>Cancel</button>
      </div>
      <p>
        <input 
          type='text' required='required' 
          placeholder='title' 
          name='title'
          value={editFormData.title}
          onChange={handleEditFormChange}
        />
      </p>
      <p>
        <textarea 
          type='text' required='required' 
          placeholder='content' 
          name='content'
          value={editFormData.content}
          onChange={handleEditFormChange}
        />
      </p>
  </div>
  )
}

export default EditLog