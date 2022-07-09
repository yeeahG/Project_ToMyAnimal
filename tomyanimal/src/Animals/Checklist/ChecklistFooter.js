import React from 'react'
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const ChecklistFooter = ( {id, deleteNote, editNoteClick} ) => {
  return (
    <div>
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
  )
}

export default ChecklistFooter