import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import AreaInput from '@/components/Interface/Form/AreaInput'
import DangerButton from '@/components/Interface/Buttons/DangerButton'

export default function RequestUpdateTestingPayment(props) {
  const [reason, setreason] = useState('')

  const handleSubmit = () => {
    props.acceptance(reason)
  }

  return (
    <BaseModalMedium
      title="Request Update Testing Payment"
      onClick={() => props.closeModal()}
      body={
        <div className="mb-4">
          <AreaInput
            label="Reason"
            name="reason"
            value={reason}
            onChange={(input) => setreason(input.value)}
            errorMsg={props.errorInfo?.order_termination_reason}
          ></AreaInput>
        </div>
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
            Request
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
