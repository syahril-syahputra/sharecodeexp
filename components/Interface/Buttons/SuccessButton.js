import classNames from "@/utils/classNames"

export default function SuccessButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={classNames(
                    props.disabled ? 'border border-emerald-300 text-emerald-300' : 'border border-emerald-500 text-emerald-500 hover:text-white hover:bg-emerald-500 focus:border-emerald-500 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150',
                    props.size == 'sm' && 'text-xs px-2 py-1',
                    props.size == 'md' && 'text-md px-4 py-2', 
                    props.size == 'lg' && 'text-lg px-6 py-3',
                    !props.size && 'text-md px-4 py-2',
                    `${props.className} bg-white`
                    )}
                type={props.type || "button"}
                onClick={props.onClick}
            >   
                {props.children}
            </button>
        )
    }

    return (
        <button
            disabled={props.disabled}
            className={classNames(
                props.disabled ? 'bg-emerald-300' : 'bg-emerald-500 active:bg-emerald-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150',
                props.size == 'sm' && 'text-xs px-2 py-2',
                props.size == 'md' && 'text-md px-4 py-2', 
                props.size == 'lg' && 'text-lg px-6 py-3',
                !props.size && 'text-md px-4 py-2',
                `${props.className} text-white`
                )}
            type={props.type || "button"}
            onClick={props.onClick}
        >   
            {props.children}
        </button>
    )
}