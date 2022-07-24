import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChecklistContext } from './CheckList'
import './CardItem.css'

const CardItem = ( props, {id, text, src, label} ) => {
    const navigate = useNavigate();

    const checklist = useContext(ChecklistContext);

  return (
    <>
        {checklist.map((it) => 
            <li className='cards__item'>
                <div 
                    className='cards__item__pic__wrap' 
                    data-category={it.label}
                    onClick={() => {navigate(`/animal/log/${it.id}`)}}
                >
                    <img
                        className='checklist__img'
                        alt='Checklist Image'
                        src={`${process.env.PUBLIC_URL}/public_assets/${it.src}.png`}
                    />
                </div>
                <div className='cards__item__info'>
                    <h4 className='cards__item__text'>{it.text}</h4>
                </div>

            </li>
        )}
    </>
  )
}

export default CardItem