import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
  return (
    <div>
      <Part parts={course.parts} />
    </div>
  )
}
  
export default Content