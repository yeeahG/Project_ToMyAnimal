import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserReservation.css'

const UserReservation = () => {
    const [reservDate, setReservDate] = useState("");
    const [reservType, setReservType] = useState("");
    const [reservAnimal, setReservAnimal] = useState("");

    const loginId = localStorage.getItem('userid');


    useEffect(() => {
        axios({
          method: 'get', 
          url: process.env.REACT_APP_BACK_BASE_URL + `api/my-reservation?memberId=${loginId}`,
          headers: {
            Authorization: localStorage.getItem('logintoken') 
          }
        }).then((reservation) => {
            setReservDate(reservation.data.result.data[0].date) 
            setReservType(reservation.data.result.data[0].type)
            setReservAnimal(reservation.data.result.data[0].animal.name)
        })
      }, []);

  return (
    <div>

        <div className='userinfo__subtitle'>
            <h1>Reservation</h1>
        </div>

        <section className='myreserv__content'>

            <div>
                <img  src={`${process.env.PUBLIC_URL}/public_assets/보건증1.png`}/>
            </div>

            <div>
                <h3>예약일</h3>
                <p>날짜 {reservDate.slice(0,10)} 시간 {reservDate.slice(11, 16)}</p>
                <h3>예약내역</h3>
                <p>{reservType}</p>
                <h3>해당동물</h3>
                <p>{reservAnimal}</p>
            </div>

        </section>
        
    </div>
  )
}

export default UserReservation