import React from 'react'

const PlaceDetail = ( {place} ) => {
    console.log(place);
  return (
    <div>
        <div className='place__title'>
            {place.title}
        </div>
        <div className='place__addr'>
            {place.addr}
        </div>
    </div>
  )
}

export default PlaceDetail