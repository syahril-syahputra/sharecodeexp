import React from 'react'
import useDataCountry from '@/hooks/useCountry'
import Select from 'react-tailwindcss-select'
import ErrorInput from './ErrorInput'

export default function CountrySelectorDark(props) {
  const countries = useDataCountry()
  const options =
    countries?.map((e) => {
      return {
        value: e?.name || '',
        label: e?.name || '',
      }
    }) || []

  return (
    <>
      <label
        className="text-left block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-last-name"
      >
        {props.label}
      </label>
      <Select
        isSearchable={props.searchable || false}
        required={props.required || false}
        autoComplete="off"
        disabled={props.disabled}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        options={options}
        errorMsg={props.errorMsg}
        onBlur={props.onBlur}
        onChange={props.onChange}
        classNames={{
          menuButton: () =>
            `${
              props.errorMsg || props.helperText
                ? 'border-red-500'
                : 'border-black'
            } text-right h-11 flex text-sm text-gray-500 border rounded-full items-center border-black shadow-sm transition-all duration-300 focus:outline-none`,
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
      {props.errorMsg && <ErrorInput errors={props.errorMsg} />}
      {props.helperText && (
        <span className="mt-2 text-md italic block text-red-500">
          {props.helperText}
        </span>
      )}
    </>
  )
}
