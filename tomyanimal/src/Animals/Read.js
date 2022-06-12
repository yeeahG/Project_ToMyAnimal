import React, { useState } from 'react'
import dummy from './data.json'
import './AnimalInfo.css'

const Read = ( {dummyData} ) => {
    const [logs, setLogs] = useState(dummyData);

    console.log(logs);
  return (
    <div>
        <div className='content__wrapper'>
            <div >
              {logs.map((it) => {
                <li key={it.id}>
                  {it.content}
                </li>
              })}
                    
              {dummyData[0].date}
              {dummyData[0].content}
            </div>

            <div>
              {dummyData[1].content}
            </div>

            <div>
              {dummyData[2].content}
            </div>

        </div>

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
            )
        </ul>
    </div>
  )
}

export default Read