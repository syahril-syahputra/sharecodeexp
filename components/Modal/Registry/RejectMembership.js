import { useState } from "react"
import DangerButton from "@/components/Interface/Buttons/DangerButton";
import AreaInput from "@/components/Interface/Form/AreaInput"
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function RejectMembership(props){
  const [rejectMessage, setRejectMessage] = useState()

  const handleReject = () => {
      props.acceptModal(rejectMessage)
  } 

  return (
    <>
      <BaseModalMedium
        title="Reject Company"
        onClick={() => props.setShowModal(false)}
        body={
          <div className="">
            <p className="text-blueGray-500 text-lg leading-relaxed">
              Do you want to reject <span className="text-blueGray-700 font-bold">{props.companyName}</span> Member Status?
            </p>
            <AreaInput
                name="message"
                required
                rows={8}
                placeholder="Write your reason here before rejecting"
                value={rejectMessage}
                errorMsg={props.errorInfo?.messages}
                onChange={(input) => setRejectMessage(input.value)}
            />          
          </div>
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
                disabled={props.isLoading || !rejectMessage}
                className="font-bold uppercase"
                onClick={handleReject}>
                {props.isLoading &&
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                }
                Yes, Reject
            </DangerButton>
          </>
        }
      />
    </>
  )
}
