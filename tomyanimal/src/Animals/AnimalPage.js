import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './AnimalInfo.css'

const AnimalPage = () => {
  const [petName, setPetname] = useState();
  const [petBTD, setPetBTD] = useState();
  const [petKg, setPetKg] = useState();
  const [petimg, setPetimg] = useState();
  const [petprofile, setPetprofile] = useState();

  const userId = localStorage.getItem('userid');


  // useEffect(() => {
  //   axios({
  //     method: 'get', 
  //     url: 'http://localhost:8084/api/pets/1',
  //     headers: { Authorization: localStorage.getItem('logintoken')}
  //   }).then((response) => {
  //     setPetname(response.data.result.data['petName'])
  //     setPetBTD(response.data.result.data['birthday'])
  //     setPetKg(response.data.result.data['weight'])
  //   })
  //}, []);
  
  useEffect(() => {
    axios.get(`http://localhost:8084/api/my-pet?memberId=${userId}`, {
      headers: {
        Authorization: localStorage.getItem('logintoken') 
      }
    }).then((response) => {
      console.log(response);
      // 내가 데리고 있는 동물이 여러마리 일때는 data[0] 이곳을
      // i를 length만큼 돌려서 가져와야될것으로 보임
      setPetname(response.data.result.data[0].petName);
      setPetBTD(response.data.result.data[0].birthday);
      setPetKg(response.data.result.data[0].weight);
      setPetimg(response.data.result.data[0].images[0].uniqueName);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  //console.log(petimg[0].uniqueName);
  //const imageurl = petimg[0].uniqueName
  console.log(petimg);
  //localhost:8084/image/uniqueName

  return (
    <div className='content__wrapper'>
      <div className='animal__imageform'>
        <svg className="animal__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0" mask-type="alpha">
            <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                  130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                  97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                  0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
          </mask>
          <g mask="url(#mask0)">
            <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                  165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                  129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                  -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
            <img className="animal__blob__img" x='20' y='-35' src={petimg}/>
          </g>
        </svg>
        <img className="animal__blob__img" src={'http://localhost:8084/image/' + petimg}/>

      </div>


      <div className='info__details'>

        <div className='details__description'>
          <h1>I'm {petName}</h1>
          <p>{petBTD} years old</p>
          <p>{petKg}kg</p>
        </div>

        <div className='stack'>
          <button className='details__btn' aria-expanded="false">
            <span>접종내역</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14.255" height="14.255">
              <path fill='none' stroke="currentcolor" strokeWidth="1.5" d="M7.129 0v14.255M0 7.129h14.255"></path>
            </svg>
          </button>
          <div className='details__panel'>
            <p>세부내용 aria-expanded="true"로 변경되면서 이 부분이 열림
                d="M0 7.128h14.255"로 바꿔주기
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimalPage