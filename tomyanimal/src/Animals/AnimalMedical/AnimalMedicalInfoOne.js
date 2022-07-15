import React, { useContext, useState } from 'react'
import { MedicalInfoContext } from '../AnimalPage'
import { CloseOutlined } from '@ant-design/icons';

const AnimalMedicalInfoOne = (props) => {
  console.log(props);
  const medicalInfoList = useContext(MedicalInfoContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <div>

      <div onClick={()=>setOpen(!isOpen)}>
        {isOpen ? 
          <CloseOutlined />
            : 
          <h3>{props.type} 내역</h3>
        }
      </div>

      {props.replies.map(reply => 
        <>
          {isOpen ?
            // <AnimalMediContent />
            <div className='animal__medicalinfo__container'>
              <p>{reply.date} </p>
              <p>{reply.type} </p>
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