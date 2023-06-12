import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";
import DangerButton from "@/components/Interface/Buttons/DangerButton";

export default function RemoveCompany(props){
  return (
    <>
      <BaseModalMedium
        title="Remove Company"
        onClick={() => props.setShowModal(false)}
        body={
          <p className="my-4 text-red-500 text-lg leading-relaxed">
            Do you want to REMOVE <span className="text-blueGray-700 font-bold">{props.companyName}</span> as our Exepart's member?
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
            <DangerButton
                disabled={props.isLoading}
                className="font-bold uppercase"
                onClick={() => props.acceptModal()}>
                {props.isLoading &&
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                }
                Yes, Remove
            </DangerButton>
          </>
        }
      />
    </>
  )
}
