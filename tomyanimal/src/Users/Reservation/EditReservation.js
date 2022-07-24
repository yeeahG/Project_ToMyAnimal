import React, { useState } from 'react'
import ControlMenu from '../../Pages/ControlMenu'
import { authInstance } from '../../utils/api'

const timeOptionList = [
    {value: "T9:00", name: "9:00"},
    {value: "T10:00", name: "10:00"},
    {value: "T11:00", name: "11:00"},
    {value: "T13:00", name: "13:00"},
    {value: "T14:00", name: "14:00"},
    {value: "T15:00", name: "15:00"},
    {value: "T16:00", name: "16:00"},
]

const typeList = [
    {value: "SURGERY", name: "수술"},
    {value: "INOCULATION", name: "접종"},
    {value: "DIAGNOSIS", name: "진료"},
    {value: "INQUIRY", name: "문의"},
]

const EditReservation = ( {values, editFormData, handleEditFormChange, handleCancelClick, handleEditFormSubmit} ) => {
    const [date, setDate] = useState('')
    const [reservTime, setReservTime] = useState('')
    const [type, setType] = useState('')

    const id = values.id
    const reservData = date + reservTime;

    
    const submitHandler = async (e) => {
        e.preventDefault();

        const value = {
            date: reservData,
            type: type
        }

        console.log(value);
        if(type != "" && date != "") {
            try {
                const data = await authInstance.put(`api/reservation/${id}?date=${reservData}&type=${type}`);
                console.log('성공:', data);
                alert('예약 수정이 완료되었습니다')
                //window.location.reload();
            } catch(error) {
                console.error('실패:', error);
            }
        } else {
          alert("필수 항목을 모두 선택해주세요")
        }
    }

    const dateHandlier = (e) => {
        setDate(e.target.value)
        handleEditFormChange(e)
    }

  return (
    <div>
        <h3>
            <input 
                type="date" 
                name="date" 
                value={editFormData.reservDate}
                onChange={dateHandlier}
            />
        </h3>
        <p>{editFormData.animal}</p>
        <ControlMenu 
            value={reservTime} 
            onChange={setReservTime}
            optionList={timeOptionList}
        />
        <div className='reserve__keyword' id='reserve__keyword' >
            <p value="수술" onClick={() => setType("수술")}>수술</p>
            <p value="접종" onClick={() => setType("접종")}>접종</p>
            <p value="진료" onClick={() => setType("진료")}>진료</p>
            <p value="문의" onClick={() => setType("문의")}>문의</p>
        </div>

    <div className='checklist__note__footer'>
        <button className='checklist__save' onClick={submitHandler}>Save</button>
        <button onClick={handleCancelClick}>취소</button>
    </div>

    </div>
  )
}

export default EditReservation