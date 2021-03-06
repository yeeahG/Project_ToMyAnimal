/*global kakao */ 
import React, { useEffect } from 'react'
import { placeData } from './placeData'
import './Map.css'

const Map = () => {

  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new window.kakao.maps.LatLng(37, 127),
      level: 13,
    };

    const map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");

    // 지도에 확대 축소 컨트롤을 생성한다
		var zoomControl = new kakao.maps.ZoomControl();

		// 지도의 우측에 확대 축소 컨트롤을 추가한다
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

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



    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    
    //foreach loop
    placeData.forEach((el) => {
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(el.addr, function(result, status) {
      
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });
          
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">' +el.title+'</div>'
          });
          infowindow.open(map, marker);
          
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      })
      
    });
    


  }, []);

  return (
    <div className='map__container'>
        <div id="map" style={{height:"50vh"}}></div>
    </div>
  )
}

export default Map