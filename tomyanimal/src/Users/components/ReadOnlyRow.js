import React from 'react'

const ReadOnlyRow = ( {user, handleEditClick}) => {
  //console.log(user);
  return (
  <>
    <tr>
      {/* <td>{user.name}</td>
      <td>{user.contact}</td> */}
      {/* <td>{user.result.data['userName']}</td>
      <td>{user.result.data['userPhoneNumber']}</td> */}

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