import React, { useContext, useState } from 'react'
import { MedicalInfoContext } from '../AnimalPage'
import { CloseOutlined } from '@ant-design/icons';

const AnimalMedicalInfoOne = () => {
  const medicalInfoList = useContext(MedicalInfoContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <div>

      <div onClick={()=>setOpen(!isOpen)}>
        {isOpen ? 
          <CloseOutlined />
            : 
          <h3>수술 내역</h3>
        }
      </div>

      {medicalInfoList.map((it) => 
        <>
          {isOpen ?
            // <AnimalMediContent />
            <div className='animal__medicalinfo__container'>
              <p>{it.date}</p>
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

export default AnimalMedicalInfoOne