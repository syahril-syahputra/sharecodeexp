export default function LightButton(props){
    if(props.outline) {
        return (
            <button
                disabled={props.disabled}
                className={`
                    ${props.disabled ? 'outline outline-blue-50 text-blue-100' : 'outline outline-blue-100 text-black hover:text-white hover:bg-blue-100 focus:outline-blue-100 focus:ring shadow hover:shadow-lg ease-linear transition-all duration-150'} 
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
                ${props.disabled ? 'bg-blue-50 text-slate-400' : 'bg-blue-100 active:bg-blue-200 text-black shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'} 
                ${props.size == 'sm' && 'text-xs px-2 py-1 m-1'}
                ${props.size == 'md' && 'text-md px-4 py-2 m-2'} 
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