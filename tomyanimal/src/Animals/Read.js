import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dummy from './data.json'
import Edit from './Edit';
import './AnimalInfo.css'

const Read = ( {dummyData, diaryList, getProcessedList} ) => {
    const [logs, setLogs] = useState(getProcessedList);
    const [edited, setEdited] = useState(false);

    const navigate = useNavigate();

    const goEdit = () => {
      setEdited(true);
    }

  return (
    <div>
        
      <ul className="list_day">
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
      </ul>

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

    </div>
  )
}

export default Read