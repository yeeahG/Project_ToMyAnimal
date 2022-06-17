import React from 'react'

const Read = () => {
  return (
    <div className='list__board'>
        <table>

            <thead>
                <tr>
                    <th>id</th>
                    <th>글제목</th>
                    <th>글쓴이</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>
            </thead>

            {/*글목록*/}
            <tbody>
                <tr>
                    <td>
                        <div>
                            <div>글 id</div>
                        </div>
                    </td>
                    <td>
                        <span>
                            <span>
                                <a>제목</a>
                                <a>댓글수</a>
                                <span>사진첨부되면 아이콘으로</span>
                                <span>새글이면 아이콘으로</span>
                            </span>
                        </span>
                    </td>
                    <td>
                        <a>작성자이름</a>
                    </td>
                    <td>
                        <span>작성시간</span>
                    </td>
                    <td>
                        <span>조회수</span>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default Read