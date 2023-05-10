import { useState } from "react"
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import AreaInput from "@/components/Interface/Form/AreaInput"
import LightButton from "@/components/Interface/Buttons/LightButton";
import { BaseModalMedium } from "@/components/Interface/Modal/BaseModal";

export default function Modal(props) {
  const [messages, setMessages] = useState('Please send additional document to complete your registration')

  const handleSend = () => {
      props.acceptModal(messages)
  }

  return (
    <>
      <BaseModalMedium
        title="Send Email"
        onClick={() => props.setShowModal(false)}
        body={
          <div className="">
            <AreaInput
                label="Message"
                name="message"
                required
                rows={8}
                value={messages}
                errorMsg={props.errorInfo?.messages}
                onChange={(input) => setMessages(input.value)}
            />
          </div>
        }
        action={
          <>
            <LightButton
              className="font-bold uppercase mr-2"
              onClick={() => props.setShowModal(false)}
            >
              Close
            </LightButton>

            <PrimaryButton
                disabled={props.isLoading}
                className="font-bold uppercase"
                onClick={handleSend}>
                {props.isLoading &&
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                }
                Send
            </PrimaryButton>
          </>
        }
      />
    </>
  )
}