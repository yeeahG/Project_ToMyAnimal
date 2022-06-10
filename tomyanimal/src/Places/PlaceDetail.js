import React from 'react'

const PlaceDetail = ( {place} ) => {
    console.log(place);
  return (
    <div>
        {place.title}
    </div>
  )
}

export default PlaceDetail