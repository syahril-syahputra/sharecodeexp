import PhoneInput from 'react-phone-number-input';
import classNames from '@/utils/classNames';
import ErrorInput from './ErrorInput';
import React from 'react';

export default function PhoneInputValidate(props) {
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
      {/* <PhoneInput
        international
        name={props.name}
        required={props.required || false}
        disabled={props.disabled || false}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder || ''}
        autoComplete="off"
        defaultCountry={props.defaultCountry}
        className="px-3 py-2 bg-white border shadow-sm border-slate-300 w-full rounded-md sm:text-sm"
      /> */}
      <PhoneInput
        international
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        // Set your inline styles here
        containerStyle={{
          border: '10px solid black',
        }}
        inputStyle={{
          background: 'lightblue',
        }}
        required
      />
      {/* {props.errorMsg && <ErrorInput errors={props.errorMsg} />} */}
      {props.helperText && (
        <span className="mt-2 text-md italic block text-red-500">
          {props.helperText}
        </span>
      )}
    </>
  );
}
