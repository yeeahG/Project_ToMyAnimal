import React from 'react'

const EditableRow = ( {editFormData, handleEditFormChange} ) => {
  return (
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

        <td>
            <button type='submit'>Save</button>
        </td>
    </tr>

  )
}

export default EditableRow