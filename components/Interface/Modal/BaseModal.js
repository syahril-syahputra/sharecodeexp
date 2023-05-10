const BackDrop = () => {
    return (
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    )
}

export function BaseModalMedium(props){
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
                <div className="relative w-full h-full max-w-lg md:h-auto">
                    <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                            <h3 className="text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <div
                                className="cursor-pointer p-1 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={props.onClick}
                            >
                                <i className="text-xl text-slate-500 fas fa-times"></i>
                            </div>
                        </div>
                        <div className="relative p-6">
                            {props.body}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                            {props.action}
                        </div>
                    </div>
                </div>
            </div>
            <BackDrop></BackDrop>
        </>
    )
}

export function BaseModalLarge(props){
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div class="relative w-full max-w-4xl max-h-full md:h-auto">
                    <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                            <h3 className="text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <div
                                className="cursor-pointer p-1 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={props.onClick}
                            >
                                <i className="text-xl text-slate-500 fas fa-times"></i>
                            </div>
                        </div>
                        <div className="relative p-6">
                            {props.body}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                            {props.action}
                        </div>
                    </div>
                </div>
            </div>
            <BackDrop></BackDrop>
        </>
    )
}

export function BaseModalXLarge(props){
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div class="relative w-full max-w-7xl max-h-full md:h-auto">
                    <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                            <h3 className="text-3xl font-semibold">
                                {props.title}
                            </h3>
                            <div
                                className="cursor-pointer p-1 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={props.onClick}
                            >
                                <i className="text-xl text-slate-500 fas fa-times"></i>
                            </div>
                        </div>
                        <div className="relative p-6">
                            {props.body}
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                            {props.action}
                        </div>
                    </div>
                </div>
            </div>
            <BackDrop></BackDrop>
        </>
    )
}


