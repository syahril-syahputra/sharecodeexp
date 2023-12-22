import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import LightButton from '@/components/Interface/Buttons/LightButton'
import FileInput from '@/components/Interface/Form/FileInput'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function CompleteOrder(props) {
  const [orderArrived, setOrderArrived] = useState('')
  const [paymentHasReleased, setpaymentHasReleased] = useState(false)

  const handleOrderArrived = () => {
    setOrderArrived((prev) => !prev)
  }

  const handlerUpload = () => {
    props.acceptance(paymentHasReleased, orderArrived)
  }

  return (
    <BaseModalMedium
      title="Complete Order"
      onClick={() => props.closeModal()}
      body={
        <div className=" space-y-4">
          <div className="w-full">
            {props.errorInfo?.payment_has_released && (
              <div>
                <span className="font-light text-sm">
                  <i className="text-red-500">
                    {props.errorInfo?.payment_has_released}
                  </i>
                </span>
              </div>
            )}
            <input
              name="paymentHasReleased"
              id="paymentHasReleased"
              type="checkbox"
              checked={paymentHasReleased}
              onChange={() => setpaymentHasReleased(!paymentHasReleased)}
              className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="paymentHasReleased"
              className="ml-2 text-sm font-medium text-gray-900 italic"
            >
              Payment has been released to the seller
            </label>
          </div>
          <div className="w-full">
            {props.errorInfo?.order_arrived && (
              <div>
                <span className="font-light text-sm">
                  <i className="text-red-500">
                    {props.errorInfo?.order_arrived}
                  </i>
                </span>
              </div>
            )}
            <input
              name="order"
              id="order"
              type="checkbox"
              checked={orderArrived}
              onChange={handleOrderArrived}
              className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="order"
              className="ml-2 text-sm font-medium text-gray-900 italic"
            >
              Order has been delivered to the buyer
            </label>
          </div>
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
            onClick={handlerUpload}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Complete Order
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
