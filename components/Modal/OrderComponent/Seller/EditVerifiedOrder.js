import { useEffect, useState } from "react";
import InputForm from "@/components/Shared/InputForm";
import InputNumberForm from "@/components/Shared/InputNumberForm";
import AcceptButton from "@/components/Buttons/AcceptButton"
export default function EditVerifiedOrder(props){
    const [inputData, setInputData] = useState(
        {
            id: props.orderId,
            AvailableQuantity: props.availableQty,
            moq: props.moq,
            dateCode: props.dateCode,
            price: props.price
        }
    )
    const [total, setTotal] = useState(0)

    const [errorInfo, setErrorInfo] = useState(props.errorInfo)
    const setDataHandler = (item, inputName) => {
        setErrorInfo()
        setInputData({...inputData, [inputName]:item.value})
    }

    const [updatedMOQ, setUpdatedMOQ] = useState()
    const setAQHandler = (item, inputName) => {
        setInputData({...inputData, [inputName]:item.value})

        if(parseInt(item.value) < parseInt(inputData.moq)) {
            setUpdatedMOQ(item.value)
        } else {
            setUpdatedMOQ()
        }
    }

    useEffect(() => {
        let total = props.orderQty * inputData.price
        setTotal(total)
    }, [inputData.price])

    const handleVerify = () => {
        if(inputData.price == 0) {
            setErrorInfo({price: "Price can not be 0"})
            return
        }
        
        let finalData = inputData
        if(updatedMOQ) {
            finalData.moq = updatedMOQ

        }

        props.acceptance(finalData)
    }
    
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
                        Edit Verified Order
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
                                <InputForm
                                    label="Available Quantity"
                                    inputType="number"
                                    inputDataName="AvailableQuantity"
                                    value={inputData.AvailableQuantity}
                                    setData={setAQHandler}
                                    errorMsg={errorInfo?.AvailableQuantity}
                                />
                            </div>
                            <div className="w-1/2 px-3 mb-6">
                                <InputForm
                                    label="MOQ"
                                    inputType="number"
                                    inputDataName="moq"
                                    value={inputData.moq}
                                    setData={setDataHandler}
                                    errorMsg={errorInfo?.moq}
                                />
                                {updatedMOQ && 
                                <div className="mt-1 text-slate-500"  title="MOQ will updated if Available Quantity is lowest than MOQ">
                                    <i>MOQ will updated to: {updatedMOQ}
                                        <i className="fas fa-question-circle ml-2 mt-2"></i>
                                    </i>
                                </div>
                                }
                            </div>                            
                            <div className="w-1/2 px-3 mb-6">
                                <InputForm
                                    label="Date Code"
                                    inputDataName="dateCode"
                                    value={inputData.dateCode}
                                    setData={setDataHandler}
                                    errorMsg={errorInfo?.dateCode}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3 mb-6">
                                <InputNumberForm
                                    label="Price per Item ($)"
                                    numberStep={0.01}
                                    inputDataName="price"
                                    value={inputData.price}
                                    setData={setDataHandler}
                                    errorMsg={errorInfo?.price}
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
                    <div className="text-slate-500 italic">
                        <p>Note: If you don’t want to sell this item, you may edit the Available Quantity to 0 (zero) pieces. 
                            Your input will be updated in the database and members will not inquire until further quantity change.</p>
                    </div>
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
                        buttonTitle="Verify"
                        isLoading={props.isLoading}
                        onClick={handleVerify}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}