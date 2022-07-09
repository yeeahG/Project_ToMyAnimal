import React from 'react'
import { DeleteFilled } from '@ant-design/icons';

const ChecklistFooter = ( {id, deleteNote} ) => {
  return (
    <div>
        <button>
          <DeleteFilled 
            style={{fontSize: '18px'}} 
            onClick={() => deleteNote(id)}
          />
        </button>
    </div>
  )
}

export default ChecklistFooter