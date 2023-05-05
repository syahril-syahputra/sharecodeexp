import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function AcceptMembership(props){
  return (
    <>
      <BaseModalMedium
        title="Accept Company"
        onClick={() => props.setShowModal(false)}
        body={
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to accept <span className="text-blueGray-700 font-bold">{props.companyName}</span> as a Registered Member?
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
                Yes, Accept
            </PrimaryButton>
          </>
        }
      />
    </>
  )
}
