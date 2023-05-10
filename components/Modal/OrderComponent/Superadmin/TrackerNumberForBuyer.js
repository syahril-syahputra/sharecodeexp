import { useState } from "react"
import InputForm from "@/components/Shared/InputForm";
import AcceptButton from "@/components/Buttons/AcceptButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function VerifyOrder(props){
    const [buyerTracker, setBuyerTracker] = useState('')
    const setDataHandler = (item, inputName) => {
        setBuyerTracker(item.value)
    }

    return (
        <BaseModalMedium
            title="Provide Tracking Information"
            onClick={() => props.closeModal()}
            body={
                <>
                    <TextInput
                        label="Tracker Number"
                        name="buyerTracker"
                        value={buyerTracker}
                        onChange={(input) => setBuyerTracker(input.value)}
                        errorMsg={props.errorInfo?.trackingBuyer}
                    ></TextInput>
                    <p className="mt-2 italic text-blueGray-500 text-sm leading-relaxed">
                       This tracker will be send to the buyer.
                    </p>
                </>
            }   
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="font-bold uppercase mr-2"
                        onClick={() => props.closeModal()}
                        >
                        Close
                    </LightButton>
                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase"
                        onClick={() => props.acceptance(buyerTracker)}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Set Tracker
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    );
}


