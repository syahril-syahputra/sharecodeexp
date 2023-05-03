import { useState } from "react"
import ErrorInput from '@/components/Shared/ErrorInput';
import InputForm from "@/components/Shared/InputForm";
import AcceptButton from "@/components/Buttons/AcceptButton";
export default function SendTracker(props){
    const [sellerTracker, setSellerTracker] = useState('')
    const [paymentAccount, setPaymentAccount] = useState()

    const setDataHandler = (item, inputName) => {
        setSellerTracker(item.value)
    }
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
                       Send Invoice & Tracking Information
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
                    {/* <form onSubmit={handleSubmit} ref={refdata}> */}
                    <form className=""> 
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-3">
                                <InputForm
                                    label="Tracker Number"
                                    inputDataName="sellerTracker"
                                    value={sellerTracker}
                                    setData={setDataHandler}
                                    errorMsg={props.errorInfo?.trackingSeller}
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Payment Account & Invoice
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
                                                setPaymentAccount(target.files[0])
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {props.errorInfo.PaymentDocSeller &&
                                <ErrorInput error={props.errorInfo.PaymentDocSeller}/>
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

                    <AcceptButton
                        buttonTitle="Send"
                        isLoading={props.isLoading}
                        onClick={() => props.acceptance(sellerTracker, paymentAccount)}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}


