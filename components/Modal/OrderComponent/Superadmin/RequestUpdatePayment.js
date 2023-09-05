import { useState } from "react"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import AreaInput from "@/components/Interface/Form/AreaInput";
export default function RequestUpdatePayment(props){
    const [requestUpdate, setRequestUpdate] = useState('')

    const requestHandler = () => {
        props.acceptance(requestUpdate)
    }

    return (
        <BaseModalMedium
            title="Request Update Payment"
            onClick={() => props.closeModal()}
            body={
                <div className="">
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                        Do you want to <span className="text-blueGray-700 font-bold">request update</span> payment?
                    </p>
                    <AreaInput
                        name="reason"
                        required
                        rows={8}
                        placeholder="Write your reason here before request"
                        value={requestUpdate}
                        errorMsg={props.errorInfo?.request_update_payment_reason}
                        onChange={(input) => setRequestUpdate(input.value)}
                    /> 
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
                        No, Close
                    </LightButton>
                    <WarningButton
                        disabled={props.isLoading || !requestUpdate}
                        size="sm"
                        onClick={requestHandler}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Request Update
                    </WarningButton>
                </>
            }
        ></BaseModalMedium>
    )
}