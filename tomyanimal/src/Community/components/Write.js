import React, { useState } from 'react'

const Write = ( {openButton} ) => {
    const [isOpen, setOpen] = useState(true);

  return (
    <div className='write__box'>
        <div className='write__head'>
            <input placeholder='Write title' type="text"/>
        </div>

        <div className='write__container'>
            <textarea className='board__write' />
        </div>

        <button onClick={openButton}>
            {isOpen ? "Close" : ""}
        </button>

        <button onClick={openButton}>
            Add
        </button>

    </div>
  )
}

export default Write