import React from 'react'

const Options = ({name, updateItemCount}) => {
  return (
    <div className="optionItem">
      <input 
        type='checkbox' 
        id={`${name} option`}
        className="appleCheckbox"
        onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
      />
      <label className="optionLabel" htmlFor={`${name} option`}>
        {name}
      </label>
    </div>
  )
}

export default Options