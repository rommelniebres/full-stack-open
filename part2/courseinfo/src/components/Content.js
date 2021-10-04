import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ course }) => {
  return (
    <div>
      <Part parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
  
export default Content