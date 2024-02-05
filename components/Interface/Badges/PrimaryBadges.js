import React from 'react'

export default function PrimaryBadges({ title, className }) {
  if (parseInt(title) === 0) {
    return null
  }
  return (
    <span className={`px-2 bg-blue-400 shadow-lg text-white ${className}`}>
      {title}
    </span>
  )
}
