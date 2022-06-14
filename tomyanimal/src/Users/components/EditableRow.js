import React from 'react'

const EditableRow = ( {editFormData, handleEditFormChange, handleCancelClick} ) => {
  return (
    <>
    <tr>
        <td>
            <input 
                type='text' required='required' 
                placeholder='Enter a name' 
                name='name'
                value={editFormData.name}
                onChange={handleEditFormChange}
                />
        </td>
        <td>
            <input 
                type='text' required='required' 
                placeholder='Enter a contact' 
                name='contact'
                value={editFormData.contact}
                onChange={handleEditFormChange}
                />
        </td>
    </tr>
    <button type='submit'>Save</button>
    <button type='button' onClick={handleCancelClick}>Cancel</button>
    </>

  )
}

export default EditableRow