import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function VerifyOrder(props) {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmit = () => {
    props.acceptance(trackingNumber)
  }

  return (
    <BaseModalMedium
      title="Provide Tracking Number"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="mb-4">
            <TextInput
              label="Tracking Number"
              name="trackingNumber"
              value={trackingNumber}
              onChange={(input) => setTrackingNumber(input.value)}
              errorMsg={props.errorInfo?.trackingBuyer}
            ></TextInput>
          </div>

          <p className="mt-8 italic text-blueGray-500 text-sm leading-relaxed">
            Note: This tracking number will be send to the buyer.
          </p>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            size="sm"
            className="mr-2"
            onClick={() => props.closeModal()}
          >
            Close
          </LightButton>
          <PrimaryButton
            disabled={props.isLoading}
            size="sm"
            onClick={handleSubmit}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Provide
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
