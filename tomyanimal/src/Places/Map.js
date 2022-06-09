/*global kakao */ 
import React, { useEffect } from 'react'

const Map = () => {
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 9,
    };

    let map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
  }, []);

  return (
    <div>
        <div id="map" style={{width:'500px', height:"400px"}}></div>
        Map
    </div>
  )
}

export default Map