import React from 'react';

export default function TextInputSearchComponent(props) {
  return (
    <>
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
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </>
  );
}
