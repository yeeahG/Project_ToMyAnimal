import React from 'react'

const UserEdit = (users, isOpen) => {
    console.log(users);

    const cancleHandler = () => {

    }

  return (
    <>

      <div className='userinfo__table'>
        <table>
          <tbody>
            <tr>
              <td>Name 
                <input />
              </td>
            </tr>
            <tr>
              <td>Contact 
                <input />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='welcome'>
        <button className='welcome__btn'>수정하기</button>
        <button className='welcome__btn' onClick={isOpen === false}>취소</button>
      </div>

    </>
  )
}

export default UserEdit