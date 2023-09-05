import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
export default function DidntReceiveAny(props){
    return (
        <BaseModalMedium
            title="Didn't receive any order"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure didn't receive <span className="text-blueGray-700 font-bold">any order</span>?
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
                        Close
                    </LightButton>
                    <WarningButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={() => props.acceptance()}
                    >
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Confirm
                    </WarningButton>
                </>
            }
        ></BaseModalMedium>
    )
}


