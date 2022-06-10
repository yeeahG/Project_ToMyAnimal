import React from 'react'
import PlaceDetail from './PlaceDetail';

const PlaceList = ( {placeData, isLoading} ) => {
  //console.log(placeData[0]);

  {/*
  if(isLoading) return (
    <div>
      <div>
        
      </div>
    </div>
  ) */}

  return (
    <div>
      PlaceList
      {placeData && placeData.map((place, i) => <PlaceDetail place={place} key={i}/>
      )}
      
    </div>
  )
}

export default PlaceList