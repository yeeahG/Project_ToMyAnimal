import React from 'react'
import './Footer.css'

const Footer = () => {
    const onEmailSend = (e) => {
        e.preventDefault();
        console.log("email 전송");
    }

  return (
    <div>
        <footer className='footer__container'>
            <div className='footer__inner'>
                <a className='title__btn'>
                    <p>TO.&nbsp;</p>
                    <p>My&nbsp;
                    Animal</p>
                </a>
                <p className='footer__text'>
                    반려동물 케어 및 기록 사이트 To. my animal입니다. 이용해주셔서 감사합니다. 
                    궁금하신 사항은 아래의 <strong>About</strong>이나 <strong><a href='https://github.com/yeeahG/Project_ToMyAnimal'>Github</a></strong>를 방문해주세요.
                </p>

                <div className='footer__form'>
                    <h6>Let's Keep in Touch</h6>
                    <form className='input__form'>
                        <input 
                                className='text__input' 
                                placeholder='Email' aria-label="Email"
                            />
                        <button className='submit__btn' onClick={onEmailSend}>
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
                    </ul>
                    <ul className='stack'>
                        <li>
                            <a href='/about'>Contact</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </footer>
    </div>
  )
}

export default Footer