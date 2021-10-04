import React from 'react'

const Total = ({ parts }) => {
  const sum = parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)

  return (
    <p style={{fontWeight: 'bold'}}>total of {sum} exercises</p>
  ) 
  }
  
export default Total