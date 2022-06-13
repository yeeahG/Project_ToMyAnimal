import React from 'react'

const ReadOnlyRow = ( {user, handleEditClick}) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.contact}</td>
      <td>
        <button 
          type='button' 
          onClick={(e) => handleEditClick(e, user)}
        >
          Edit
        </button>
      </td>
    </tr>

  )
}

export default ReadOnlyRow