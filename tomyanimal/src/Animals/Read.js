import React, { useState } from 'react'
import dummy from './data.json'
import './AnimalInfo.css'

const Read = ( {dummyData, diaryList} ) => {
    const [logs, setLogs] = useState(dummyData);

    console.log(logs);
  return (
    <div>
        <ul className="list_day">
            {dummy.words.map((log) => (
              <li key={log.id}>
                <div className='log__content'>
                  <h3>Day {log.day}</h3>
                  <button>edit</button>
                </div>
                <p>{log.content}</p>
              </li>
            ))}
            
        </ul>

        <ul className="list_day">
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
            
        </ul>
    </div>
  )
}

export default Read