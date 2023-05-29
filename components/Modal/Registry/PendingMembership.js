import WarningButton from "@/components/Interface/Buttons/WarningButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function PendingMembership(props){
  return (
    <>
      <BaseModalMedium
        title="Pending Company"
        onClick={() => props.setShowModal(false)}
        body={
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to pending <span className="text-blueGray-700 font-bold">{props.companyName}</span> status?
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
                onClick={() => props.acceptModal()}>
                {props.isLoading &&
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                }
                Yes, Pending
            </WarningButton>
          </>
        }
      />
    </>
  )
}
