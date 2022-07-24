import React from 'react'
import { Link } from 'react-router-dom'
import './Places.css'

const PlaceDetail = ( {place} ) => {
  const id = place.id

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