import React from 'react'
import Banner from './Banner'
import mainimage from '../img/home.png'
import  { ReactComponent as Homeimg } from '../img/Home2.svg'
import './Home.css'

const Home = () => {
  const upButton = () => {
    return window.scrollTo(0,0)
  }

  return (
    <div>
      
      <Banner />

      <main className='main__contaiiner'>
        <div className='main__text'>
          <h2>Check up everyday</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla interdum nibh orci, id pharetra metus pellentesque quis. 
          </p>
          <a href='/animal' className='main__btn'>Check your Animal</a>
        </div>
        <div className='main__image'>
          <span className='box__image'>
            <span></span>
            {/* <img src={mainimage} /> */}
            <Homeimg />
          </span>
        </div>
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