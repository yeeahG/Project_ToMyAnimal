import React, { useEffect, useReducer, useState } from 'react'
import './AnimalInfo.css'

const reducer = (state, action) => {
    //state 상태관리 로직들
    let newState = [];
  
    switch(action.type) {
      case 'INIT':{
        return action.data;
      }
      case 'CREATE':{
        // const newItem = {
        //   ...action.data
        // }
        newState = [action.data, ...state];
        break;
      }
      case 'REMOVE':{
        newState = state.filter((it) => it.id !== action.targetId);
        break;
      }
      case 'EDIT':{
        newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
        break;
      }
      default:
        return state;
    }
    return newState;
  }

const dummyData = [
    {
      id:1, 
      emotion: 1,
      content: "Today 1",
      date: 1652940360079,
    },
    {
      id:2, 
      emotion: 2,
      content: "Today 2",
      date: 1652940360082,
    },
    {
      id:3, 
      emotion: 3,
      content: "Today 3",
      date: 1652940360182,
    },
    {
      id:4, 
      emotion: 4,
      content: "Today 4",
      date: 1652940360192,
    },
    {
      id:5, 
      emotion: 2,
      content: "Today 5",
      date: 1852940360192,
    },
]

const AnimalLog = () => {
    const [sortType, setSortType] = useState('latest');
    const [logs, setLogs] = useState(dummyData);
    console.log(dummyData[1].content);

    // const dummyList = logs.map(log => 
    //     {log.content}
    // )

    console.log(logs);


  return (
    <>
        <div>
            <select>
                <option value='latest'>최신순</option>
                <option value='oldest'>오래된순</option>
            </select>
            <button>write</button>
        </div>

        <div className='content__wrapper'>
            <div className='animal__imageform'>
                {logs.map((it) => {
                    <li key={it.id}>
                    {it.content}
                    </li>
                })}
                
                {dummyData[0].content}
                
            </div>

            <div className='info__details'>

                <div className='details__description'>
                    <h1>출력</h1>
                    
                </div>
            </div>

            <div className='boxInner' >


            </div>

        </div>

        <section className='etc'>
        <h2>New section</h2>
        </section>
    
    </>
  )
}

export default AnimalLog