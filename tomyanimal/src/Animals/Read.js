import React, { Fragment, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import dummy from './data.json'
import EditLog from './components/EditLog';
import ReadLog from './components/ReadLog';
import './AnimalInfo.css'

const Read = ( {diaryList, id,  title, content, date} ) => {
    const [logs, setLogs] = useState({
      id: id,
      title: title,
      content: content, 
      date: date
    });

    const [edited, setEdited] = useState(false);
    const [editContactId, setEditContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({
      title: "", 
      content: "",
    });

    const navigate = useNavigate();

    const goEdit = () => {
      setEdited(true);
    }
    

    const handleEditFormSubmit = (e) => {
      e.preventDefault();
  
      const editedContact = {
        id: editContactId,
        title: editFormData.title,
        content: editFormData.content
      }
  
      setLogs(editedContact);
      setEditContactId(null);
    }


    const handleEditFormChange = (e) => {
      e.preventDefault();
      
      const fieldName = e.target.getAttribute("name")
      const fieldValue = e.target.value;
      
      const newFormData = { ...editFormData };
      newFormData[fieldName]=fieldValue;
      
      setEditFormData(newFormData);
    };


    const handleEditClick = (e) => {
      e.preventDefault();
      setEditContactId(id);
  
      const formValues = {
        title: title,
        content: content,
      }
  
      setEditFormData(formValues);
    };

    const handleCancelClick = () => {
      setEditContactId(null);
    }

  return (
    <div>

      <form onSubmit={handleEditFormSubmit} className='log__list__container'>
        <Fragment>
        {editContactId === logs.id ? (
        <li>
          <EditLog 
            logs={logs}
            key={id} title={title} content={content} date={date}
            editFormData={editFormData}
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
          />
        </li>
        )
          :
        (
        <li>
          <ReadLog 
            logs={logs} handleEditClick={handleEditClick}
            key={id} title={title} content={content} date={date}
          />
        </li>
        )}
        </Fragment>
      </form>

    </div>
  )
}

export default Read