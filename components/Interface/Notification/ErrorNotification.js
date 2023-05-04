export default function ErrorNotification(props){
    return(
        <div className="shadow-md hover:shadow-lg transition-all">
            <div className="text-white px-6 py-3 border-0 mb-4 mt-5 bg-red-500">
                <div className="flex justify-between">
                    <div>
                        <span className="text-xl inline-block mr-5">
                            <i className="fas fa-bell"></i>
                        </span>
                        <span className="inline-block">
                            <b>{props.message}</b>
                        </span>
                    </div>
                    <div className="inline-block cursor-pointer" onClick={props.onCloseNotification}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                
            </div>
        </div>
    )

}