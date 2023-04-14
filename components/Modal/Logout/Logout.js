import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function Logout(props){
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full h-full max-w-lg md:h-auto">
                {/*content*/}
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                        Logout
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => props.closeModal()}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6">
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                            Do you agree to <span className="text-blueGray-700 font-bold">Logout</span>?
                        </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => props.closeModal()}
                    >
                        No, Stay
                    </button>

                    <PrimaryButton
                        isLoading={props.isLoading}
                        onClick={() => props.acceptance()}
                    >Yes, Logout</PrimaryButton>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


