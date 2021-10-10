import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [allPersons, setAllPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setAllPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    filter !== ''
    ? setPersons(allPersons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    : personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [filter])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.filter(person => person.name === newName)

    if (existingPerson.length > 0) {
      const id = existingPerson[0].id
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setMessage(`${returnedPerson.name} number was updated!`)
            setMessageStatus('success')

            setTimeout(() => {
              setMessage(null)
            }, 5000)

            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch(error => {
            setMessage(`Failed to update record, please try again`)
            setMessageStatus('error')

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setMessage(`Added ${returnedPerson.name}`)
            setMessageStatus('success')

            setTimeout(() => {
              setMessage(null)
            }, 5000)

            setAllPersons(allPersons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(`Failed to create record, please try again`)
            setMessageStatus('error')
  
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
    }
  }

  const deleteRecord = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setMessage(`Deleted ${name}`)
          setMessageStatus('success')

          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage(`The record of ${name} was already deleted from server`)
          setMessageStatus('error')

          setTimeout(() => {
            setMessage(null)
          }, 5000)
          
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>

      <Notification message={message} status={messageStatus} />

      <Filter onChange={handleFilterChange} filter={filter} />

      <h2>Add a new</h2>

      <PersonForm onSubmit={addPerson} data={{newName, newNumber, handleNameChange, handleNumberChange}} />

      <h2>Numbers</h2>
      
      <Persons persons={persons} deleteRecord={deleteRecord} />
    </>
  )
}

export default App