import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import AreaInput from '@/components/Interface/Form/AreaInput'
import DangerButton from '@/components/Interface/Buttons/DangerButton'

export default function TerminateOrder(props) {
  const [reason, setreason] = useState('')
  const [terminateOrder, setTerminateOrder] = useState('')

  const handleisTerminateOrder = () => {
    setTerminateOrder((prev) => !prev)
  }

  const handleSubmit = () => {
    props.acceptance(reason, terminateOrder)
  }

  return (
    <BaseModalMedium
      title="Terminate Order"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="mb-4">
            <AreaInput
              label="Order Termination Reason"
              name="reason"
              value={reason}
              onChange={(input) => setreason(input.value)}
              errorMsg={props.errorInfo?.order_termination_reason}
            ></AreaInput>
          </div>

          <div>
            <input
              id="policy"
              type="checkbox"
              checked={terminateOrder}
              onChange={handleisTerminateOrder}
              className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="policy"
              className="ml-2 text-sm font-medium text-gray-900 italic"
            >
              Terminate order
            </label>
          </div>
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
          <DangerButton
            disabled={props.isLoading}
            size="sm"
            onClick={handleSubmit}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Terminate
          </DangerButton>
        </>
      }
    ></BaseModalMedium>
  )
}
