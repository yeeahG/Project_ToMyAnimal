import React from 'react'
import bannerimg from '../img/dog.png'
import './Banner.css'

const Banner = ( {downButton} ) => {
  return (
    <div>

        <section className="imageovertext__container">

            <div className="home__img">
                <svg className="home__blob" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0" mask-type="alpha">
                        <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                            130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                            97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                            0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                    </mask>
                    <g mask="url(#mask0)">
                        <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                            165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                            129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                            -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"/>
                        {/* <img class="home__blob-img" x='20' y='-35'  xlinkHref={bannerimg}/> */}
                    </g>
                </svg>
                <img src={bannerimg} className='banner__img' ></img>
                {/* 동물 PNG는 云川에 의해 설계되었고,에서 유래되었다. <a href="https://kor.pngtree.com"> Pngtree.com</a> */}
            </div>
            

            <span color="#dbbdf2" className='sliding__txt'>
                To. my animal To. my animal
            </span>
        </section>


        <section className='banner__description'>
          <p>
            We love my animal. This is for my animal. For love for care.<br/>
            I'll text a postcard send to you, Sending all my love to you.
          </p>
          
        </section>

        <section className='yBZdR'>
            <button 
                aria-label="button" className="down__btn" 
                onClick={downButton}
            >

                <svg className='fCMfUw' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L18 18L35 1" stroke="black" strokeWidth="1"/>
                </svg>
                
            </button>
        </section>



    </div>
  )
}

export default Banner