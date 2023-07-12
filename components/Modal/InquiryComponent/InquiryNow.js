import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function InquireNow(props) {

  return (
    <BaseModalMedium
      title="Inquire Now"
      onClick={() => props.setShowModal(false)}
      body={
        <>
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Are you sure you want to inquire product <span className="text-blueGray-700 font-bold">{props.title}</span> for <span className="text-blueGray-700 font-bold">{props.orderQuantity}</span> pcs?
          </p>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            className="font-bold uppercase mr-2"
            onClick={() => props.setShowModal(false)}
          >
            No, Close
          </LightButton>
          <PrimaryButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => props.acceptModal()}
          >
            {props.isLoading &&
                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            }
            Yes, Inquire Now
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  );
}