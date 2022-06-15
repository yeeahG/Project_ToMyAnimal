import React, { useState } from 'react'
import ControlMenu from '../Pages/ControlMenu';
import PlaceDetail from './PlaceDetail';
import './Places.css'

const sortOptionList = [
  {value: "all", name: "모두"},
  {value: "hospital", name: "동물병원"},
  {value: "school", name: "훈련소"},
]

const ratingOptionList = [
  {value: "perfect", name: "4.0이상"},
  {value: "good", name: "3.0이상"},
  {value: "soso", name: "2.0이하"},
]


const PlaceList = ( {placeData, isLoading} ) => {
  const [type, setType] = useState('all');
  const [ratings, setRatings] =useState(4);
  //console.log(placeData[0]);

  {/*
  if(isLoading) return (
    <div>
      <div>
        
      </div>
    </div>
  ) */}

  const getProcessedList = () => {
    
    // if(type === 'hospital') {
      //   return 
      // }
      
    //별점
    const filterCallBack = (item) => {
      switch (ratings) {
        case 'perfect' :
          return parseInt(item.rating) >= 4;
        case 'good' : 
          return parseInt(item.rating) >= 3;
        default :
          return parseInt(item.rating) <= 2;
      }
    }
        
    const copyList = JSON.parse(JSON.stringify(placeData));
    const sortedList = copyList.filter((it) => filterCallBack(it));
    return sortedList;

  }

  return (
  <div>
    <div className='control__menu'>
      <ControlMenu 
        value={type} 
        onChange={setType}
        optionList={sortOptionList}
      />
      <ControlMenu 
        value={ratings} 
        onChange={setRatings}
        optionList={ratingOptionList}
      />
    </div>

    <div className='place__detail__list'>
      {/* {placeData && placeData.map((place, i) =>  */}
      {getProcessedList().map((place, i) => 
        <PlaceDetail place={place} key={i} {...place}/>
      )}
    </div>
  </div>
  )
}

export default PlaceList