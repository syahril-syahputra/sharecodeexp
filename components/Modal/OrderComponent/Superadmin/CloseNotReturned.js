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

export default function CloseNotReturned(props) {
  const [isReviewd, setisReviewd] = useState(false)
  const [isAccept, setisAccept] = useState(false)
  const [isClose, setisClose] = useState(false)
  const [isLoadingOpenReceipt, setisLoadingOpenReceipt] = useState(false)

  const { data: session } = useSession()
  const acceptHandler = () => {
    if (isReviewd && isAccept && isClose) {
      props.acceptance(isReviewd, isAccept, isClose)
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
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingOpenReceipt(false)
    }
  }

  return (
    <BaseModalMedium
      title="Close Order"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="space-y-4">
            <div className="text-blueGray-500 text-lg leading-relaxed">
              Do you want to{' '}
              <span className="text-blueGray-700 font-bold">close</span> order?
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
                  id="reviePayment"
                  onChange={(e) => setisReviewd(!isReviewd)}
                />
                <label
                  htmlFor="reviePayment"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Reviewed Payment
                </label>
              </li>
              <li className="item-center flex space-x-2">
                <input
                  type="checkbox"
                  checked={isAccept}
                  id="accepPayment"
                  onChange={(e) => setisAccept(!isAccept)}
                />
                <label
                  htmlFor="accepPayment"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Accept Payment
                </label>
              </li>

              <li className="item-center flex space-x-2">
                <input
                  type="checkbox"
                  checked={isClose}
                  id="closeOrder"
                  onChange={(e) => setisClose(!isClose)}
                />
                <label
                  htmlFor="closeOrder"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Close Order
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
            Close Order
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
