import React from 'react'

export default function SuccessBadges({ title, className }) {
  return <span className={`px-2 bg-emerald-500 shadow-lg text-white ${className}`}>{title}</span>
}
