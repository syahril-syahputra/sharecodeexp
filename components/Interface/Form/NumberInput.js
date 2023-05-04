import ErrorInput from './ErrorInput';
export default function NumberInput(props){
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
                {props.label}
            </label>
            <input 
                name={props.name}
                required={props.required || false}
                disabled={props.disabled || false}
                value={props.value}
                onChange={({target}) => props.onChange(target)}
                placeholder={props.placeholder || ""}
                autoComplete="off" 
                type="number"
                step={props.step}
                min={props.min}
                max={props.max}
                className={`
                ${props.errorMsg ? 'border-red-200' : 'border-gray-200'} 
                ${props.className} 
                shadow-sm placeholder-slate-300 appearance-none w-full bg-white text-gray-700 border py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}/>
            {props.errorMsg &&
                <ErrorInput errors={props.errorMsg}/>
            }
        </>
    )

}