import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import User from '../../Users/User';

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
            <div className='place__wrapper'>
                <div className='place__form'>

                    <div className='place__detail__list'>
                        <p>{id}</p>
                        <p>예약</p>
                    </div>

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