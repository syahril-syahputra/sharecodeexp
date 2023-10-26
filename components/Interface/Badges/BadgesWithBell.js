import React from 'react'

export default function BadgesWithBell({ title }) {
  return (
    <div className="px-2 bg-orange-500 shadow-lg text-white">
      <span className="relative flex text-xl">
        <span className="animate-ping absolute inline-flex opacity-75">
          <i className="fas fa-bell"></i>
        </span>
        <span className="relative inline-flex">
          <i className="fas fa-bell"></i>
        </span>
      </span>
    </div>
  )
}
