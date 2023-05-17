import { useEffect, useState } from "react";
import { BaseModalLarge } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import NumberInput from "@/components/Interface/Form/NumberInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function SendQuotation(props){
    const [inputData, setInputData] = useState(
        {
            id: props.orderId,
            price_profite: 0,
            quotation_expiration_date: ''
        }
    )
    const [total, setTotal] = useState(0)

    const [errorInfo, setErrorInfo] = useState(props.errorInfo)
    const setDataHandler = (input) => {
        setInputData({...inputData, [input.name]:input.value})
    }

    useEffect(() => {
        let total = props.orderQty * inputData.price_profite
        setTotal(total)
    }, [inputData.price_profite])

    return (
        <>
            <BaseModalLarge
                title="Verify Inquiry & Send Quotation"
                onClick={() => props.closeModal()}
                body={
                    <div className=""> 
                        <div className="flex flex-wrap">
                            <div className="w-1/2 px-3 mb-6">
                                <TextInput
                                    className="cursor-not-allowed"
                                    label="Order Quantity"
                                    required
                                    disabled
                                    value={props.orderQty}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-1/2 px-3 mb-6">
                                <TextInput
                                    label="Quotation Expiration date"
                                    required
                                    type="date"
                                    name="quotation_expiration_date"
                                    value={inputData.quotation_expiration_date}
                                    errorMsg={errorInfo?.quotation_expiration_date}
                                    onChange={(input) => setDataHandler(input)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-1/2 px-3 mb-6">
                                <NumberInput
                                    label="Price per Item ($)"
                                    disabled={props.isLoading}
                                    required
                                    step={0.01}
                                    name="price_profite"
                                    value={inputData.price_profite}
                                    errorMsg={errorInfo?.price_profite}
                                    onChange={(input) => setDataHandler(input)}
                                />
                            </div>

                            <div className="w-1/2 px-3 mb-6">
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
                            onClick={() => props.acceptance(inputData)}>
                            {props.isLoading &&
                                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                            }
                            Send Quotation
                        </PrimaryButton>
                    </>
                }
            ></BaseModalLarge>
        </>
    )
}