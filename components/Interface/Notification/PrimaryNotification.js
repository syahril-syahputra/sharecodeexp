import React from 'react'

export default function PrimaryNotification(props) {
  return (
    <div className="my-4 shadow-md hover:shadow-lg transition-all flex justify-between items-center text-white py-2 px-4 space-x-4 bg-blue-500">
      <span className="relative flex text-xl">
        <span className="animate-ping absolute inline-flex opacity-75">
          <i className="fas fa-bell"></i>
        </span>
        <span className="relative inline-flex">
          <i className="fas fa-bell"></i>
        </span>
      </span>
      <div className="text-sm font-normal w-full">
        <span className="mb-1 text-sm font-semibold">{props.message}</span>
        {props.timer && (
          <div className="mb-1 text-sm font-normal">{props.timer}</div>
        )}
      </div>
      {props.onCloseNotification && (
        <div
          className="inline-block cursor-pointer items-end"
          onClick={props.onCloseNotification}
        >
          <i className="fas fa-times"></i>
        </div>
      )}
    </div>
  )
}
