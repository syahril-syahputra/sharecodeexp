import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function PendingComponent(props) {
  return (
    <BaseModalMedium
      title="Pending Component"
      onClick={() => props.setShowModal(false)}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          {/* Do you want to change <span className="text-blueGray-700 font-bold">{props.itemName}</span> Component Status? */}
          Do you want to change the product status into pending?
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

          <WarningButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => props.acceptModal()}
          >
            {props.isLoading &&
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            }
            Yes, Pending
          </WarningButton>
        </>
      }
    ></BaseModalMedium>
  )
 
}