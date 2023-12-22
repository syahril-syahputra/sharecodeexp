import React from 'react'

export default function NotificationCard(props) {
  return (
    <div className="bg-blue-100 p-4 rounded shadow-md">
      <h1>{props.name}</h1>
      <div>{props.desc}</div>
      <div>
        <span>
          {props.category} . {props.date}
        </span>
      </div>
    </div>
  )
}
