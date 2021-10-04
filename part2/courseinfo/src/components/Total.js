import React from 'react'

const Total = ({ parts }) => {
    let sum = 0

    parts.map(part => 
      sum += part.exercises
    )
    return(
      <p style={{fontWeight: 'bold'}}>Number of exercises {sum}</p>
    ) 
  }
  
export default Total