import React from 'react'
import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
export default function AcceptPayment(props) {
  const [isReviewd, setisReviewd] = useState(false)
  const [isAccept, setisAccept] = useState(false)
  const [isLoadingOpenReceipt, setisLoadingOpenReceipt] = useState(false)

  const { data: session } = useSession()
  const acceptHandler = () => {
    if (isReviewd && isAccept) {
      props.acceptance(isReviewd, isAccept)
    } else {
      toast.error(
        'Please check the payment is reviewed and accepted!',
        toastOptions
      )
    }
  }

  const openPaymentReceiptHandler = async () => {
    try {
      setisLoadingOpenReceipt(true)
      await axios.post(
        `/admin/orders/verification-action/open-buyer-payment-receipt`,
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
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingOpenReceipt(false)
    }
  }

  return (
    <BaseModalMedium
      title="Accept Payment"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="space-y-4">
            <div className="text-blueGray-500 text-lg leading-relaxed">
              Do you agree to{' '}
              <span className="text-blueGray-700 font-bold">accept</span> the
              payment?
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
            <ul className="py-2 space-y-2">
              <li className="item-center flex space-x-2">
                <input
                  type="checkbox"
                  checked={isReviewd}
                  id="reviewBuyerPayment"
                  onChange={(e) => setisReviewd(!isReviewd)}
                />
                <label
                  htmlFor="reviewBuyerPayment"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Reviewed Buyer&lsquo;s Payment
                </label>
              </li>
              <li className="item-center flex space-x-2">
                <input
                  type="checkbox"
                  checked={isAccept}
                  id="acceptBuyerPayment"
                  onChange={(e) => setisAccept(!isAccept)}
                />
                <label
                  htmlFor="acceptBuyerPayment"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Accept Buyer&lsquo;s Payment
                </label>
              </li>
            </ul>
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

          <PrimaryButton
            disabled={props.isLoading}
            size="sm"
            onClick={acceptHandler}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Accept Payment
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
