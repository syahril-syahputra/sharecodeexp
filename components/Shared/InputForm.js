import ErrorInput from '@/components/Shared/ErrorInput';
export default function InputForm(props){
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {props.label}
            </label>
            <input 
                value={props.data}
                onChange={({target}) => 
                    props.setData(target, props.inputDataName)
                }
                autoComplete="off" 
                type="text"
                className={`${props.errorMsg ? 'border-red-200' : 'border-gray-200'} shadow-sm placeholder-slate-300 text-slate-600 appearance-none w-full bg-white text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}/>
            {props.errorMsg &&
                <ErrorInput error={props.errorMsg}/>
            }
        </>
    )

}