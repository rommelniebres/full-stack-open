import React from 'react'

const Total = ({ parts }) => {
  // const total = parts.reduce(function(previousPart, currentPart) {
  //   console.log(previousPart.exercises, currentPart.exercises);
  // }, 0);
  
  const total = parts.reduce((previousValue, currentValue) => {
    return {exercises: previousValue.exercises + currentValue.exercises} 
  })
    
  return(
    <p style={{fontWeight: 'bold'}}>Number of exercises {total.exercises}</p>
  ) 
  }
  
export default Total