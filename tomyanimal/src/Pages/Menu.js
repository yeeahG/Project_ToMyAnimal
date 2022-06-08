import React, { useState } from 'react'
import './Menu.css'

const Menu = () => {
    const [isOpen, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }

    const bgChange = () => {
        document.getElementById("menu-wrapper").style.background = "#FF6458";
    }

  return (
    <div>
        <header className='nav__form'>

            <div className='nav__container'>
                <button id='menu-btn' onClick={()=>toggleMenu()}>menu</button>
                <button id='menu-btn'>
                    <a  href='/'>To.</a>
                </button>
                <button id='login-btn'>
                    <a href='/user'>User</a>
                </button>
            </div>

        </header>

        <section className={isOpen ? "show-menu" : "hide-menu"}>
            <div className="menu__wrapper jTgRTL" id="menu-wrapper" color="#CDBFEC">
                
                <button onClick={()=>toggleMenu()} className="menu__close__btn" >
                    <svg viewBox="0 0 32 30"fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2.53033" y1="1.46967" x2="30.5303" y2="29.4697" stroke="black" strokeWidth="1.5"></line>
                        <line x1="1.46967" y1="29.4697" x2="29.4697" y2="1.46967" stroke="black" strokeWidth="1.5"></line>
                    </svg>
                </button>

                <div className="menu__list" id="menu-list" onMouseOver={()=>bgChange()}>
                    <div>
                        <a className="menu__name" id="home" href="/">Home</a>
                    </div>
                    <div>
                        <a className="menu__name" id="animal" href="/animal">My animal</a>
                    </div>
                    <div>
                        <a className="menu__name" id="furniture" href="/">What</a>
                    </div>
                    <div>
                        <a className="menu__name" id="places" href="/places">Where is</a>
                    </div>
                    <div>
                        <a className="menu__name" id="about" href="/">About</a>
                    </div>
                </div>

            </div>
        </section>

        <div className="Container__StyledContainer heASqm">
            <div className="space__styledSpace djzxvY"></div>
            <div className="Border__StyeldBorder klPBwl"></div>
        </div>

    </div>
  )
}

export default Menu