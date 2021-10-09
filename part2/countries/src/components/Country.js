import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState([])
  const query = country.capital[0]

  useEffect(() => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
        .then(response => {
          setWeather([response.data])
        })
  }, [query])

  if (weather.length > 0) {
    const currentWeather = weather[0].current
    return(
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <h2>Language</h2>
        <ul>
          {Object.keys(country.languages).map((language, key) => 
            <li key={key}>{country.languages[language]}</li>
          )}
        </ul>
        <h2>Flag</h2>
        <img src={country.flags.png} alt={country.name.common}/>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Observation time: {currentWeather.observation_time}</p>
        <p>temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
      </div>
    )
  }
  return(
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <h2>Language</h2>
      <ul>
        {Object.keys(country.languages).map((language, key) => 
          <li key={key}>{country.languages[language]}</li>
        )}
      </ul>
      <h2>Flag</h2>
      <img src={country.flags.png} alt={country.name.common}/>
    </div>
  )
}

export default Country