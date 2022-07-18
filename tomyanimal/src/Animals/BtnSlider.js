import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'


const BtnSlider = ( {direction, moveSlide} ) => {
  return (
    <div 
        onClick={moveSlide}
        className={direction === "next" ? "btn__slide next" : "btn__slide prev"}
    >
        {direction === "next" ?
        <RightOutlined 
            style={{fontSize: '25px', cursor: 'pointer'}} />
            :
        <LeftOutlined 
            style={{fontSize: '25px', cursor: 'pointer'}} />
        }
    </div>
  )
}

export default BtnSlider