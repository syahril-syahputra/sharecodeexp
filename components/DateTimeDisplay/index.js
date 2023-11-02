import React from 'react'

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <span className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </span>
  )
}

export default DateTimeDisplay
