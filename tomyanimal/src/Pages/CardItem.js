import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChecklistContext } from '../Animals/Checklist/CheckList'
import Walk from '../Animals/Checklist/Walk';

const CardItem = ( props, {id, text, src, label} ) => {
    const navigate = useNavigate();

    //const checklist = useContext(ChecklistContext);
    const checklist = useContext(ChecklistContext);
    //console.log(checklist[0].text);

  return (
    <>
        {checklist.map((it) => 
        <li className='cards__item'>
            {/* <Link className='cards__item__link' to={props.path}> */}
                <figure 
                    className='cards__item__pic-wrap' 
                    data-category={it.label}
                    onClick={() => {navigate(`/animal/log/${it.id}`)}}
                >
                    <img
                        className='checklist__img'
                        alt='Checklist Image'
                        // src={props.src}
                        src={it.src}
                    />
                </figure>
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