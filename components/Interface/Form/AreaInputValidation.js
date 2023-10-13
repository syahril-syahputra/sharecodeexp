import ErrorInput from './ErrorInput'
import classNames from '@/utils/classNames'
export default function AreaInputValidation(props) {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
        {props.label}
      </label>
      <textarea
        name={props.name}
        rows={props.rows}
        required={props.required || false}
        disabled={props.disabled || false}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder || ''}
        autoComplete="off"
        className={classNames(
          props.errorMsg || props.helperText
            ? 'border-red-500'
            : 'border-blue-200',
          `${props.className} shadow-sm placeholder-slate-500 appearance-none w-full bg-white text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`
        )}
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
