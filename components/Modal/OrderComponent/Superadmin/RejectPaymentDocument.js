import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import RejectButton from "@/components/Buttons/RejectButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import DangerButton from "@/components/Interface/Buttons/DangerButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import AreaInput from "@/components/Interface/Form/AreaInput";
export default function RejectPaymentDocument(props){
    const [rejectionReason, setRejectionReason] = useState('')

    const handleRejection = () => {
        props.acceptance(rejectionReason)
    }

    return (
        <BaseModalMedium
            title="Reject Payment"
            onClick={() => props.closeModal()}
            body={
                <div className="">
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">Reject</span> this Payment?
                    </p>
                    <AreaInput
                        name="reason"
                        required
                        rows={8}
                        placeholder="Write your reason here before rejecting"
                        value={rejectionReason}
                        errorMsg={props.errorInfo?.reason}
                        onChange={(input) => setRejectionReason(input.value)}
                    /> 
                </div>
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

                    <DangerButton
                        disabled={props.isLoading || !rejectionReason}
                        className="font-bold uppercase"
                        onClick={handleRejection}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Reject Payment
                    </DangerButton>
                </>
            }
        ></BaseModalMedium>
    )

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                       Reject Payment
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
                    <div className="relative p-6 flex-auto">

                    {/* <form onSubmit={handleSubmit} ref={refdata}> */}
                    <form className="">
                        <p className="text-blueGray-500 text-lg leading-relaxed">
                            Do you agree to <span className="text-blueGray-700 font-bold">Reject</span> this Payment?
                        </p>
                        <div className="w-full mb-6 mt-10">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Rejection Reason
                            </label>
                            <textarea 
                                placeholder="Write rejection reason for buyer, click Reject Payment to Continue."
                                value={rejectionReason}
                                onChange={({target}) => 
                                    setRejectionReason(target.value)
                                }
                                autoComplete="off" 
                                type="text"
                                className="shadow-sm placeholder-slate-300 appearance-none w-full bg-white text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                            {props.errorInfo?.reason &&
                                <ErrorInput error={props.errorInfo?.reason}/>
                            }
                        </div>
                    </form>
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

                    {rejectionReason &&
                        <RejectButton
                            buttonTitle="Reject Payment"
                            isLoading={props.isLoading}
                            onClick={handleRejection}
                        />
                    }

                    {!!rejectionReason == false &&
                        <RejectButton
                            buttonTitle="Reject Payment"
                            isLoading={true}
                            onClick={handleRejection}
                        />
                    }
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}