import classNames from '@/utils/classNames'
import ErrorInput from './ErrorInput'
import React from 'react'
import Image from 'next/image'

export default function TextInputDocument(props) {
  return (
    <>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-last-name"
        >
          {props.label}
        </label>

        <div className="p-5 border-dashed border-2 border-indigo-200">
          <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
            <div className="text-center my-auto">
              <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl" />
            </div>
            <div className="text-xs ">
              <p>PDF file size no more than 10MB</p>
              <input
                type={props.type}
                name={props.name}
                value={props.value}
                accept=".pdf"
                onChange={props.onChange}
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
        {props.errorMsg && <ErrorInput errors={props.company_img} />}
        {props.helperText && (
          <span className="mt-2 text-md italic block text-red-500">
            {props.helperText}
          </span>
        )}
      </div>
    </>
  )
}
