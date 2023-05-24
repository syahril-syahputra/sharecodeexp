import moment from "moment";
import LightButton from "@/components/Interface/Buttons/LightButton"
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal"
export default function VerifyOrder(props){

    return (
        <BaseModalMedium
            title="Accept Quotation"
            onClick={() => props.closeModal()}
            body={
                <>
                    <p className="text-blueGray-500 text-lg leading-relaxed italic">
                        Quotation Expiration Date: <span className="text-blueGray-700 font-bold">{moment(props.expirationDate).format('dddd, D MMMM YYYY')}</span>
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">Accept</span> this Quotation?
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
                        No, Close
                    </LightButton>

                    <PrimaryButton
                        disabled={props.isLoading}
                        className="font-bold uppercase"
                        onClick={() => props.acceptance()}>
                        {props.isLoading &&
                            <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                        }
                        Yes, Accept
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    );
}