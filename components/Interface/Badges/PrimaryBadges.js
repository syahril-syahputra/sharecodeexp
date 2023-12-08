import React from 'react'

export default function PrimaryBadges({ title, className }) {
  return <span className={`px-2 bg-blue-400 shadow-lg text-white ${className}`}>{title}</span>
}
