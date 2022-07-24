import React, { useRef, useState } from 'react'
import Banner from './Banner'
import HomeChat from './HomeChat'
import './Home.css'


const Home = () => {
  const downButton = () => {
    return window.scrollTo(0,600)
  }

  const upButton = () => {
    return window.scrollTo(0,0)
  }

  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
    scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  return (
    <div>
      
      <Banner downButton={downButton}/>

      <section className='desc__container'>
        <div className='desc__title'>
          <div>care &</div>
          <div>give love </div>
        </div>

        <div className='desc__content'>
          <div className='part__one'>
            <p>
              To.my animal을 방문해주셔서 감사합니다. 나의 반려동물에게 사랑을 선물하는 사이트 입니다. 
              저희의 사이트는 반려동물과 함께사는 가족을 위한 사이트입니다. 
              가장 필요한 것을 담으려고 했으며 사용자의 관점에서 가장 사용하기 쉬운 방법으로 개발하도록 노력했습니다. 
            </p>
          </div>
          <div className='part__two'>
            <p>
              반려동물을 위한 페이지는 동물의 정보, 의료정보, 사진 그리고 동물에 관한 기록을 언제든지 만들 수 있도록 계획했습니다.
              동물정보가 입력되어야 프로필 및 의료정보를 확인할 수 있습니다. 
            </p>
          </div>
          <div className='part__three'>
            <p>
              사용자를 위한 페이지는 사용자의 이름(닉네임), 이메일, 연락처만 있으면 회원가입이 가능여 쉽고 빠르게 가입할 수 있도록 꼐획했습니다. 
              회원가입이 이루어져야 Animal page, Reservation page, Community page를 이용할 수 있습니다. 
            </p>
          </div>
        </div>
      </section>

      <section className='slide__service'>

        <div className='slide__title'>
          <p>our services</p>
        </div>
        
        <div className='slide__feature'>
          <div 
            className='slide__container' 
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onMouseMove={onDragMove}
            >
            <div className='slide__content'>
              <div className='img__box odd'>
                {/* <img src={dogcat} /> */}
              </div>
              <p>01</p>
              <div>
                <h3 className='slide__subtitle'>About my animal</h3>
              </div>
            </div>
            <div className='slide__content'>
              <p>02</p>
              <h3 >Check</h3>
              <div className='img__box even'>
                {/* <img src={medicine} /> */}
              </div>
            </div>
            <div className='slide__content'>
              <div className='img__box sec__odd'>
                <img />
              </div>
              <p>03</p>
              <div>
                <h3 className='slide__subtitle'>Reservation</h3>
              </div>
            </div>
            <div className='slide__content'>
              <p>04</p>
              <h3>Together</h3>
              <div className='img__box sec__even'>
                <img />
              </div>
            </div>
          </div>

        </div>
      </section>
      

      <main className='main__container'>
        <div className='main__text'>
          <h2>Find our services</h2>
          <p>
            챗봇을 통해서 이용방법 및 원하는 서비스를 알아보세요. 
          </p>
          <a href='/animal' className='main__btn'>Check my Animal</a>
        </div>
        <section className='main__chatbot'>
          <HomeChat />
        </section>
      </main>


      <section className='yBZdR'>
        <button aria-label="button" className="up_btn" onClick={upButton}>
          <svg viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="49" cy="49" r="48.25" fill="white" stroke="black" strokeWidth="1.5"></circle>
            <line x1="49.75" y1="35.75" x2="49.75" y2="76.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></line>
            <path d="M27 57L49 35L71 57" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <line x1="20.75" y1="31.25" x2="77.25" y2="31.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></line>
          </svg>
        </button>
      </section>

    </div>
  )
}

export default Home