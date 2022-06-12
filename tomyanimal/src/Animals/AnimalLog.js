import React, { useEffect, useState, useContext } from 'react'
import { DiaryStateContext } from './AnimalHome'
import dummy from './data.json'
import { Navigate } from 'react-router-dom';
import Write from './Write';
import Read from './Read';
import './AnimalInfo.css'
import ControlMenu from '../Pages/ControlMenu';


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

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const AnimalLog = () => {
  const [sortType, setSortType] = useState('latest');
  const [logs, setLogs] = useState(dummyData);
  const [isOpen, setOpen] = useState(false);

  const diaryList = useContext(DiaryStateContext);
  //console.log(diaryList);

  //filter 적용
  const getProcessedList = () => {

    const compare = (a,b) => {
      if(sortType === 'latest') {
          return parseInt(b.date) - parseInt(a.date);
      } else {
          return parseInt(a.date) - parseInt(b.date);
      }
    }


    const sortedList = diaryList.sort(compare);
    return sortedList;
  }

  return (
    <>
      <div className='navi__container'>
        <ControlMenu 
          value={sortType} 
          onChange={setSortType}
          optionList={sortOptionList}
        />

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
        <Read dummyData={dummyData} diaryList={diaryList} getProcessedList={getProcessedList} />
      </>
      }


      <section className='etc'>
      <h2>New section</h2>
      </section>
    
    </>
  )
}

export default AnimalLog