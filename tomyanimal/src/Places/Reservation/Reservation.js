import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import User from '../../Users/User';
import axios from 'axios';
import { placeData } from '../placeData'
import './Reservation.css'
import ControlMenu from '../../Pages/ControlMenu';

const timeOptionList = [
    {value: " 9:00", name: "9:00"},
    {value: " 10:00", name: "10:00"},
    {value: " 11:00", name: "11:00"},
    {value: " 13:00", name: "13:00"},
    {value: " 14:00", name: "14:00"},
    {value: " 15:00", name: "15:00"},
    {value: " 16:00", name: "16:00"},
]

const Reservation = () => {
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [reservTime, setReservTime] = useState('')

    const [error, setError] = useState("");
    const [place, setPlace] = useState("");
    console.log(placeData[0].id);

    const {id} = useParams();

    const navigate = useNavigate();
    
    const checklistBack = () => {
        navigate(-1);
    }

    const isLogin = localStorage.getItem('logintoken')


    /*
    const location = useLocation();
    const job = location.state.place;
    console.log(job);
    */

    const navigateState = useNavigate().state;
    const [placeDummy, setPlaceDummy] = useState(navigateState && navigateState.place)
    console.log(placeDummy);

    //for(let i=0; placeData.length; i++) {
    //    setPlace(placeData[i]=id);
    //}


    const submitHandler = async () => {
        const newReserv = {
          type: type,
          date: date + reservTime, 
          animalId: 1,
          //hospitalId: id,
        }

        console.log(newReserv);
    
        if(type != "" || date != "") {
          await axios({
            method: 'post', 
            url: `http://localhost:8084/api/reservationdate=${date}&type=${type}&animalId=1`,
            data: newReserv,
            headers: { 
              'Authorization': localStorage.getItem('logintoken'),
              'Content-Type': 'application/json',
            }
          })
          .then((data) => {
            console.log('성공:', data);
          })
          
          .catch((error) => {
            console.error('실패:', error);
          });
          alert('작성이 완료되었습니다')
          //window.location.reload();
        } else {
          setError("한 글자 이상 입력하세요")
        }
    }

  return (
    <div className='place__container'>

        <div className='header'>
            <div className='space'></div>
            <div className='header__wrapper'>
                <h1 className='header__content'>Where is</h1>
                <div className='header__detail'>
                    <p>전국에 있는 병원과 훈련소를 찾아보세요</p>
                </div>
            </div>
        </div>

        <div className='space'></div>
        <div className='line'></div>
        <div className='space'></div>

        {/*{placeData.id}*/}

        <div className='place__content'>

            <div className='left__menu'>
                <ul className='menu__wrap'>
                    <li className='menu__list'>지역들</li>
                    <li onClick={checklistBack}>Back</li>
                </ul>
            </div>

            {isLogin ?
            <div className='reserve__wrapper'>

                <div className='reserve__subtitle'>
                    <a href='/'>
                        <h1>Reservation</h1>
                    </a>
                    <p>예약을 진행하세요</p>
                </div>

                <section className='reserve__container'>
                    <div className='reserve__info'>
                        <div className='reserve__place'>
                            <h3>시설정보</h3>
                            {id}
                            {place}
                        </div>
                    </div>
                    <div className='place__reserve__form'>
                        <p>id = {id}</p>
                        <div>
                            예약 종류
                            <div className='reserve__keyword'>
                                {error}
                                <p value="수술" onClick={() => setType("수술")}>수술</p>
                                <p value="접종" onClick={() => setType("접종")}>접종</p>
                                <p value="진료" onClick={() => setType("진료")}>진료</p>
                                <p value="문의" onClick={() => setType("문의")}>문의</p>
                            </div>
                        </div>
                        <div>
                            <p>예약날짜</p>
                            <input type="date" onChange={(e) => setDate(e.target.value)}/>
                            <ControlMenu 
                                value={reservTime} 
                                onChange={setReservTime}
                                optionList={timeOptionList}
                            />
                        </div>
                        <div>
                            <p>추가사항(선택)</p>
                            <input />
                        </div>

                    </div>

                    <div className='welcome'>
                        <button className='welcome__btn' onClick={submitHandler}>
                            ADD
                        </button>
                        <button className='welcome__btn' onClick={checklistBack}>
                            Cancel
                        </button>
                    </div>
                </section>

            </div>
            : 
            <User />
            }

        </div>

    </div>
  )
}

export default Reservation