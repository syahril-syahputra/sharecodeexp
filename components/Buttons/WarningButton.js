export default function InfoButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'outline outline-orange-300 text-orange-300' : 'outline outline-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 focus:outline-orange-500 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
                    ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                    ${props.size == 'md' && 'text-md px-4 py-1 m-2'} 
                    ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                    ${!props.size && 'text-md px-4 py-2 m-2'} 
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
                ${props.disabled ? 'bg-orange-300' : 'bg-orange-500 active:bg-orange-600 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                ${props.size == 'md' && 'text-md px-4 py-1 m-2'} 
                ${props.size == 'lg' && 'text-lg px-6 py-2 m-2'}
                ${!props.size && 'text-md px-4 py-2 m-2'} 
                text-white`}
            type={props.type || "button"}
            onClick={props.onClick}
        >   
            {props.children}
        </button>
    )
}