export default function DangerNotification(props){
    return (
        <div className="mb-5 shadow-md hover:shadow-lg transition-all flex justify-between items-center text-white p-4 space-x-4 bg-red-500">
            <span className="text-xl">
                <i className="fas fa-bell"></i>
            </span>
            <div className="text-sm font-normal w-full">
                <span className="mb-1 text-sm font-semibold">{props.message}</span>
                {props.detail && 
                    <div className="mb-2 text-sm font-normal">{props.detail}</div>   
                }
            </div>
            {props.onCloseNotification && 
                <div className="inline-block cursor-pointer items-end" onClick={props.onCloseNotification}>
                    <i className="fas fa-times"></i>
                </div>
            }
        </div>
    ) 

}