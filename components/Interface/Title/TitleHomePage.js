import classNames from '@/utils/classNames'
import React from 'react'

export default function TitleHomePage(props) {
  return (
    <div
      className={classNames('flex items-center space-x-4 ', props.className)}
    >
      <span className="font-bold text-5xl">{props.number}.</span>
      <span>{props.text}</span>
    </div>
  )
}
