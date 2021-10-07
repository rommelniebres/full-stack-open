import React from 'react'

const Filter = ({ onChange, filter }) => {
  return (
    <div>filter shown with <input value={filter} onChange={onChange} /></div>
  )
}

export default Filter