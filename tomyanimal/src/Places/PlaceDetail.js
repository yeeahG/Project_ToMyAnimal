import React from 'react'
import './Places.css'

const PlaceDetail = ( {place} ) => {
  //console.log(place);
  return (
    <div className='place__detail__container'> 
      <div className='place__title'>
        <h2>{place.title}</h2>
        <p>{place.type}</p>
      </div>
      {/* <p>Keyword</p> */}
      <p className='place__keyword'>{place.keyword}</p>
      <div className='place__addr'>
        {place.addr}
      </div>
      <div className='place__detail__review'>
        <p>Review</p>
        <p>{place.rating}</p>
      </div>
    </div>
  )
}

export default PlaceDetail