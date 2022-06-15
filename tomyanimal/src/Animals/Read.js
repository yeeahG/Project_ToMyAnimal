import React, { Fragment, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import dummy from './data.json'
import EditLog from './components/EditLog';
import ReadLog from './components/ReadLog';
import './AnimalInfo.css'

const Read = ( {diaryList, id,  title, content, date} ) => {
    //const [logs, setLogs] = useState(diaryList);
    const [logs, setLogs] = useState({
      id: id,
      title: title,
      content: content, 
      date: date
    });
    // const [logs, setLogs] = useState(diaryList);
    //console.log(logs.id);

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
  
      const newContacts = [...logs];
      const index = logs.findIndex((it) => it.id === editContactId);
      newContacts[index] = editedContact;
      setLogs(newContacts);
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


    const handleEditClick = (e, logs) => {
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
    // console.log(getProcessedList());
    // console.log(getProcessedList()[0].id);
    //console.log(logs);

  

  return (
    <div>
        
      {/* <ul className="list_day">
        {getProcessedList().map((log) => (
          <li key={log.id}>
            <div className='log__content'>
              <h3>Day {log.day}</h3>
              <button onClick={goEdit}>edit</button>
            </div>
            <p>{log.title}</p>
            <p>{log.content}</p>
          </li>
        ))}
      </ul> */}

      {/*<ul className="list_day">
        {diaryList.map((log) => (
          <li key={log.id}>
            <div className='log__content'>
              <h3>Day {log.day}</h3>
              <button>edit</button>
            </div>
            <p>{log.title}</p>
            <p>{log.content}</p>
          </li>
          ))}
        </ul>*/}

      <form onSubmit={handleEditFormSubmit} className='log__list__container'>
      {/* {logs.map((logs) => ( */}
      {/* {getProcessedList().map((logs, idx) => ( */}
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
            // getProcessedList={getProcessedList}
          />
        </li>
          )}
        </Fragment>
      {/* ))} */}
      </form>

    </div>
  )
}

export default Read