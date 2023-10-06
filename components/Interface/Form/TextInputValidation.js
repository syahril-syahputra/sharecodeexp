import classNames from '@/utils/classNames';
import ErrorInput from './ErrorInput';
import React from 'react';

export default function TextInputValidate(props) {
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
      {props.errorMsg && <ErrorInput errors={props.errorMsg} />}
      {props.helperText && (
        <span className="mt-2 text-md italic block text-red-500">
          {props.helperText}
        </span>
      )}
    </>
  );
}
