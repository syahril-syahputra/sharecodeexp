import React from 'react'

export default function WarningBadges() {
  return (
    <span className="relative flex text-xl">
      <span className="animate-ping absolute inline-flex opacity-75">
        <i
          className="fas fa-bell"
          style={{
            color: 'rgb(249 115 22)',
          }}
        ></i>
      </span>
      <span className="relative inline-flex">
        <i
          className="fas fa-bell"
          style={{
            color: 'rgb(249 115 22)',
          }}
        ></i>
      </span>
    </span>
  )
}
