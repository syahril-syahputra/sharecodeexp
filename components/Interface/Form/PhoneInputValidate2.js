import PhoneInput from 'react-phone-number-input';
import classNames from '@/utils/classNames';
import ErrorInput from './ErrorInput';
import React, {useRef, useEffect} from 'react';

export default function PhoneNumberInput({
  name,
  country_name,
  value,
  country_value,
  className,
  autoComplete,
  placeholder,
  country_name_placeHolder,
  required,
  isFocused,
  handleChange,
  error,
  id,
  options = [],
  ...props
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <div className="mt-1 relative rounded-md shadow-sm w-full flex justify-between">
        <select
          name={name}
          value={value}
          id={id}
          className={
            `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full ${
              error && 'border-red-300'
            } ` + className
          }
          ref={input}
          required={required}
          onChange={props.onChange}
        >
          {options.map((item) => (
            <option key={item.id ?? item.value} value={item.id || item.value}>
              {item.name || item.label}
            </option>
          ))}
        </select>
        {error && <div className="mt-1 ml-4 text-red-600 text-sm">{error}</div>}

        <input
          type={'text'}
          name={name}
          value={value}
          className={
            `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full ${
              error && 'border-red-300'
            } ` + className
          }
          ref={input}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {error && <div className="mt-1 ml-4 text-red-600 text-sm">{error}</div>}
    </div>
  );
}
