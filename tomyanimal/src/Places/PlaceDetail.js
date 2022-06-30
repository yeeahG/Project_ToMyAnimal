import React, { useState } from 'react'
import './Places.css'
import Reservation from './Reservation/Reservation';

const PlaceDetail = ( {place} ) => {
  //console.log(place);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='place__detail__container'> 

      <div className='place__title'>
        <h2>{place.title}</h2>
        <p>{place.type}</p>
      </div>
      <p className='place__keyword'>{place.keyword}</p>
      <div className='place__addr'>
        {place.addr}
      </div>
      <div className='place__detail__review'>
        <p>Review</p>
        <p>{place.rating}</p>
      </div>

      <div 
        className='place__detail__reserve' 
        onClick={()=>setOpen(!isOpen)}
      >
        <p>예약</p>
      </div>

      {isOpen ? 
        <Reservation place={place} />
        : 
        "" 
      }

    </div>
  )
}

export default PlaceDetail