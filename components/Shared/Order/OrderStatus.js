export default function OrderStatus(props){
 return (
    <>
        <div className="px-4 py-3 border-0 bg-blue-500">
            <div className="flex justify-center">
                <div className=" text-center">
                    <h4
                        className="font-semibold text-lg text-white uppercase">
                            {props.status}
                    </h4>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="text-center">
                    <h4
                        className="font-semibold text-sm text-white italic">
                        {props.action}
                    </h4>
                </div>
            </div>
            {!props.action && !props.status &&
                <div className='mt-2 mb-2 text-center'>
                    <i className="fas fa-hourglass fa-spin text-white fa-xl"></i>
                </div>
            }
        </div>
    </>
 )
}