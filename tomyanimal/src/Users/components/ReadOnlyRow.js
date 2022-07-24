import React from 'react'

const ReadOnlyRow = ( {userPhone, userName, handleEditClick}) => {
  return (
  <>
    <tr>
      <td>{userName}</td>
      <td>{userPhone}</td>

    </tr>
    <button
      type='button' 
      onClick={(e) => handleEditClick(e)}
    >
      Edit
    </button>
  </>

  )
}

export default ReadOnlyRow