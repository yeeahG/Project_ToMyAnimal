import React, { Fragment, useState } from 'react'
import axios from 'axios';
import LogEdit from './LogEdit';
import LogRead from './LogRead';

const LogGet = ( {id,  title, content} ) => {
  const [logs, setLogs] = useState({
    id: id,
    title: title,
    content: content, 
  });

  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "", 
    content: "",
  });

  const loginId = localStorage.getItem('userid');


  const handleEditClick = (e) => {
    e.preventDefault();
    setEditContactId(id);

    const formValues = {
      title: title,
      content: content,
    }

    setEditFormData(formValues);
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();
    
    const fieldName = e.target.getAttribute("name")
    const fieldValue = e.target.value;
    
    const newFormData = { ...editFormData };
    newFormData[fieldName]=fieldValue;
    
    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    const editedContact = {
      title: editFormData.title,
      content: editFormData.content
    }

    axios.put(process.env.REACT_APP_BACK_BASE_URL + 'api/board/' + editContactId, editedContact,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': localStorage.getItem('logintoken'),
      }
    })
    .then((response) => {
      //setLogs(editedContact);
      setLogs(response.data);
      setEditContactId(null); 
      alert('수정이 완료되었습니다')
      window.location.reload();
    })
     .catch((error) => {
      console.log(error.message);
    });

  }


  return (
    <div>
      <form onSubmit={handleEditFormSubmit} method="put">

      <Fragment>

      {editContactId === logs.id ? (
        <li>
          <LogEdit 
            logs={logs}
            editFormData={editFormData}
            key={id} title={title} content={content}
            handleEditFormChange={handleEditFormChange}
            handleCancelClick={handleCancelClick}
          />
        </li>
      )
      :
      (
        <li>
          <LogRead 
            logs={logs} 
            key={id} title={title} content={content}
            handleEditClick={handleEditClick}
          />
        </li>
      )}
      </Fragment>
      </form>
    </div>
  )
}

export default LogGet