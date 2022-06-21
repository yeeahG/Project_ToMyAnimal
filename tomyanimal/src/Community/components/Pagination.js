import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Write from './Write.js'

const Pagination = ( {postsPerPage, totalPosts, paginate, addArticle, openButton} ) => {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const goWrite = () => {
        console.log("Wrtie!");
        navigate('/write')
    }
    
    const userid = localStorage.getItem('userid');

  return (
    <div className='paging'>
        <div className='paging__number'>
            <ul>
            {pageNumbers.map( (number) => (
                <li className='pagination'>
                    <span onClick={() => paginate(number)}>
                        {number}
                    </span>
                </li>
            ))}
            </ul>

        </div>

        {/*
        <div className='write__article'>
            <button onClick={addArticle}>글쓰기</button>
            <button onClick={openButton}>
                {isOpen ? "" : "Write"}
            </button>
            <button>내글</button>
        </div> */}
    </div>
  )
}

export default Pagination