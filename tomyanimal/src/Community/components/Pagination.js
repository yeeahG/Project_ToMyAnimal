import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pagination = ( {postsPerPage, totalPosts, paginate} ) => {
    const navigate = useNavigate();
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
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
    </div>
  )
}

export default Pagination