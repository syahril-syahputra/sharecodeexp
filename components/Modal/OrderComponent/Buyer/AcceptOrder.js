import AcceptButton from "@/components/Buttons/AcceptButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
export default function AcceptOrder(props){
    return (
        <BaseModalMedium
            title="Accept Order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Do you want to <span className="text-blueGray-700 font-bold">Accept</span> this Order?
                    </p>
                </>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                        >
                        No, Close
                    </LightButton>

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase "
                        onClick={() => props.acceptance()}
                    >
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Accept
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    )
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
                        Accept Order
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
                            Do you agree to <span className="text-blueGray-700 font-bold">Accept</span> this Order?
                        </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => props.closeModal()}
                    >
                        Close
                    </button>

                    <AcceptButton
                        buttonTitle="Accept"
                        isLoading={props.isLoading}
                        onClick={() => props.acceptance()}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


