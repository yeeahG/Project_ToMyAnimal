import React from 'react'

const ReadLog = ( {logs, handleEditClick, getProcessedList} ) => {
  const finalDate = new Date(logs.date);
  //console.log(finalDate);

  return (
    <div>
      {/* {getProcessedList().map((logs) => ( */}
        <>
        <div className='log__content'>
          
            <h3>Day {logs.id}</h3>
            <p>{logs.date}</p>
            <button onClick={handleEditClick}>edit</button>
        </div>
        <p>{logs.title}</p>
        <p>{logs.content}</p></>
      {/* ))} */}
    </div>
  )
}

export default ReadLog