import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reservation from './Reservation/Reservation';
import './Places.css'

const PlaceDetail = ( {place} ) => {
  //console.log(place);
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();
  const id = place.id

  const isOpenHandler = () => {
    setOpen(!isOpen);
    navigate(`/places/all/${id}`)
    console.log(id);
  }

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
        onClick={isOpenHandler}
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