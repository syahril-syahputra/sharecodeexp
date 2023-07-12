import { useState } from "react"
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
                        Do you agree to <span className="text-blueGray-700 font-bold">reject</span> this payment?
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
}