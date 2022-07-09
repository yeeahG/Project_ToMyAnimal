import React, { useState } from 'react'
import axios from 'axios';
import ChecklistFooter from './ChecklistFooter';
import EditCheklist from './EditCheklist';
import ShowChecklist from './ShowChecklist';

const ReadChecklist = ( {id, title, content, deleteNote} ) => {
    const [notes, setNotes] = useState({
        id: id,
        title: title,
        content: content, 
    });

    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({
      title: "", 
      content: "",
    });

    const editNoteClick = (e) => {
        console.log("Edit!");
        e.preventDefault();
        setEditContactId(id);
    
        const formValues = {
          title: title,
          content: content,
        }
        setEditFormData(formValues);
        console.log(editFormData);
    }

    const handleCancelClick = () => {
        setEditContactId(null);
    }

    const characterLimit = 200;

    const handleEditFormChange = (e) => {
        e.preventDefault();
        
        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;
        
        const newFormData = { ...editFormData };
        newFormData[fieldName]=fieldValue;

        if(characterLimit - e.target.value.length >= 0) {
            setEditFormData(newFormData);
        }
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
    
        const editedContact = {
          title: editFormData.title,
          content: editFormData.content,
          type: "PRIVATE",
          categoryId: id
        }
    
        axios.put(`http://localhost:8084/api/board/${editContactId}`, editedContact,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('logintoken'),
          }
        })
        .then((response) => {
          console.log(response.data);
          setNotes(response.data);
          setEditContactId(null); 
          alert('수정이 완료되었습니다')
          window.location.reload();
        })
         .catch((error) => {
          console.log(error.message);
        });
    
    }
  

  return (
    <div className='checklist__note'>

        <form onSubmit={handleEditFormSubmit} method="put">

            {editContactId === notes.id ? (
                <EditCheklist 
                    notes={notes}
                    editFormData={editFormData}
                    handleCancelClick={handleCancelClick}
                    handleEditFormChange={handleEditFormChange}
                />
            )
            :
            (
                <>
                <ShowChecklist notes={notes} />

                <div className='checklist__note__footer'>
                    <small>2022/07.01</small>
                    <ChecklistFooter 
                        id={id}
                        deleteNote={deleteNote}
                    />
                    <button id={id} onClick={editNoteClick}>edit</button>
                </div>
                </>
            )}

        </form>
    </div>
  )
}

export default ReadChecklist