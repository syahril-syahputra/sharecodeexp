import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function AcceptPayment(props){
    return (
        <BaseModalMedium
            title="Accept Payment"
            onClick={() => props.closeModal()}
            body={
                <>
                    <div className="">
                        <p className="text-blueGray-500 text-lg leading-relaxed">
                            Do you agree to <span className="text-blueGray-700 font-bold">accept</span> this payment?
                        </p>

                        <div>
                            *showing payment document
                        </div>
                    </div>
                </>
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

                    <PrimaryButton
                        disabled={props.isLoading}
                        size="sm"
                        onClick={() => props.acceptance()}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Accept Payment
                    </PrimaryButton>                 
                </>
            }
        ></BaseModalMedium>
    );
}