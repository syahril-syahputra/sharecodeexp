import React from 'react'
import AreaInput from '@/components/Interface/Form/AreaInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import { useState } from 'react'
export default function RejectComponent(props) {
  const [rejectMessage, setRejectMessage] = useState()

  const handleReject = () => {
    props.acceptModal(rejectMessage)
  }

  return (
    <BaseModalMedium
      title="Reject Product"
      onClick={() => props.setShowModal(false)}
      body={
        <>
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to reject{' '}
            <span className="text-blueGray-700 font-bold">
              {props.itemName}
            </span>{' '}
            as a product?
          </p>
          <AreaInput
            name="rejectMessage"
            required
            rows={8}
            placeholder="Write your reason here before rejecting"
            value={rejectMessage}
            errorMsg={props.errorInfo?.rejectMessage}
            onChange={(input) => setRejectMessage(input.value)}
          />
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
            disabled={props.isLoading || !rejectMessage}
            className="font-bold uppercase"
            onClick={handleReject}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Reject
          </DangerButton>
        </>
      }
    ></BaseModalMedium>
  )
}
