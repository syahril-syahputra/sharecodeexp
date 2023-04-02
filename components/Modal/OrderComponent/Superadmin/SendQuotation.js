import { useEffect, useState } from "react";
import InputForm from "@/components/Shared/InputForm";
import InputNumberForm from "@/components/Shared/InputNumberForm";
import AcceptButton from "@/components/Buttons/AcceptButton"
export default function SendQuotation(props){
    const [inputData, setInputData] = useState(
        {
            id: props.orderId,
            price_profite: 0
        }
    )
    const [total, setTotal] = useState(0)

    const [errorInfo, setErrorInfo] = useState(props.errorInfo)
    const setDataHandler = (item, inputName) => {
        setInputData({...inputData, [inputName]:item.value})
    }

    useEffect(() => {
        let total = props.orderQty * inputData.price_profite
        setTotal(total)
    }, [inputData.price_profite])
    
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
                        Verify Inquiry
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
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3 mb-6">
                                <InputForm
                                    isDisabled={true}
                                    label="Order Quantity"
                                    type="number"
                                    value={props.orderQty}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3 mb-6">
                                <InputNumberForm
                                    label="Price per Item ($)"
                                    numberStep={0.01}
                                    inputDataName="price_profite"
                                    value={inputData.price_profite}
                                    setData={setDataHandler}
                                    errorMsg={errorInfo?.price_profite}
                                />
                            </div>

                            <div className="w-1/2 px-3 mb-6">
                                <InputNumberForm
                                    isDisabled
                                    label="Total ($)"
                                    numberStep={0.01}
                                    value={total}
                                />
                            </div>
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
                        buttonTitle="Send Quotation"
                        isLoading={props.isLoading}
                        onClick={() => props.acceptance(inputData)}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}