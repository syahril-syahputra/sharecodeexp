import classNames from '@/utils/classNames'
import ErrorInput from './ErrorInput'
import React from 'react'
import Select from 'react-tailwindcss-select'
import useDataCountry from '@/hooks/useCountry'

export default function TextInputPhoneValidate(props) {
  const countries = useDataCountry()
  const options =
    countries?.map((e) => {
      return {
        value: e?.phonecode || '',
        label: e?.phonecode || '',
      }
    }) || []
  return (
    <>
      <label className="block uppercase  tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
        {props.label}
      </label>
      {props.setIcon && (
        <span className="z-10 h-full mt-0.5 leading-snug font-normal text-center text-slate-300 absolute bg-transparent text-lg items-center justify-center w-8 pl-3 py-2 mr-10">
          <i className={props.setIcon}></i>
        </span>
      )}

      <div className="flex">
        <div id="country" style={{ borderRight: 'none' }}>
          <Select
            isSearchable={props.searchable || false}
            name={props.name2}
            value={props.value2}
            onChange={props.onChange2}
            options={options}
            classNames={{
              menuButton: () =>
                `${
                  props.errorMsg || props.helperText
                    ? 'border-red-500'
                    : 'border-blue-200'
                } text-right h-11 flex text-sm text-gray-500 border border-blue-200 shadow-sm transition-all duration-300 focus:outline-none`,
              menu: 'text-left absolute z-10 w-full bg-white shadow-lg border py-1 mt-1 text-sm text-gray-700',
              listItem: ({ isSelected }) =>
                `text-left block transition duration-200 px-2 py-2 cursor-pointer select-none truncate ${
                  isSelected
                    ? `text-white bg-blue-500`
                    : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                }`,
              searchBox:
                'text-left rounded-0 pl-10 border border-gray-300 w-full focus:outline-none focus:bg-white focus:border-gray-500',
            }}
          />
        </div>
        <input
          name={props.name}
          required={props.required || false}
          disabled={props.disabled || false}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder || ''}
          autoComplete="off"
          type={props.type || 'text'}
          className={classNames(
            props.errorMsg || props.helperText
              ? 'border-red-500'
              : 'border-blue-200',
            props.setIcon && 'pl-10',
            `${props.className} shadow-sm placeholder-slate-500 appearance-none w-full bg-white text-gray-700 border py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`
          )}
        />
      </div>
      {props.errorMsg && <ErrorInput errors={props.errorMsg} />}
      {props.helperText && (
        <span className="mt-2 text-md italic block text-red-500">
          {props.helperText}
        </span>
      )}
    </>
  )
}
