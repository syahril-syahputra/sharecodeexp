export default function HeaderTable(props){
    return (
        <div className="px-2 py-3">        
            <div className="flex flex-wrap items-center justify-between">
                <div className="relative px-4">
                    <h2 className="font-semibold text-lg text-blueGray-700">
                        {props.title}
                    </h2>
                </div>
                <div className="relative px-4">
                    {props.action}
                </div>
            </div>
        </div>
    )
}