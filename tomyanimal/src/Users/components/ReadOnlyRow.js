import React from 'react'

const ReadOnlyRow = ( {userPhone, userName, handleEditClick}) => {
  return (
  <>
    <tr>
      {/* <td>{user.name}</td>
      <td>{user.contact}</td> */}
      {/* <td>{user.result.data['userName']}</td>
      <td>{user.result.data['userPhoneNumber']}</td> */}
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