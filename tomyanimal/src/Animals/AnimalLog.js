import React, { useEffect, useReducer, useState, useRef } from 'react'
import dummy from './data.json'
import { Navigate } from 'react-router-dom';
import Write from './Write';
import Read from './Read';
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
      title: "산책",
      content: "Today 1",
      date: 1652940360079,
    },
    {
      id:2, 
      emotion: 2,
      title: "간식",
      content: "Today 2",
      date: 1652940360082,
    },
    {
      id:3, 
      emotion: 3,
      title: "병원",
      content: "Today 3",
      date: 1652940360182,
    },
    {
      id:4, 
      emotion: 4,
      title: "공원",
      content: "Today 4",
      date: 1652940360192,
    },
    {
      id:5, 
      emotion: 2,
      title: "미용",
      content: "Today 5",
      date: 1852940360192,
    },
]

const AnimalLog = () => {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const [sortType, setSortType] = useState('latest');
  const [logs, setLogs] = useState(dummyData);
  const [isOpen, setOpen] = useState(false);

  //date state를 변화시킬 수 있는 dispatch 함수들
  const dataId = useRef(0);
  //CREATE
  const onCreate = (title, date, content) => {
    dispatch({type : "CREATE", data:{
      id: dataId.current, 
      date: new Date(date).getTime(),
      title,
      content,
    }});
    dataId.current += 1;
  }

    //console.log(logs);

  return (
    <>
      <div className='navi__container'>
        <select>
          <option value='latest'>최신순</option>
          <option value='oldest'>오래된순</option>
        </select>

        <button onClick={()=>setOpen(!isOpen)}>
          {isOpen ? "Close" : "Write"}
        </button>
      </div>

      {isOpen ?
      <div className='input__container'>
        <Write />
      </div>
        :
      <>
        <Read dummyData={dummyData} />
      </>
      }


      <section className='etc'>
      <h2>New section</h2>
      </section>
    
    </>
  )
}

export default AnimalLog