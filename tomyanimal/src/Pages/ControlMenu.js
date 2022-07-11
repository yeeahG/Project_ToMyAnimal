import React from 'react'

const ControlMenu = ( {value, onChange, optionList} ) => {
  return (
    <select className='control__container'
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => 
      <option value={it.value} key={idx}>
        {it.name}
      </option>
      )}
    </select>
  )
}

export default ControlMenu