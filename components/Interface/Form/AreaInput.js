import ErrorInput from './ErrorInput';
export default function AreaInput(props){
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
                {props.label}
            </label>
            <textarea 
                name={props.name}
                required={props.required || false}
                disabled={props.disabled || false}
                value={props.value}
                onChange={({target}) => props.onChange(target)}
                placeholder={props.placeholder || ""}
                autoComplete="off"
                className="shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
            {props.errorMsg &&
                <ErrorInput errors={props.errorMsg}/>
            }
        </>
    )

}