import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dummy from './data.json'
import './AnimalInfo.css'

const Read = ( {dummyData, diaryList, getProcessedList} ) => {
    const [logs, setLogs] = useState(getProcessedList);
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

    const handleEditClick = (e, logs) => {
      e.preventDefault();
      setEditContactId(logs.id);
  
      const formValues = {
        title: logs.title,
        content: logs.content,
      }
  
      setEditFormData(formValues);
    };
  

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


      {getProcessedList().map((log) => (
        <Fragment>
        {editContactId === log.id ? (
          <li key={log.id}>
          <div className='log__content'>
            <h3>Day {log.date}</h3>
          </div>
          <p>
            <input 
              type='text' required='required' 
              placeholder='title' 
              name='title'
              value={editFormData.title}
            />
          </p>
          <p>
            <input 
              type='text' required='required' 
              placeholder='content' 
              name='content'
              value={editFormData.content}
            />
          </p>
          </li>
        )
          :
          (
        <li key={log.id}>
          <div className='log__content'>
            <h3>Day {log.day}</h3>
            <button onClick={(e) => handleEditClick(e, logs)}>edit</button>
          </div>
          <p>{log.title}</p>
          <p>{log.content}</p>
        </li>
          )}
        </Fragment>
      ))}

    </div>
  )
}

export default Read