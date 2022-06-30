import React, { useState } from 'react'
import ControlMenu from '../Pages/ControlMenu';
import PlaceDetail from './PlaceDetail';
import Reservation from './Reservation/Reservation'
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

const keywordOptionList = [
  {value: "action", name: "행동교정"},
  {value: "seulgaegol", name: "슬개골"},
  {value: "tnr", name: "중성화"},
]


const PlaceList = ( {placeData, isLoading} ) => {
  const [type, setType] = useState('all');
  const [ratings, setRatings] =useState();
  const [keyword, setKeyword] = useState();
  //console.log(placeData[0]);

  const [isOpen, setOpen] = useState(false);

  {/*
  if(isLoading) return (
    <div>
      <div>
        
      </div>
    </div>
  ) */}

  const getProcessedList = () => {
    //시설종류
    const typeCallBack = (item) => {
      if(type === 'hospital') {
        return item.type === '동물병원';
      } else {
        return item.type === '훈련소';
      }
    }
          
    //별점
    const filterCallBack = (item) => {
      switch (ratings) {
        case 'perfect' :
          return parseInt(item.rating) >= 4;
        case 'good' : 
          return parseInt(item.rating) >= 3;
        case 'soso' : 
          return parseInt(item.rating) <= 2;
        default :
          return parseInt(item.rating) >= 0;
      }
    }

    const copyList = JSON.parse(JSON.stringify(placeData));
    const typeList =  type === 'all' ? copyList : copyList.filter((it) => typeCallBack(it))
    const sortedList = typeList.filter((it) => filterCallBack(it));
    return sortedList;
        
    // const copyList = JSON.parse(JSON.stringify(placeData));
    // const sortedList = copyList.filter((it) => filterCallBack(it));
    // return sortedList;
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
      <ControlMenu 
        value={keyword} 
        onChange={setKeyword}
        optionList={keywordOptionList}
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