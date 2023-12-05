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

export default function CloseReturned(props) {
  const [isClose, setisClose] = useState(false)
  const acceptHandler = () => {
    if (isClose) {
      props.acceptance(isClose)
    } else {
      toast.error('Please check the product is returned!', toastOptions)
    }
  }

  return (
    <BaseModalMedium
      title="Close Reimbursement"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="space-y-4">
            <div className="text-blueGray-500 text-lg leading-relaxed">
              Do you want to{' '}
              <span className="text-blueGray-700 font-bold">close</span>{' '}
              Reimbursement?
            </div>

            <ul className="py-2 space-y-2">
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
                  Return Product
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
            Close Reimbursement
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
