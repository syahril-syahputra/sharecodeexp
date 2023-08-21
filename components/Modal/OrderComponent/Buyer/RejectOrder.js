import { useState } from "react";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import DangerButton from "@/components/Interface/Buttons/DangerButton";
import AreaInput from "@/components/Interface/Form/AreaInput";
export default function AcceptOrder(props){
    const [rejectionReason, setRejectionReason] = useState()

    const handleRejection = () => {
        props.acceptance(rejectionReason)
    }

    return (
        <BaseModalMedium
            title="Reject Order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="text-blueGray-500 text-lg leading-relaxed mb-4">
                        Do you agree to <span className="text-blueGray-700 font-bold">reject</span> this order?
                    </p>
                    <div className="w-full mb-6">
                        <AreaInput
                            label="Rejection Reason"
                            placeholder="Write rejection reason for our expert, click Reject order to continue."
                            value={rejectionReason}
                            rows={5}
                            onChange={(input) => 
                                setRejectionReason(input.value)
                            }
                            errorMsg={props.errorInfo?.reason}
                        ></AreaInput>
                    </div>
                </>
            }
            action={
                <>
                    <LightButton
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                    >
                        No, Close
                    </LightButton>

                    <DangerButton
                        disabled={props.isLoading || !rejectionReason}
                        className="font-bold uppercase"
                        onClick={handleRejection}
                    >
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Reject
                    </DangerButton>
                </>
            }
        ></BaseModalMedium>
    );
}