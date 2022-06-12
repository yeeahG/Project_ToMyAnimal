import React, { useEffect, useState } from 'react'
import ControlMenu from '../Pages/ControlMenu'
import Header from './Header'
import Map from './Map'
import { placeData } from './placeData'
import PlaceList from './PlaceList'
import './Places.css'

const sortOptionList = [
  {value: "hospital", name: "동물병원"},
  {value: "school", name: "훈련소"},
]

const ratingOptionList = [
  {value: "perfect", name: "4.0"},
  {value: "great", name: "3.0"},
  {value: "good", name: "2.0"},
  {value: "not good", name: "1.0"}
]

const Place = () => {
  const [places, setPlaces] = useState('동물병원');

  const [coordinates, setCoordinates] = useState({ lat:0, lng:0});
  const [type, setType] = useState('Hospital');
  const [ratings, setRatings] =useState("");

  const [isLoading, setisLoading] = useState(true);

  /*Tab menu*/
  const [activeIndex, setActiveIndex]=useState(0);

  const tabClickHandler=(index)=>{
    setActiveIndex(index);
  };

  const tabContArr=[
    {
      tabTitle:(
        <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>전체 </li>
      ),
      tabCont:(
        <div><PlaceList placeData={placeData} isLoading={isLoading} /></div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> 서울</li>
      ),
      tabCont:(
        <div> 서울지역 </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>대구</li>
      ),
      tabCont:(
        <div> 대구지역 </div>
      )
    }
  ];

  //console.log(placeData);

  useEffect(() => {
    // placeData((data) => {
    //   setPlaces(data);
    // })
    setPlaces();
  }, )
  //console.log(places[0].title);

  // const [productInfos, setProductInfos] = useState([]);
  // const location = useLocation();

  // useEffect(() => {
  //   fetch(`${api.fetchAccommList}${location.search}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       setProductInfos(res.message);
  //     });
  // }, [location]);


  return (
    <div className='place__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Header</h1>
          <div className='header__detail'>
            <p>details</p>
          </div>
        </div>
      </div>
        
      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>
        
      <div className='map__container'>
        <Map />
      </div>

      {/* <Header 
        setType={setType} setRatings={setRatings} setCoordinates={setCoordinates}
      /> */}
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

      <div className='place__content'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>지역들</li>
            {tabContArr.map((section, index)=>{
              return section.tabTitle
            })}

          </ul>
        </div>

        <div className='content__wrapper'>
          <div className='place__form'>
            {tabContArr[activeIndex].tabCont}
          </div>

          {/*<div className='info__details'>

            <div className='details__description'>
              <h1>이름</h1>
               {places[0].title}
              {/* <p>주소</p> */}
              {/* {places[0].addr} */}
              {/* {places?.map(elm => {
                elm.title
                elm.addr
              })}

            </div>

            {/* <div className='stack'>
              <button className='details__btn' aria-expanded="false">
                <span>리뷰</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14.255" height="14.255">
                  <path fill='none' stroke="currentcolor" strokeWidth="1.5" d="M7.129 0v14.255M0 7.129h14.255"></path>
                </svg>
              </button>
              <div className='details__panel'>
                <p>세부내용
                </p>
              </div>
            </div> 

          </div>*/}

          

        </div>
        



      </div>


    </div>
  )
}

export default Place