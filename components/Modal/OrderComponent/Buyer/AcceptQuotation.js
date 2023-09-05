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
                    <p className="text-blueGray-500 text-md leading-relaxed italic">
                        Quotation Expiration Date: <span className="text-blueGray-700 font-bold">{moment(props.expirationDate).format('dddd, D MMMM YYYY')}</span>
                    </p>
                    <p className="mb-5 text-blueGray-500 text-lg leading-relaxed">
                        Do you agree to <span className="text-blueGray-700 font-bold">accept</span> this quotation?
                    </p>
                    <span>*preview quotation here</span>
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
                        Yes, Accept
                    </PrimaryButton>
                </>
            }
        ></BaseModalMedium>
    );
}