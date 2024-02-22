import React from 'react'
import classNames from '@/utils/classNames'

export default function DarkButton(props) {
  return (
    <button
      disabled={props.disabled}
      className={classNames(
        props.disabled
          ? 'bg-gray-500'
          : 'bg-black active:bg-gray-600  shadow hover:shadow-lg outline-none hover:bg-gray-500 focus:outline-none ease-linear transition-all duration-150',
        props.size == 'sm' && 'text-xs px-2 py-2',
        props.size == 'md' && 'text-md px-4 py-2',
        props.size == 'lg' && 'text-lg px-6 py-5',
        !props.size && 'text-md px-4 py-2',
        `${props.className} text-white rounded-full`
      )}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
