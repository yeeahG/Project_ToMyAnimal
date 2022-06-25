import React, { Fragment, useState } from 'react'
import LogEdit from './LogEdit';
import LogRead from './LogRead';

const LogGet = ( {id,  title, content} ) => {
  const [logs, setLogs] = useState({
    id: id,
    title: title,
    content: content, 
  });
  console.log(content);

  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "", 
    content: "",
  });


  const handleEditClick = (e, logs) => {
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



  return (
    <div>
      <form onSubmit={handleEditFormSubmit}>

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