import React, { useState } from 'react'
import AreaInput from '@/components/Interface/Form/AreaInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'

export default function HelpRequestModal(props) {
  const [stateSubject, setStateSubject] = useState()
  const [stateMessage, setStateMessage] = useState()
  const handleHelpRequest = () => {
    props.acceptModal(stateSubject, stateMessage)
  }

  return (
    <BaseModalMedium
      title="Help Request"
      onClick={() => props.setShowModal(false)}
      body={
        <>
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to help request?
          </p>
          <div className="w-full py-2">
            <TextInput
              label="Subject"
              name="stateSubject"
              placeholder="Write your subject here"
              value={stateSubject}
              onChange={(input) => setStateSubject(input.value)}
              errorMsg={props.errorInfo?.stateSubject}
            />
          </div>
          <div className="w-full py-2 ">
            <AreaInput
              name="stateMessage"
              required
              rows={4}
              label="Message"
              placeholder="Write your message here"
              value={stateMessage}
              errorMsg={props.errorInfo?.stateMessage}
              onChange={(input) => setStateMessage(input.value)}
            />
          </div>
        </>
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
            disabled={props.isLoading || !stateSubject || !stateMessage}
            className="font-bold uppercase"
            onClick={handleHelpRequest}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Help Request
          </DangerButton>
        </>
      }
    ></BaseModalMedium>
  )
}
