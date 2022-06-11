import React, { useEffect, useState } from 'react'
import Header from './Header'
import Map from './Map'
import { placeData } from './placeData'
import PlaceList from './PlaceList'
import './Places.css'

const Place = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({ lat:0, lng:0});
  const [type, setType] = useState('Hospital');
  const [ratings, setRatings] =useState("");

  const [isLoading, setisLoading] = useState(true);

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

      <div className='place__content'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>지역들</li>
            <div className='collection'>
              <a className='collection__content'>전체</a>
            </div>
            <div className='collection'>
              <a className='collection__content' href='/places/seoul'>Seoul</a>
            </div>
            <div className='collection'>
              <a className='collection__content' href='/places/daegu'>Daegu</a>
            </div>
          </ul>
        </div>

        <div className='content__wrapper'>
          <div className='place__form'>
            
            <Header 
              setType={setType} setRatings={setRatings} setCoordinates={setCoordinates}
            />

            <PlaceList placeData={placeData} isLoading={isLoading} />
          </div>

          <div className='info__details'>

            <div className='details__description'>
              <h1>이름</h1>
              {/* {places[0].title} */}
              <p>주소</p>
              {/* {places[0].addr} */}
              {/* {places?.map(elm => {
                elm.title
                elm.addr
              })} */}

            </div>

            <div className='stack'>
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

          </div>

        </div>

        



      </div>


    </div>
  )
}

export default Place