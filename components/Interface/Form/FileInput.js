import classNames from '@/utils/classNames';
import ErrorInput from './ErrorInput';
import React from 'react'

export default function FileInput(props){
    return (
        <>  
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold text-left mb-2">
                {props.label}
            </label>
            <div className={classNames(
                props.errorMsg ? 'border-red-500' : 'border-blue-200',
                `${props.className} p-5 border-dashed border-2 border-blue-200 h-44 text-center`)}>
                <div className='text-center my-auto mb-5'>
                    <i className="fas fa-upload text-blue-500 sm:fa-1x fa-3x"></i>
                </div>
                <span className='text-sm italic text-gray-500'>{props.description}</span>
                <div className='mx-auto'>
                    <input 
                        type="file"
                        accept={props.accept}
                        name={props.name}
                        required={props.required || false}
                        disabled={props.disabled || false}
                        className={classNames(                   
                            `${props.className} text-sm mt-5 placeholder-slate-300 bg-white text-gray-700 py-2`)}
                        onChange={({target}) => 
                            props.onChange(target)
                        }
                    />
                </div>
            </div>
            {props.errorMsg &&
                <ErrorInput errors={props.errorMsg}/>
            }
        </>
    )

}