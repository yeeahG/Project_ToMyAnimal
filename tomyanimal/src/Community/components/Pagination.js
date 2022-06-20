import React from 'react'

const Pagination = ( {postsPerPage, totalPosts, paginate} ) => {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <div className='paging'>
        <div className='paging__number'>
            {/* <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li>...</li>
                <li>마지막페이지</li>
            </ol> */}

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

        <div className='write__article'>
            <button>글쓰기</button>
            <button>내글</button>
        </div>
    </div>
  )
}

export default Pagination