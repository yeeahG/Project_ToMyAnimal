import React, { useEffect, useState } from 'react'
import Pagination from '../../Community/components/Pagination'
import ControlMenu from '../../Pages/ControlMenu'
import Write from '../Write'
import LogGet from './LogGet'
import axios from 'axios';
import LogWrite from './LogWrite'

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const Log = () => {
    const [sortType, setSortType] = useState('latest');
    const [isOpen, setOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const [diaryList, setDiaryList] = useState([]);

    const loginId = localStorage.getItem('userid');

    {/*'http://localhost:8084/api/board/' + loginId, { */}
  useEffect(() => {
    axios.get(
      'https://jsonplaceholder.typicode.com/posts', {
      headers: { 
        Authorization: localStorage.getItem('logintoken') 
      }
    }).then((log) => {
      setDiaryList(log.data);
    }).then((error) => {
      console.error('실패:', error);
    })
  }, []);

  //console.log(diaryList);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  
  //filter 적용
  const getProcessedList = () => {
  
    const compare = (a,b) => {
      if(sortType === 'latest') {
        return parseInt(b.id) - parseInt(a.id);
      } else {
        return parseInt(a.id) - parseInt(b.id);
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
        <LogWrite isOpen={isOpen} />
      </div>
        :
      <>
        {getProcessedList().map((it) => (
          <LogGet key={it.id} {...it}/>
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

export default Log