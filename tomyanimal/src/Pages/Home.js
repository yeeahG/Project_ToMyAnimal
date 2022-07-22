import React, { useRef, useState } from 'react'
import Banner from './Banner'
import withdog from '../img/withdog.png'
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis dui augue. Donec sed feugiat leo. Proin et lacus ac orci vestibulum condimentum. Praesent sit amet venenatis felis. Ut in diam eget lectus mattis convallis vitae sed orci. Nunc scelerisque velit a mi mollis, quis vestibulum nulla luctus. </p>
          </div>
          <div className='part__two'>
            <p>In leo odio, posuere non pulvinar vel, consectetur vitae augue. Praesent quis nibh facilisis, venenatis ex quis, posuere eros.  Pellentesque eu malesuada enim.</p>
          </div>
          <div className='part__three'>
            <p>In pretium, elit in commodo posuere, libero lectus varius lacus, sit amet sodales magna quam vitae turpis. Duis hendrerit, tellus ut pharetra hendrerit, arcu massa tincidunt purus, eu fermentum nisi quam vitae dolor.</p>
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
                <h3 className='slide__subtitle'>Recommend</h3>
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
          <h2>Check up everyday</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla interdum nibh orci, id pharetra metus pellentesque quis. 
          </p>
          <a href='/animal' className='main__btn'>Check your Animal</a>
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