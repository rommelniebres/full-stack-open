import React from 'react'

const PersonForm = ({ onSubmit, data }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={data.newName} onChange={data.handleNameChange} /></div>
      <div>number: <input value={data.newNumber} onChange={data.handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm