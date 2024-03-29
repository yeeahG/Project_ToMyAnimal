import React, { useEffect, useState } from 'react';
import './UserReservation.css'
import ReservationList from './ReservationList';
import { authInstance } from '../../utils/api';

const UserReservation = () => {
  const [reservList, setReservList] = useState([]);
  const [reservData, setReservData] = useState("");
  const [revervId, setReservId] = useState([]);

  const loginId = localStorage.getItem('userid');
  const myreservlist = [];
  const myreservIdlist = [];

  useEffect(() => {
    async function callAPI() {
      const reservation = await authInstance.get(`api/my-reservation?memberId=${loginId}`);
      setReservData(reservation.data)

      for (let i=0; i<reservation.data.result.data.length; i++) {
        myreservlist.push(reservation.data.result.data[i])
        myreservIdlist.push(reservation.data.result.data[i].id)
      } 
        setReservList(myreservlist)
        setReservId(myreservIdlist)
    } callAPI();
  }, []);

  const deleteReserv = async (id) => {
    const newReserv = reservList.filter((it) => it.revervId != revervId)
    setReservList(newReserv);

    try {
      await authInstance.delete(`api/reservation/${id}`)
      alert("삭제가 완료되었습니다")
      window.location.reload();
    } catch (error) {
      console.error('실패:', error);
    }
  }

  return (
    <div className='myreserv__main__container'>

      <div className='myreserv__subtitle'>

        <h3>Reservation<br/>
        List</h3>
        <div className='myreserv__background'>
          {/*사진 들어올 예정*/}
          {/* <img  src={`${process.env.PUBLIC_URL}/public_assets/보건증1.png`}/> */}
        </div>
        
      </div>


      <section className='myreserv__container'>

        <div></div>

        <div className='myreserv__content'>
          
          <div className='myreserv__data'>

            { (reservData.success === true) ?
              <>
                {reservList.map((it) => (
                  <ReservationList 
                    key={it.id}
                    {...it}
                    deleteReserv={deleteReserv}
                  />
                ))}
              </>
            :
            <h3>예약 내역이 없습니다</h3>
            }
          </div> 

        </div>

      </section>
        
    </div>
  )
}

export default UserReservation