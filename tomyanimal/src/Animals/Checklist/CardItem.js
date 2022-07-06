import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChecklistContext } from './CheckList'
import './CardItem.css'

const CardItem = ( props, {id, text, src, label} ) => {
    const navigate = useNavigate();

    const checklist = useContext(ChecklistContext);
    //console.log(checklist);

  return (
    <>
        {checklist.map((it) => 
        <li className='cards__item'>
            {/* <Link className='cards__item__link' to={props.path}> */}
                <div 
                    className='cards__item__pic__wrap' 
                    data-category={it.label}
                    onClick={() => {navigate(`/animal/log/${it.id}`)}}
                >
                    <img
                        className='checklist__img'
                        alt='Checklist Image'
                        // src={props.src}
                        src={it.src}
                        //src=`../Checklist/img/imageex.png`
                    />
                </div>
                <div className='cards__item__info'>
                    {/* <h4 className='cards__item__text'>{props.text}</h4> */}
                    <h4 className='cards__item__text'>{it.text}</h4>
                </div>

            {/* </Link> */}
        </li>
            )}
    </>
  )
}

export default CardItem