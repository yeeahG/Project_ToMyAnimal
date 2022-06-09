/*global kakao */ 
import React, { useEffect } from 'react'
import './Map.css'

const Map = () => {

  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 9,
    };

    const map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
  }, []);

  return (
    <div className='map__container'>
        <div id="map" style={{width:'70vw', height:"50vh"}}></div>
    </div>
  )
}

export default Map