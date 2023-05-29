export default function DangerButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'border border-red-300 text-red-300' : 'border border-red-500 text-red-500 hover:text-white hover:bg-red-500 focus:border-red-500 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
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
                ${props.disabled ? 'bg-red-300' : 'bg-red-500 active:bg-red-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-2'}
                ${props.size == 'md' && 'text-md px-4 py-2'} 
                ${props.size == 'lg' && 'text-lg px-6 py-3'}
                ${!props.size && 'text-md px-4 py-2'} 
                ${props.className}
                text-white`}
            type={props.type || "button"}
            onClick={props.onClick}
        >   
            {props.children}
        </button>
    )
}