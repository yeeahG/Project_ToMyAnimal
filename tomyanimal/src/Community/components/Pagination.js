import React from 'react'

const Pagination = ( {postsPerPage, totalPosts, paginate} ) => {
  return (
    <div className='paging'>
        <div className='paging__number'>
            <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li>...</li>
                <li>마지막페이지</li>
            </ol>
        </div>
    </div>
  )
}

export default Pagination