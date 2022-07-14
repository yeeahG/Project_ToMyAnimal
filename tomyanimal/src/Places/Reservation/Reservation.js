import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import User from '../../Users/User';
import axios from 'axios';
import ControlMenu from '../../Pages/ControlMenu';
import './Reservation.css'

const timeOptionList = [
    {value: "T9:00", name: "9:00"},
    {value: "T10:00", name: "10:00"},
    {value: "T11:00", name: "11:00"},
    {value: "T13:00", name: "13:00"},
    {value: "T14:00", name: "14:00"},
    {value: "T15:00", name: "15:00"},
    {value: "T16:00", name: "16:00"},
]

const Reservation = (props) => {
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [reservTime, setReservTime] = useState('')
    const [optionMsg, setOptionMsg] = useState('')

    const [error, setError] = useState("");

    const [fontColor, setFontColor] = useState({color: "#559df2"})
    const [backColor, setBackColor] = useState({backgroundColor: "white"})

    const {id} = useParams();

    const navigate = useNavigate();
    
    const checklistBack = () => {
        navigate(-1);
    }

    const isLogin = localStorage.getItem('logintoken')

    const location = useLocation();

    const typeClickHandler = () => {
        setFontColor(fontColor === '#559df2' ? 'white' : '#559df2')
        setBackColor(backColor === 'white' ? '#559df2' : 'white');
    }

    const reservData = date + reservTime;
    
    const submitHandler = async () => {
        const newReserv = {
          date: reservData, 
        }

        console.log(newReserv);
    
        if(type != "" && date != "") {
          await axios({
            method: 'post', 
            url: process.env.REACT_APP_BACK_BASE_URL + `api/reservation?date=${reservData}&type=${type}&animalId=1`,
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
            window.location.reload();
        } else {
          setError("필수 항목을 모두 입력해주세요")
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
                    <a href='/places/all'>
                        <h1>Reservation</h1>
                    </a>
                    <p>예약을 진행하세요. 예약내역은 user 메뉴에서 확인하실 수 있습니다.</p>
                </div>
                <section className='reserve__container'>
                    <div className='reserve__info'>
                        <div className='reserve__place'>
                            <h3>시설정보</h3>
                            <p>{id}</p>
                            <p className='reserve__info__keyword'>{location.state.place.keyword}</p>
                            <p>{location.state.place.title}</p>
                            <p>{location.state.place.addr}</p>
                        </div>
                    </div>
                    <section className='place__reserve__form'>
                        <div className='place__reserve__container'>
                            <div>
                                <p className='reserve__error'>{error}</p>
                                <h3>예약 종류 *</h3>
                                <div className='reserve__keyword' id='reserve__keyword'>
                                    <button value="수술" onClick={typeClickHandler} style={{color: fontColor, backgroundColor: backColor}}>수술</button>
                                    <p value="수술" onClick={() => setType("SURGERY")}>수술</p>
                                    <p value="접종" onClick={() => setType("VACCINE")}>접종</p>
                                    <p value="진료" onClick={() => setType("CHECK")}>진료</p>
                                    <p value="문의" onClick={() => setType("ASK")}>문의</p>
                                </div>
                            </div>
                            <div>
                                <h3>예약날짜 *</h3>
                                <div className='reserve__datetime'>
                                    <input type="date" onChange={(e) => setDate(e.target.value)}/>
                                    <ControlMenu 
                                        value={reservTime} 
                                        onChange={setReservTime}
                                        optionList={timeOptionList}
                                    />
                                </div>
                            </div>
                            <div className='reserve__msg'>
                                <h3>추가사항(선택)</h3>
                                <input type="text" onChange={(e) => setOptionMsg(e.target.value)} />
                            </div>
                        
                        </div>
                    </section>

                </section>

                <div className='welcome reserve__btn'>
                    <button className='welcome__btn' onClick={submitHandler}>
                        ADD
                    </button>
                    <button className='welcome__btn' onClick={checklistBack}>
                        Cancel
                    </button>
                </div>

            </div>
            : 
            <User />
            }

        </div>

    </div>
  )
}

export default Reservation