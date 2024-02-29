import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

export default function SearchInput(props) {
  return (
    <div>
      <div className="flex ">
        <Image
          src={'/img/landing-pages/x-black.svg'}
          width={104}
          height={104}
          className="w-36"
        />
        <div className="flex items-center flex-1 border-t-[4.5px] border-b-[4.5px] pr-4 border-black border-r-3 rounded-tr-full rounded-br-full ">
          <input
            required={props.required || false}
            disabled={props.disabled || false}
            value={props.value}
            onChange={({ target }) => props.onChange(target)}
            onKeyDown={props.onKeyDown}
            placeholder={props.placeholder || ''}
            autoComplete="off"
            type={props.type || 'text'}
            className="flex-1 !text-2xl placeholder:text-xl focus:ring-0 border-none focus:border-none outline-none focus:outline-offset-0 focus:outline-0 focus:outline-none !px-0"
          />
          <i
            onClick={props.onButtnClick}
            className="fas text-lg fa-search fa-flip-horizontal cursor-pointer hover:text-gray-400"
          ></i>
        </div>
      </div>
    </div>
  )
}
