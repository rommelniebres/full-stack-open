import React from 'react'

const Filter = ({ value, onChange }) =>
  <div>
    find countries <input onChange={onChange} value={value} />
  </div>

export default Filter