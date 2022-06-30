import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import User from '../../Users/User';
import './Reservation.css'

const Reservation = ( {place, placeData} ) => {
    console.log(place);
    const {id} = useParams();

    const navigate = useNavigate();
    
    const checklistBack = () => {
        navigate(-1);
    }

    const isLogin = localStorage.getItem('logintoken')

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
                        </div>
                    </div>
                    <div className='place__reserve__form'>
                        <p>id = {id}</p>
                        <div>
                            예약 종류
                            <div className='reserve__keyword'>
                                <p>수술</p>
                                <p>접종</p>
                                <p>진료</p>
                                <p>문의</p>
                            </div>
                        </div>
                        <div>
                            <p>예약날짜</p>
                            <input type="date" />
                        </div>
                        <div>
                            <p>예약을 진행하세요</p>
                            <input />
                        </div>
                        <div>
                            <p>예약을 진행하세요</p>
                            <input />
                        </div>

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