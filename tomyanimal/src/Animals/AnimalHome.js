import React, { useState, useReducer, useRef } from 'react'
import AnimalPage from './AnimalPage';
import AnimalLog from './AnimalLog';
import CheckUp from './Checklist/CheckList';
import {logData} from './components/data'
import Log from './AnimalLog/Log';
import './AnimalInfo.css'
import CheckList from './Checklist/CheckList';

const reducer = (state, action) => {
  //state 상태관리 로직들
  let newState = [];

  switch(action.type) {
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
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

//상태관리를 담을 context
export const DiaryStateContext = React.createContext();
//dispatch 함수들을 담아서 context로 생성
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1, 
    title: "산책",
    content: "Today 1",
    date: 1652940360079,
  },
  {
    id:2, 
    title: "간식10개줌",
    content: "Today 2",
    date: 1652940360082,
  },
  {
    id:3, 
    title: "병원",
    content: "Today 3",
    date: 1652940360182,
  },
  {
    id:4, 
    title: "공원",
    content: "Today 4",
    date: 1652940360192,
  },
  {
    id:5, 
    title: "미용",
    content: "Today 5",
    date: 1654902400000,
  },
  {
    id:6, 
    title: "카페",
    content: "Today 5",
    date: 1655912400000,
  },
  {
    id:7, 
    title: "미용",
    content: "Today 5",
    date: 1655922400000,
  },
  {
    id:8, 
    title: "미용",
    content: "Today 5",
    date: 1655932400000,
  },
  {
    id:9, 
    title: "미용",
    content: "Today 5",
    date: 1655942300000,
  },
  {
    id:10, 
    title: "미용",
    content: "Today 5",
    date: 1655942400000,
  },
]

const AnimalHome = () => {
  const [activeIndex, setActiveIndex]=useState(0);
  const [data, dispatch] = useReducer(reducer, dummyData);

  //date state를 변화시킬 수 있는 dispatch 함수들
  const dataId = useRef(0);

  

  const tabClickHandler=(index)=>{
    setActiveIndex(index);
  };

  const tabContArr=[
    {
      tabTitle:(
        <li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>My Animal </li>
      ),
      tabCont:(
        <div> <AnimalPage /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}> My Log</li>
      ),
      tabCont:(
        <div> <AnimalLog /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>Memo</li>
      ),
      tabCont:(
        <div> <Log /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===3 ? "is-active" : ""} onClick={()=>tabClickHandler(3)}>Check</li>
      ),
      tabCont:(
        <div> <CheckList /> </div>
      )
    },
  ];



  //CREATE
  const onCreate = (date, content, title) => {
    dispatch({type : "CREATE", data:{
      id: dataId.current, 
      date: new Date(date).getTime(),
      content,
      title
    }});
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }
  //EDIT
  const onEdit = (targetId, date, content, title) => {
    dispatch({type: "EDIT", data:{
      id: targetId,
      date: new Date(date).getTime(),
      content, 
      title
    }});
  }




  return (

    <DiaryStateContext.Provider value={data}>
     <DiaryDispatchContext.Provider value={{
       onCreate, onEdit, onRemove,
    }}>
      
    <div className='info__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>Header</h1>
          <div className='header__detail'>
            <p>details</p>
          </div>
        </div>
      </div>
        
      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>

      <div className='info__content'>
        {/* <div className='grid'> */}

          <div className='left__menu'>
            <ul className='menu__wrap'>
              <li className='menu__list'>My animal</li>
              {tabContArr.map((section, index)=>{
              return section.tabTitle
            })}
            </ul>
          </div>



          {tabContArr[activeIndex].tabCont}


        {/* </div> */}

      </div>
      
    </div>

    </DiaryDispatchContext.Provider> 
  </DiaryStateContext.Provider> 
  )
}

export default AnimalHome