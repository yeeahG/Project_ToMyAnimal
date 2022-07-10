import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

        <div>
            <h3>예약날짜</h3>
            <p>{reservDate}</p>
            <h3>예약내역</h3>
            <p>{reservType}</p>
            <h3>해당동물</h3>
            <p>{reservAnimal}</p>
        </div>
        
    </div>
  )
}

export default UserReservation