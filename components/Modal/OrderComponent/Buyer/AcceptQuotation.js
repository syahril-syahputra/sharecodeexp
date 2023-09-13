import moment from "moment";
import LightButton from "@/components/Interface/Buttons/LightButton"
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton"
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal"
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import Link from "next/link";
export default function VerifyOrder(props){
    const test_free = parseFloat(props.price * props.quantity) > 1000
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
                    {!test_free &&
                        <p className="text-sm text-orange-500 italic mb-5">The amount to be paid is below $1,000.00, hence this order is charged separately for test payment at the LAB. Check Quotation for more further.</p>
                    }
                    <Link target="_blank" href={`/admin/member/buyer/inquired-product/details/pdf/quotation/${props.orderSlug}`} className="underline text-blue-500">
                        <SecondaryButton size="sm" outline>Open Quotation</SecondaryButton>
                    </Link>
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