import React from 'react'

const Persons = ({ persons, deleteRecord }) => {
  return (
    persons.map(person => 
      <div key={person.id}>
        <span className='person'>{person.name} {person.number} </span>
        <button onClick={() => deleteRecord(person.id, person.name)}>delete</button>
      </div>
    )
  )
}

export default Persons