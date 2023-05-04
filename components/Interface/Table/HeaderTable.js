export default function HeaderTable(props){
    return (
        <div className="px-2 py-3">        
            <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                    {props.title}
                </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    {props.action}
                </div>
            </div>
        </div>
    )
}