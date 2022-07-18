import React from 'react'
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const ChecklistFooter = ( {id, modifiedAt, deleteNote, editNoteClick} ) => {
  return (
    <div className='note__footer__container'>

      <small>{modifiedAt.slice(0,10)}</small>
      <div className='note__delete__edit'>
        <button>
          <DeleteFilled 
            style={{fontSize: '18px'}} 
            onClick={() => deleteNote(id)}
          />
        </button>
        <button>
          <EditOutlined 
            style={{fontSize: '18px'}} 
            onClick={editNoteClick}
          />
        </button>
      </div>

    </div>
  )
}

export default ChecklistFooter