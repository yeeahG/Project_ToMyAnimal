import React from 'react'

const ReadLog = ( {logs, handleEditClick} ) => {
  const finalDate = new Date(logs.date);
  
  return (
    <div>
      <>
        <div className='log__content'>
          <h3>Day {logs.id}</h3>
          <p>{logs.date}</p>
            <button onClick={handleEditClick}>edit</button>
        </div>
        <p>{logs.title}</p>
        <p>{logs.content}</p>
      </>
    </div>
  )
}

export default ReadLog