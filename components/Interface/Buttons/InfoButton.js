export default function WarningButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'outline outline-teal-300 text-teal-300' : 'outline outline-teal-500 text-teal-500 hover:text-white hover:bg-teal-500 focus:outline-teal-500 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
                    ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                    ${props.size == 'md' && 'text-md px-4 py-1 m-2'} 
                    ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                    ${!props.size && 'text-md px-4 py-2 m-2'} 
                    font-bold uppercase`}
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
                ${props.disabled ? 'bg-teal-300' : 'bg-teal-500 active:bg-teal-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                ${props.size == 'md' && 'text-md px-4 py-2 m-2'} 
                ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                ${!props.size && 'text-md px-4 py-2 m-2'} 
                font-bold uppercase text-white`}
            type={props.type || "button"}
            onClick={props.onClick}
        >   
            {props.children}
        </button>
    )
}