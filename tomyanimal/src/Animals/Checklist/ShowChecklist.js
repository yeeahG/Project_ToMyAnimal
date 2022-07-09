import React from 'react'

const ShowChecklist = ( {notes} ) => {
    console.log(notes);

  return (
    <div className='checklist__text'>
      {notes.id}
      <h3>{notes.title}</h3>
      <p>{notes.content}</p> 
    </div>
  )
}

export default ShowChecklist