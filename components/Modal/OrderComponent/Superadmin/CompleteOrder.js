import { useState } from "react";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import ErrorInput from '@/components/Shared/ErrorInput';
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
export default function CompleteOrder(props){
    const [invoiceDocs, setInvoiceDocs] = useState()
    const handleSubmit = () => {
        props.acceptance(invoiceDocs)
    }

    return (
        <BaseModalMedium 
            title="Complete Order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">Complete</span> this Order?
                    </p>
                    <div className="w-full mt-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Input Invoice to Seller
                        </label>
                        <div className="p-5 border-dashed border-2 border-indigo-200">
                            <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                <div className='text-center my-auto'>
                                    <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                </div>
                                <div className="text-xs ">
                                    <p>PDF file size no more than 10MB</p>
                                    <input 
                                        className="mt-3" 
                                        type="file"
                                        name='invoiceDocs'
                                        accept='.pdf'
                                        onChange={({target}) => 
                                            setInvoiceDocs(target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {props.errorInfo.PaymentProof &&
                            <ErrorInput error={props.errorInfo.PaymentProof}/>
                        }
                    </div>
                </>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                    >No, Close</LightButton>

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase "
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Complete Order
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
                <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                       Complete Order
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
                            Do you agree to <span className="text-blueGray-700 font-bold">Complete</span> this Order?
                        </p>
                        <div className="w-full mt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Input Invoice to Seller
                            </label>
                            <div className="p-5 border-dashed border-2 border-indigo-200">
                                <div className='grid gap-4 lg:grid-cols-2 md:grid-cols-1'>
                                    <div className='text-center my-auto'>
                                        <i className="fas fa-upload text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                                    </div>
                                    <div className="text-xs ">
                                        <p>PDF file size no more than 10MB</p>
                                        <input 
                                            className="mt-3" 
                                            type="file"
                                            name='invoiceDocs'
                                            accept='.pdf'
                                            onChange={({target}) => 
                                                setInvoiceDocs(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo.PaymentProof &&
                                <ErrorInput error={props.errorInfo.PaymentProof}/>
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

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase "
                        onClick={handleSubmit}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Complete Order
                    </PrimaryButton>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}