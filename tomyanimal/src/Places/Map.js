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

    // //marker data 파일에서 가져옴
    // markerdata.forEach((el) => {
    // //마커를 생성
    //     const marker = new kakao.maps.Marker({
    //     //마커가 표시 될 지도
    //     map: map,
    //     //마커가 표시 될 위치
    //     position: new kakao.maps.LatLng(el.lat, el.lng),
    //     });
    //     // 마커에 표시할 인포윈도우를 생성합니다
    //     var infowindow = new kakao.maps.InfoWindow({
    //         content: el.price, // 인포윈도우에 표시할 내용
    //     });
    // })
  }, []);

  return (
    <div className='map__container'>
        <div id="map" style={{width:'70vw', height:"50vh"}}></div>
    </div>
  )
}

export default Map