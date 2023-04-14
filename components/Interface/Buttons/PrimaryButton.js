export default function PrimaryButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'outline outline-blue-300 text-blue-300' : 'outline outline-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-blue-500 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
                    ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                    ${props.size == 'md' && 'text-md px-4 py-1 m-2'} 
                    ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                    ${!props.size && 'text-md px-4 py-2 m-2'} 
                    ${props.className}
                    `}
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
                ${props.disabled ? 'bg-blue-300' : 'bg-blue-500 active:bg-blue-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                ${props.size == 'md' && 'text-md px-4 py-2 m-2'} 
                ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                ${!props.size && 'text-md px-4 py-2 m-2'} 
                ${props.className}
                text-white`}
            type={props.type || "button"}
            onClick={props.onClick}
        >   
            {props.children}
        </button>
    )
}