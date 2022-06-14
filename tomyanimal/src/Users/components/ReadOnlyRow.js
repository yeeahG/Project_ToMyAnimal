import React from 'react'

const ReadOnlyRow = ( {user, handleEditClick}) => {
  return (
  <>
    <tr>
      <td>{user.name}</td>
      <td>{user.contact}</td>

    </tr>
    <button
      type='button' 
      onClick={(e) => handleEditClick(e, user)}
    >
      Edit
    </button>
  </>

  )
}

export default ReadOnlyRow