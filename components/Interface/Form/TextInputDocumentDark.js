import classNames from '@/utils/classNames'
import ErrorInput from './ErrorInput'
import React from 'react'
import Image from 'next/image'

export default function TextInputDocumentDark(props) {
  return (
    <>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-last-name"
        >
          {props.label}
        </label>

        <div
          className={classNames(
            props.errorMsg || props.helperText
              ? 'border-red-500'
              : 'border-black',
            `p-5  rounded-2xl border-2`
          )}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-center my-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.6}
                stroke="currentColor"
                className="w-24 h-24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </div>
            <div className="text-xs ">
              <input
                type={props.type}
                name={props.name}
                value={props.value}
                accept=".pdf"
                title="Upload"
                onChange={props.onChange}
                required={props.required || false}
                onKeyDown={props.onKeyDown}
                className={classNames(
                  props.errorMsg || props.helperText
                    ? 'border-red-500'
                    : 'border-blue-200',
                  `${props.className} mt-3 shadow-sm placeholder-slate-300 appearance-none w-full bg-white text-gray-700 border py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`
                )}
              />
            </div>
          </div>
        </div>
        {props.errorMsg && <ErrorInput errors={props.errorMsg} />}
        {props.helperText && (
          <span className="mt-2 text-md italic block text-red-500">
            {props.helperText}
          </span>
        )}
      </div>
    </>
  )
}
