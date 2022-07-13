import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reservation from './Reservation/Reservation';
import './Places.css'

const PlaceDetail = ( {place} ) => {
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();
  const id = place.id

  const isOpenHandler = (e) => {
    setOpen(!isOpen);
    navigate(`/places/all/${id}`, { 
      state: {
        place: "hello"
      } 
    })
  }

  return (
    <div className='place__detail__container'> 
      <>

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

        <div className='place__detail__reserve'>
          <Link 
            to={`/places/all/${id}`} 
            state={{place: place}}
          >
            예약
          </Link>
        </div>
        
      </>
    </div>
  )
}

export default PlaceDetail