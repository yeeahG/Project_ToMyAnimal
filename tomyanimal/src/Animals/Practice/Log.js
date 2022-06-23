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

    //const [logList, setLogList] = useState([]);
    const [logId, setLogId] = useState("");
    const [logTitle, setLogTitle] = useState("");
    const [logContent, setLogContent] = useState("");

    const userId = localStorage.getItem('userid');

    {/* http://localhost:8084/api/my-board?memberId=${userId}
  https://jsonplaceholder.typicode.com/posts */}

    axios.get(`http://localhost:8084/api/my-board?memberId=${userId}`, {
      headers: {
        Authorization: localStorage.getItem('logintoken') 
      }
    }).then((response) => {
      setLogId(response.data.result.data[0].id);
      setLogTitle(response.data.result.data[0].title)
      setLogContent(response.data.result.data[0].content)
    }).catch((error) => {
      console.error(error);
    });

//console.log(response);

  const logList = [
    {id: logId, title: logTitle, content: logContent}
  ]


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
  
    //const copyList = JSON.parse(JSON.stringify(logList));
    const sortedList = logList.sort(compare);
      
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
        {/* {logList.map((it) => (
          <LogGet key={it.id} {...it}/>
        ))}*/}

        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={logList.length}
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