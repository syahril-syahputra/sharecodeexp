import { useState } from "react"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import FileInput from "@/components/Interface/Form/FileInput";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function CompleteOrder(props){
    const [adminReceipt, setAdminReceipt] = useState('')
    const [orderArrived, setOrderArrived] = useState('')

    const handleOrderArrived = () => {
        setOrderArrived(prev => !prev)
    }

    const handlerUpload = () => {
        props.acceptance(adminReceipt, orderArrived)
    }

    return (
        <BaseModalMedium
            title="Complete Order"
            onClick={() => props.closeModal()}
            body={
                <div>  
                    <div className="mb-6">
                        <FileInput
                            description="Input PDF (.pdf) only, max 10MB"
                            accept=".pdf"
                            name="File Upload"
                            required
                            onChange={(target) => setAdminReceipt(target.files[0])}
                            errorMsg={props.errorInfo?.admin_receipt}
                        />
                    </div>
                    <div className="w-full">
                        {props.errorInfo?.order_arrived &&
                            <div>
                                <span className="font-light text-sm">
                                    <i className="text-red-500">{props.errorInfo?.order_arrived}</i>
                                </span>
                            </div>
                        }
                        <input name="order" id="order" type="checkbox" checked={orderArrived} onChange={handleOrderArrived} className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                        <label htmlFor="order" className="ml-2 text-sm font-medium text-gray-900 italic">Order is arrived</label>
                    </div>

                </div>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        size="sm"
                        className="mr-2"
                        onClick={() => props.closeModal()}
                        >
                        Close
                    </LightButton>
                    <PrimaryButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={handlerUpload}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Complete Order
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    )
}