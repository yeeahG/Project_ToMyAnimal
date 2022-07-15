import React, { useContext, useState } from 'react'
import { MedicalInfoContext } from '../AnimalPage'

const AnimalMediContent = () => {
    const medicalInfoList = useContext(MedicalInfoContext);

  return (
    <div>
        {medicalInfoList.map((it) => 
        <>
            {isOpen ?
                <div className='animal__medicalinfo__container'>
                    <p>2022 06 29</p>
                    <p>{it.text} 접종</p>
                </div>
             :
            ""
           }
             
        </>
        )}
    </div>
  )
}

export default AnimalMediContent