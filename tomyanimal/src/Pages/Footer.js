import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='footer__container'>
            <div className='footer__inner'>
                <a className='title__btn'>
                    <p>TO.My Animal</p>
                </a>
                <p className='footer__text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas rhoncus dolor non porttitor. Vestibulum vitae interdum nisl, ut tempor quam. Cras sed sollicitudin ligula, vitae dictum leo. Vestibulum consequat facilisis turpis vitae fringilla. Integer semper ullamcorper malesuada. Vestibulum eget est ligula. Nam gravida lacus non urna feugiat, quis egestas lorem vulputate.
                </p>

                <div className='footer__form'>
                    <h6>Let's Keep in Touch</h6>
                    <p>Sign-up for 10% off your first online order</p>
                    <form className='input__form'>
                        <div className='text__input'>
                            <input placeholder='Email' aria-label="Email"/>
                        </div>
                        <button className='submit__btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.899" height="14">
                                <g fill="none" stroke="currentcolor" strokeWidth="1.5">
                                    <path d="M1.044 7.879h21.105V-.004"></path>
                                    <path d="M7.404.977 1.043 7.885l6.361 6.268"></path>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>

                <nav className='footer__link'>
                    <ul className='stack'>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                    </ul>
                    <ul className='stack'>
                    <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </footer>
    </div>
  )
}

export default Footer