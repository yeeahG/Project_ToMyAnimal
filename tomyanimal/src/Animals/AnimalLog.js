import React, { useState, useContext } from 'react'
import { DiaryStateContext } from './AnimalHome'
import Write from './Write';
import Read from './Read';
import './AnimalInfo.css'
import ControlMenu from '../Pages/ControlMenu';
import Pagination from '../Community/components/Pagination';



const sortOptionList = [
  {value: "latest", name: "최신순"},
  {value: "oldest", name: "오래된 순"},
]

const AnimalLog = () => {
  const [sortType, setSortType] = useState('latest');
  const [isOpen, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const diaryList = useContext(DiaryStateContext);
  
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  //filter 적용
  const getProcessedList = () => {

    const compare = (a,b) => {
      if(sortType === 'latest') {
          return parseInt(b.date) - parseInt(a.date);
      } else {
          return parseInt(a.date) - parseInt(b.date);
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    
    let currentPosts = 0;
    currentPosts = sortedList.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <div className='log__wrapper'>
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
        <Write isOpen={isOpen} />
      </div>
        :
      <>
      {getProcessedList().map((it) => (
        <Read diaryList={diaryList} key={it.id} {...it}/>
      ))}

      <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={diaryList.length}
        paginate={setCurrentPage}
      /> 

      </>
      }

      <section className='etc'>
      <h2>New section</h2>
      </section>
    
    </div>
  )
}

export default AnimalLog