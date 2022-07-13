import React, { useEffect, useRef, useState } from 'react'
import './Menu.css'

const Menu = () => {
    const [isOpen, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }

    const bgChange = () => {
        document.getElementById("menu-wrapper").style.background = "#FF6458";
    }

    const bgTurnBack = () => {
        document.getElementById("menu-wrapper").style.background = "#fe81b9";
    }

    function useOutsideClose(ref) {
        useEffect(() => {

          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setMenu(isOpen => !isOpen)
            }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef);


  return (
    <div className='nav__wrapper'>
        <header className='nav__form' >

            <div className='nav__container'>
                <button id='menu-btn' onClick={()=>toggleMenu()}>menu</button>
                <button id='title-btn'>
                    <a href='/'>To.</a>
                </button>
                <button id='login-btn'>
                    <a href='/user'>user</a>
                </button>
            </div>

            <div className="Container__StyledContainer heASqm">
                <div className="Border__StyeldBorder klPBwl"></div>
            </div>
        </header>

        {/* <section className={isOpen ? "show-menu" : "hide-menu"}> */}
        {isOpen ?
        <section className= "show-menu" ref={wrapperRef}>
            <div className="menu__wrapper jTgRTL" id="menu-wrapper" color="#CDBFEC" >
                
                <button onClick={()=>toggleMenu()} className="menu__close__btn" >
                    <svg viewBox="0 0 32 30"fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2.53033" y1="1.46967" x2="30.5303" y2="29.4697" stroke="black" strokeWidth="1.5"></line>
                        <line x1="1.46967" y1="29.4697" x2="29.4697" y2="1.46967" stroke="black" strokeWidth="1.5"></line>
                    </svg>
                </button>

                <div 
                    className="menu__list" id="menu-list" 
                    onMouseOver={()=>bgChange()} onMouseOut={() => bgTurnBack()}
                >
                    <div>
                        <a className="menu__name" id="home" href="/">Home</a>
                    </div>
                    <div>
                        <a className="menu__name" id="animal" href="/animal">My animal</a>
                    </div>
                    <div>
                        <a className="menu__name" id="furniture" href="/community/board">What</a>
                    </div>
                    <div>
                        <a className="menu__name" id="places" href="/places/all">Where is</a>
                    </div>
                    <div>
                        <a className="menu__name" id="about" href="/">About</a>
                    </div>
                </div>

            </div>
        </section>
        :
        null
    }

    </div>
  )
}

export default Menu