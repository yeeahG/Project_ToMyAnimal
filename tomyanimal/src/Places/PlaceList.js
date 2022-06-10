import React from 'react'

const PlaceList = ( {places} ) => {
    console.log(places);

  return (
    <div>
        PlaceList
        {places ?.map((title, addr) => (
            <div>
                {title}
                {addr}
            </div>
        ))}

    </div>
  )
}

export default PlaceList