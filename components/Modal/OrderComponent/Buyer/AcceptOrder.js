import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
export default function AcceptOrder(props){
    return (
        <BaseModalMedium
            title="Accept Order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Do you confirm that you <span className="text-blueGray-700 font-bold">received</span> the shippment?
                    </p>
                </>
            }
            action={
                <>
                    <LightButton
                        disabled={props.isLoading}
                        className="mr-2"
                        size="sm"
                        onClick={() => props.closeModal()}
                        >
                        No, Close
                    </LightButton>

                    <PrimaryButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={() => props.acceptance()}
                    >
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Confirm
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    )
}


