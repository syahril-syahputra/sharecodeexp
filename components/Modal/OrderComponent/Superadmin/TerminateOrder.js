import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import AreaInput from '@/components/Interface/Form/AreaInput'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import OTPInput from 'react-otp-input'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

export default function TerminateOrder(props) {
  const [reason, setreason] = useState('')
  const [terminateOrder, setTerminateOrder] = useState('')
  const [OTP, setOTP] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleisTerminateOrder = () => {
    setTerminateOrder((prev) => !prev)
  }
  const requestTokenHandler = () => {
    if (!reason) {
      setErrorMessage(['The order termination reason field is required.'])

      return
    }
    if (!terminateOrder) {
      toast.error('Please agree to terminate the order!', toastOptions)
      return
    }
    props.requestToken()
  }

  const handleSubmit = () => {
    if (OTP.length < 6) {
      toast.error('Please Insert OTP in your email', toastOptions)
      return
    }
    props.acceptance(reason, terminateOrder, OTP)
  }

  return (
    <BaseModalMedium
      title="Terminate Order"
      onClick={() => props.closeModal()}
      body={
        <>
          {props.tokenRequested ? (
            <div className="mb-4 ">
              <label className="block text-center p-4 text-gray-500 font-bold">
                INSERT OTP
              </label>
              <OTPInput
                value={OTP}
                onChange={(value) => setOTP(value)}
                numInputs={6}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className=" flex-1  rounded-lg focus:outline-blue-200 border-gray-800 bg-gray-50 border"
                  />
                )}
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <AreaInput
                  label="Order Termination Reason"
                  name="reason"
                  value={reason}
                  onChange={(input) => setreason(input.value)}
                  errorMsg={
                    props.errorInfo?.order_termination_reason || errorMessage
                  }
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
          )}
        </>
      }
      action={
        <>
          {!props.tokenRequested ? (
            <DangerButton
              disabled={props.isLoading}
              size="sm"
              onClick={requestTokenHandler}
            >
              {props.isLoading && (
                <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
              )}
              Request Token
            </DangerButton>
          ) : (
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
          )}
        </>
      }
    ></BaseModalMedium>
  )
}
