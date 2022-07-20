import React, { useEffect, useState } from 'react'
import AnimalAccount from './AnimalAccount/AnimalAccount';
import UserAccount from './UserAccount';
import Signout from './Signout'
import UserReservation from './Reservation/UserReservation';
import './UserHome.css'
import { authInstance } from '../utils/api';
import UserLogin from './UserLogin';

const UserHome = () => {
  const [activeIndex, setActiveIndex]=useState(0);

  const tabClickHandler=(index)=>{
    setActiveIndex(index);
  };

  const tabContArr=[
    {
      tabTitle:(
        <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}> Overview </li>
      ),
      tabCont:(
        <div> <UserAccount /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> My animal </li>
      ),
      tabCont:(
        <div> <AnimalAccount /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}> My reservation </li>
      ),
      tabCont:(
        <div> <UserReservation/> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===3 ? "is-active" : ""} onClick={()=>tabClickHandler(3)}> Sign out</li>
      ),
      tabCont:(
        <div><Signout /></div>
      )
    }
  ];

  const [userLogin, setUserLogin] = useState();
  const loginId = localStorage.getItem('userid');

  useEffect(() => {
    try {
      async function callAPI() {
        const response = await authInstance.get(`api/members/${loginId}`);
        setUserLogin(response.data.success);
      } callAPI();
    } catch(error) {
      console.log(error);
    }
  }, [])

  return (
    <div className='userinfo__container'>
      
      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>My account</h1>
          <div className='header__detail'>
            <p>
              회원정보 및 반려동물 정보
            </p>
          </div>
        </div>
      </div>

      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>


      <section className='wrapper'>

        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>My Account</li>
            {tabContArr.map((section, index)=>{
              return section.tabTitle
            })}
          </ul>
        </div>


      { (userLogin === 'false') ? 
        <div className='account__content'>
          <UserLogin />
        </div>
      :
        <div className='account__content'>
          <div>{tabContArr[activeIndex].tabCont}</div>
        </div>
      }

      </section>



    </div>
  )
}

export default UserHome