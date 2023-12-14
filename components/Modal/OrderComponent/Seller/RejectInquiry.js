import React, { useState } from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import SelectInput from '@/components/Interface/Form/SelectInput'
import TextInput from '@/components/Interface/Form/TextInput'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

export default function RejectInquiry(props) {
  const [rejectionReason, setRejectionReason] = useState()
  const handleRejectionChange = (value) => {
    setRejectionData('')
    setRejectionReason(value)
    if (value.value != 'Other') {
      setRejectionData(value.value)
    }
  }
  const [rejectionData, setRejectionData] = useState('')
  const handleRejection = () => {
    if (rejectionReason.value != 'Other' && rejectionData === '') {
      toast.error('Failed to load rejection reason.', toastOptions)

      return
    }
    props.acceptance(rejectionReason, rejectionData)
  }

  return (
    <BaseModalMedium
      title="Reject Inquiry"
      onClick={() => props.closeModal()}
      body={
        <>
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you confirm that you{' '}
            <span className="text-blueGray-700 font-bold">reject</span> this
            inquiry?
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
                  name="rejectionData"
                  value={rejectionData}
                  placeholder="Reason"
                  onChange={(input) => setRejectionData(input.value)}
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
            className="mr-2"
            size="sm"
            onClick={() => props.closeModal()}
          >
            No, Close
          </LightButton>

          <WarningButton
            disabled={props.isLoading}
            size="sm"
            onClick={handleRejection}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Confirm r
          </WarningButton>
        </>
      }
    ></BaseModalMedium>
  )
}
