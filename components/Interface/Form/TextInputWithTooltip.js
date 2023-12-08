import classNames from '@/utils/classNames'
import ErrorInput from './ErrorInput'
import React from 'react'

export default function TextInputWIthTooltip(props) {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
        {props.label}
      </label>
      {props.setIcon && (
        <span className="z-10 h-full mt-0.5 leading-snug font-normal text-center text-slate-300 absolute bg-transparent text-lg items-center justify-center w-8 pl-3 py-2 mr-10">
          <i className={props.setIcon}></i>
        </span>
      )}
      <div className="flex items-center">
        <input
          name={props.name}
          required={props.required || false}
          disabled={props.disabled || false}
          value={props.value}
          onChange={({target}) => props.onChange(target)}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder || ''}
          autoComplete="off"
          type={props.type || 'text'}
          className={classNames(
            props.errorMsg ? 'border-red-500' : 'border-blue-200',
            props.setIcon && 'pl-10',
            `${props.className} shadow-sm placeholder-slate-300 appearance-none w-full bg-white text-gray-700 border py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`
          )}
        />
        <span>
          <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button>

        </span>
      </div>

      {props.errorMsg && <ErrorInput errors={props.errorMsg} />}
    </>
  )
}
