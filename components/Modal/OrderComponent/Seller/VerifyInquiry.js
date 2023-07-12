import { useEffect, useState } from "react";
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import NumberInput from "@/components/Interface/Form/NumberInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function VerifyOrder(props){
    const [inputData, setInputData] = useState(
        {
            id: props.orderId,
            AvailableQuantity: props.availableQty,
            moq: props.moq,
            dateCode: props.dateCode,
            price: 0
        }
    )
    const [total, setTotal] = useState(0)

    const [errorInfo, setErrorInfo] = useState(props.errorInfo)
    const setDataHandler = (input) => {
        setErrorInfo()
        setInputData({...inputData, [input.name]:input.value})
    }

    const [updatedMOQ, setUpdatedMOQ] = useState()
    const setAQHandler = (input) => {
        setInputData({...inputData, [input.name]:input.value})

        if(parseInt(input.value) < parseInt(inputData.moq)) {
            setUpdatedMOQ(input.value)
        } else {
            setUpdatedMOQ()
        }
    }

    useEffect(() => {
        let total = props.orderQty * inputData.price
        setTotal(total)
    }, [inputData.price])

    const handleVerify = () => {
        if(inputData.price == 0 && inputData.AvailableQuantity != 0) {
            setErrorInfo({price: ["Price can not be 0"]})
            return
        }
        
        let finalData = inputData
        if(updatedMOQ) {
            finalData.moq = updatedMOQ

        }
        props.acceptance(finalData)
    }

    return (
        <BaseModalLarge
            title="Verify Inquiry"
            onClick={() => props.closeModal()}
            body={
                <>
                    <div className=""> 
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 pr-4">
                                <TextInput
                                    className="cursor-not-allowed"
                                    label="Order Quantity"
                                    required
                                    disabled
                                    value={props.orderQty}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 pr-4">
                                <NumberInput
                                    required
                                    label="Available Quantity"
                                    name="AvailableQuantity"
                                    value={inputData.AvailableQuantity}
                                    onChange={(input) => setAQHandler(input)}
                                    errorMsg={errorInfo?.AvailableQuantity}
                                />
                            </div>
                            <div className="w-1/2">
                                <NumberInput
                                    required
                                    label="MOQ"
                                    name="moq"
                                    value={inputData.moq}
                                    onChange={(input) => setDataHandler(input)}
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
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 pr-4">
                                <TextInput
                                    label="Date Code"
                                    required
                                    name="dateCode"
                                    value={inputData.dateCode}
                                    onChange={(input) => setDataHandler(input)}
                                    errorMsg={errorInfo?.dateCode}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-1/2 pr-4">
                                <NumberInput
                                    label="Price per Item ($)"
                                    disabled={props.isLoading}
                                    required
                                    step={0.01}
                                    name="price"
                                    value={inputData.price}
                                    errorMsg={errorInfo?.price}
                                    onChange={(input) => setDataHandler(input)}
                                />
                            </div>
                            <div className="w-1/2 pr-4 mb-6">
                                <NumberInput
                                    label="Total ($)"
                                    className="cursor-not-allowed"
                                    disabled
                                    step={0.01}
                                    value={total}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-slate-500 italic">
                        <p>Note: If you don’t want to sell this item, you may edit the available quantity to 0 (zero) pieces. 
                            Your input will be updated in the database and members will not inquire until further quantity change.</p>
                    </div>
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
                        className="font-bold uppercase"
                        onClick={handleVerify}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Edit & Verify
                    </PrimaryButton>
                </>
            }
        ></BaseModalLarge>
    );
}