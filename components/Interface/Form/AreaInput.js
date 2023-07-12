import ErrorInput from './ErrorInput';
import classNames from '@/utils/classNames';
export default function AreaInput(props){
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
                onChange={({target}) => props.onChange(target)}
                placeholder={props.placeholder || ""}
                autoComplete="off"
                className={classNames(
                    props.errorMsg || (props.characterCount > props.characterLimit) ? 'border-red-500' : 'border-gray-200',                    
                    `${props.className} shadow-sm placeholder-slate-300 appearance-none w-full bg-white text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`)}/>
                {(""+props.characterCount && props.characterLimit) &&
                    <p className='text-right font-extralight text-gray-500 -mt-1 text-sm'>{props.characterCount}/{props.characterLimit}</p>
                }
            {props.errorMsg &&
                <ErrorInput errors={props.errorMsg}/>
            }
        </>
    )

}