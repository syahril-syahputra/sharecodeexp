export default function OrderTodo(props){
 return (
    <>
        <div className="px-4 py-3 border-0 bg-teal-500">
            <div className="flex justify-center">
                <div className=" text-center">
                    <h4
                        className="font-semibold text-md text-white uppercase">
                            Action to take
                    </h4>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="text-center">
                    <h4
                        className="font-semibold text-sm text-white italic">
                        {props.action}
                    </h4>
                    {!props.action &&
                        <div className='mt-2'>
                            <i className="fas fa-hourglass fa-spin text-white fa-xl"></i>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
 )
}