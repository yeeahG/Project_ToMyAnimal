import React, { useState } from 'react'
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import EditReservation from './EditReservation';
import { authInstance } from '../../utils/api';
import ControlMenu from '../../Pages/ControlMenu';


const ReservationList = ( {id, date, animal, type, deleteReserv} ) => {
    const [values, setValues] = useState({
        id: id,
        reservDate: date.slice(0, 10),
        reservTime: date.slice(11, 16),
        animal: animal.name, 
        type: type,
    });
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        //date: "",
        //time: "",
        reservTime: "",
        reservDate: "",
        animal: "",
        type: "",
    });


    const editBtnClick = (e) => {
        e.preventDefault();
        setEditContactId(id);
      
        const formValues = {
            //date: date,
            reservDate: date.slice(0,10),
            reservTime: date.slice(11, 16),
            animal: animal.name, 
            type: type,
        }
        setEditFormData(formValues)
    }

    
        const handleCancelClick = () => {
            setEditContactId(null);
        }


    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;
        
        const newFormData = { ...editFormData };
        console.log(newFormData);
        newFormData[fieldName]=fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async (e, reservTime) => {
        e.preventDefault();
        const date = editFormData.reservDate + reservTime;
        const type = editFormData.type
        
        if(type != "" && date != "") {
            try {
                const data = await authInstance.put(`api/reservation/${id}?date=${date}&type=${type}`);
                setValues(data.data);
                setEditContactId(null); 
                alert('예약 수정이 완료되었습니다')
                //window.location.reload();
            } catch(error) {
                console.error('실패:', error);
            }
        } else {
          alert("필수 항목을 모두 선택해주세요")
        }
    }



  return (
    <form onSubmit={handleEditFormSubmit} method="put">

        { (editContactId === values.id) ?
            <>
                <EditReservation 
                    values={values}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                /> 
            </>
            
        :
            <>
                <h3 className='myreserv__date'>{date.slice(0,10)}</h3>
                <p>{animal.name}</p>
                <p>{date.slice(11, 16)}</p>
                <p>{type}</p>

                <div className='note__delete__edit'>
                    <button>
                    <DeleteFilled 
                        style={{fontSize: '18px'}} 
                        onClick={() => deleteReserv(id)}
                    />
                    </button>
                    <button>
                    <EditOutlined 
                        style={{fontSize: '18px'}} 
                        onClick={editBtnClick}
                    />
                    </button>
                </div>
            </>
        }


    </form>
  )
}

export default ReservationList