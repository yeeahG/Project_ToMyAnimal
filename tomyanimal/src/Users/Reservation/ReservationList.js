import React from 'react'
import { DeleteFilled, EditOutlined } from '@ant-design/icons';


const ReservationList = ( {id, date, animal, type, deleteReserv} ) => {
  return (
    <div>
        <h3 className='myreserv__date'>{date.slice(5,10)}</h3>
        <p>{animal.name}</p>
        <p>{date.slice(11, 16)}</p>
        <p>{type}</p>

        <div className='note__delete__edit'>
        <button>
          <DeleteFilled 
            style={{fontSize: '18px'}} 
            onClick={() => deleteReserv(id)}
          />
        </button>
        <button>
          <EditOutlined 
            style={{fontSize: '18px'}} 
          />
        </button>
      </div>
    </div>
  )
}

export default ReservationList