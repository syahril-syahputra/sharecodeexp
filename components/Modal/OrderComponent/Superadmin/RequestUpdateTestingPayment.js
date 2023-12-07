import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import AreaInput from '@/components/Interface/Form/AreaInput'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'

export default function RequestUpdateTestingPayment(props) {
  const [reason, setreason] = useState('')

  const [isLoadingOpenReceipt, setisLoadingOpenReceipt] = useState(false)
  const { data: session } = useSession()
  const handleSubmit = () => {
    props.acceptance(reason)
  }
  const openPaymentReceiptHandler = async () => {
    try {
      setisLoadingOpenReceipt(true)
      await axios.post(
        `/admin/orders/verification-action/open-seller-payment-receipt`,
        {
          order_slug: props.orderSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      window.open(props.file, '_blank')
    } catch (error) {
      toast.error(error.data.message, toastOptions) // perlu di update
    } finally {
      setisLoadingOpenReceipt(false)
    }
  }

  return (
    <BaseModalMedium
      title="Request Update Testing Payment"
      onClick={() => props.closeModal()}
      body={
        <div>
          <div className="mb-4">
            <AreaInput
              label="Reason"
              name="reason"
              value={reason}
              onChange={(input) => setreason(input.value)}
              errorMsg={props.errorInfo?.order_termination_reason}
            ></AreaInput>
          </div>
          <SecondaryButton
            onClick={openPaymentReceiptHandler}
            size="sm"
            disabled={isLoadingOpenReceipt}
            outline
          >
            {isLoadingOpenReceipt && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Open Payment Receipt
          </SecondaryButton>
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
