import React from 'react'
import { useParams } from 'react-router-dom';

const Reservation = ( {place} ) => {
    console.log(place);
    const {id} = useParams();
    
  return (
    <div>
        {id}
    </div>
  )
}

export default Reservation