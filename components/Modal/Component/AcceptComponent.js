import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import LightButton from "@/components/Interface/Buttons/LightButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
export default function AcceptComponent(props) {
  return (
    <BaseModalMedium
      title="Approve Component"
      onClick={() => props.setShowModal(false)}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to approve <span className="text-blueGray-700 font-bold">{props.itemName}</span> as a Registered Component?
        </p>
      }
      action={
        <>
          <LightButton
            className="font-bold uppercase mr-2"
            onClick={() => props.setShowModal(false)}
          >
            No, Close
          </LightButton>

          <PrimaryButton
              disabled={props.isLoading}
              className="font-bold uppercase"
              onClick={() => props.acceptModal()}>
              {props.isLoading &&
                  <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
              }
              Yes, Approve
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  ) 
}