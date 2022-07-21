import React, { useState } from 'react'
import ChecklistFooter from './ChecklistFooter';
import EditCheklist from './EditCheklist';
import ShowChecklist from './ShowChecklist';
import { authInstance } from '../../utils/api';

const ReadChecklist = ( {id, title, content, modifiedAt, deleteNote} ) => {
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
      e.preventDefault();
      setEditContactId(id);
    
      const formValues = {
        title: title,
        content: content,
      }
      setEditFormData(formValues);
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


      try {
        const response = await authInstance.put(`api/board/${editContactId}`, editedContact);
        setNotes(response.data);
        setEditContactId(null); 
        alert('수정이 완료되었습니다')
        window.location.reload();
      } catch(error) {
        console.log(error.message);
      }
    }
  

  return (
    <form className='checklist__note' onSubmit={handleEditFormSubmit} method="put">

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
            <ChecklistFooter 
              id={id}
              modifiedAt={modifiedAt}
              deleteNote={deleteNote}
              editNoteClick={editNoteClick}
            />
          </>
        )}

    </form>
  )
}

export default ReadChecklist