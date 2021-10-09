import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    filter !== ''
    ? setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    : setCountries([])
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <>
      <Filter value={filter} onChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </>
  )
}

export default App