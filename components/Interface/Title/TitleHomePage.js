import classNames from '@/utils/classNames'
import React from 'react'

export default function TitleHomePage(props) {
  return (
    <div className="container">
      <div
        className={classNames('flex items-center space-x-4 ', props.className)}
      >
        <span className="font-bold text-5xl">{props.number}.</span>
        <span className="text-2xl">{props.text}</span>
      </div>
    </div>
  )
}
