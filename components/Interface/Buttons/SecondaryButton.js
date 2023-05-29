export default function SecondaryButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'border border-indigo-300 text-indigo-300' : 'border border-indigo-800 text-indigo-800 hover:text-white hover:bg-indigo-800 focus:border-indigo-800 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
                    ${props.size == 'sm' && 'text-xs px-2 py-1'}
                    ${props.size == 'md' && 'text-md px-4 py-2'} 
                    ${props.size == 'lg' && 'text-lg px-6 py-3'}
                    ${!props.size && 'text-md px-4 py-2'} 
                    ${props.className}
                    bg-white`}
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
            className={`
                ${props.disabled ? 'bg-indigo-300' : 'bg-indigo-800 active:bg-indigo-900 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-2'}
                ${props.size == 'md' && 'text-md px-4 py-2'} 
                ${props.size == 'lg' && 'text-lg px-6 py-5'}
                ${!props.size && 'text-md px-4 py-2'} 
                ${props.className}
                text-white `}
            type={props.type || "button"}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}