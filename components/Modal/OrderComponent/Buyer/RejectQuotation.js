import React from 'react'
import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import SelectInput from '@/components/Interface/Form/SelectInput'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

export default function RejectQuotation(props) {
  const [rejectionReason, setRejectionReason] = useState()
  const handleRejectionChange = (value) => {
    setRejectionReason(value)
    setRejectionData(value.value)
    setotherReason('')
  }

  const [rejectionData, setRejectionData] = useState()
  const [otherReason, setotherReason] = useState('')
  const handleRejection = () => {
    if (rejectionData === 'Other' && otherReason === '') {
      toast.error('Please Input Other Reason', toastOptions)

      return
    }
    props.acceptance(rejectionData, otherReason)
  }

  return (
    <BaseModalMedium
      title="Reject Quotation"
      onClick={() => props.closeModal()}
      body={
        <>
          <p className="mb-4 text-blueGray-500 text-lg leading-relaxed">
            Do you agree to{' '}
            <span className="text-blueGray-700 font-bold">reject</span> this
            quotation? Select the reason below to continue rejecting.
          </p>
          <div className="w-full mb-6">
            <SelectInput
              disabled={props.isLoading}
              label="Rejection Reason"
              name="reason"
              value={rejectionReason}
              options={props.rejectionReason}
              errorMsg={props.errorInfo?.reason}
              onChange={handleRejectionChange}
            />
            {rejectionReason?.value == 'Other' && (
              <div className="mt-2">
                <TextInput
                  disabled={props.isLoading}
                  required
                  name="otherReason"
                  value={otherReason}
                  placeholder="Reason"
                  onChange={(input) => setotherReason(input.value)}
                />
              </div>
            )}
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
            No, Close
          </LightButton>

          <WarningButton
            disabled={props.isLoading || !rejectionData}
            size="sm"
            onClick={handleRejection}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Reject
          </WarningButton>
        </>
      }
    ></BaseModalMedium>
  )
}
