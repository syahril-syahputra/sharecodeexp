import { useState } from "react"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import TextInput from "@/components/Interface/Form/TextInput";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function VerifyOrder(props){
    const [buyerTracker, setBuyerTracker] = useState('')
    const [expectedShippingDateBuyer, setExpectedShippingDateBuyer] = useState('')

    const handleSubmit = () => {
        props.acceptance(buyerTracker, expectedShippingDateBuyer)
    }

    return (
        <BaseModalMedium
            title="Provide Tracking Information"
            onClick={() => props.closeModal()}
            body={
                <>  
                    <div className="mb-4">
                        <TextInput
                            label="Tracker Number"
                            name="buyerTracker"
                            value={buyerTracker}
                            onChange={(input) => setBuyerTracker(input.value)}
                            errorMsg={props.errorInfo?.trackingBuyer}
                        ></TextInput>
                    </div>
                    <div>
                        <TextInput
                            type="date"
                            label="Expected Shipment Date"
                            name="expectedShippingDateBuyer"
                            value={expectedShippingDateBuyer}
                            onChange={(input) => setExpectedShippingDateBuyer(input.value)}
                            errorMsg={props.errorInfo?.expectedShippingDateBuyer}
                        />
                    </div>
                    <p className="mt-8 italic text-blueGray-500 text-sm leading-relaxed">
                        Note: This Tracker and Expected Shipment Date will be send to the buyer.
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
                        onClick={handleSubmit}>
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


