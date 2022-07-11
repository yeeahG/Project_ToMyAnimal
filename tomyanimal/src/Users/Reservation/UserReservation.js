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
    <div className='myreserv__main__container'>

      <div className='myreserv__subtitle'>

        <h3>Reservation<br/>
        List</h3>
        <div className='myreserv__background'>
          {/* <img  src={`${process.env.PUBLIC_URL}/public_assets/보건증1.png`}/> */}
        </div>
        
      </div>


      <section className='myreserv__container'>

        <div></div>

        <div className='myreserv__content'>
          <div className='myreserv__data'>
            <h3 className='myreserv__date'>{reservDate.slice(5,10)}</h3>
            <p>{reservAnimal}</p>
            <p>{reservDate.slice(11, 16)}</p>
            <p>{reservType}</p>
          </div>
        </div>

      </section>
        
    </div>
  )
}

export default UserReservation