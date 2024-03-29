import React, { useState, useReducer, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AnimalPage from './AnimalPage';
import AnimalLog from './AnimalLog';
import CheckList from './Checklist/CheckList';
import GalleryHome from './AnimalGallery/GalleryHome'
import { authInstance } from '../utils/api';
import './AnimalInfo.css'

const reducer = (state, action) => {
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

export const DiaryStateContext = React.createContext();
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
  const [petName, setPetname] = useState();
  const [isLoad, setLoad] = useState('')

  //date state를 변화시킬 수 있는 dispatch 함수들
  const dataId = useRef(data.length+1);

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
        <li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>Photos</li>
      ),
      tabCont:(
        <div> <GalleryHome /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>My Record</li>
      ),
      tabCont:(
        <div> <CheckList /> </div>
      )
    },
    {
      tabTitle:(
        <li className={activeIndex===3 ? "is-active" : ""} onClick={()=>tabClickHandler(3)}>My Memo</li>
      ),
      tabCont:(
        <div> <AnimalLog /> </div>
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
  

  useEffect(() => {
    try {
      async function callAPI() {
        const response = await authInstance.get('api/animals/1');
        setLoad(response.data)
        setPetname(response.data.result.data.name);
      } callAPI();
    } catch(error) {
      console.log(error);
    }
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
     <DiaryDispatchContext.Provider value={{
       onCreate, onEdit, onRemove,
    }}>
      
    <div className='info__container'>

      <div className='header'>
        <div className='space'></div>
        <div className='header__wrapper'>
          <h1 className='header__content'>About you</h1>
          <div className='header__detail'>
            <p>내 {petName}의 모든 것</p>
          </div>
        </div>
      </div>
        
      <div className='space'></div>
      <div className='line'></div>
      <div className='space'></div>

      <div className='info__content'>
        
        <div className='left__menu'>
          <ul className='menu__wrap'>
            <li className='menu__list'>My animal</li>
            {tabContArr.map((section)=>{
            return section.tabTitle
          })}
          </ul>
        </div>

        {tabContArr[activeIndex].tabCont}

      </div>
      
    </div>

    </DiaryDispatchContext.Provider> 
  </DiaryStateContext.Provider> 
  )
}

export default AnimalHome