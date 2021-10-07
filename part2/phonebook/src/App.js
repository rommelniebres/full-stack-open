import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.some(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    event.target.value === ''
    ? setFilterPersons(true)
    : setFilterPersons(false)
  }

  const personsToShow = filterPersons
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>

      <PersonForm onSubmit={addPerson} data={{newName, newNumber, handleNameChange, handleNumberChange}} />

      <h2>Numbers</h2>
      
      <Persons persons={personsToShow} />
    </>
  )
}

export default App