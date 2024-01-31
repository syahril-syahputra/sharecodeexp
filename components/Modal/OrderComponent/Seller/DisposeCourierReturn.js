import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function DisposeCourierReturn(props) {
  const [agreement, setagreement] = useState('')

  const handleSubmit = () => {
    props.acceptance(agreement ? 'DISPOSE' : '')
  }

  return (
    <BaseModalMedium
      title="Dispose Product"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="mb-4">
            <li className="item-center flex space-x-2">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={agreement}
                onChange={() => setagreement(!agreement)}
              />
              <label
                htmlFor="agreement"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                We confirm that we don’t want to take the products back and the
                laboratory can dispose of the products. We understand that we
                will be charged for product testing and handling.
                {props.errorInfo?.return_product_agreement && (
                  <label className="text-red-500 block py-2">
                    {props.errorInfo?.return_product_agreement}
                  </label>
                )}
              </label>
            </li>
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
          <PrimaryButton
            disabled={props.isLoading}
            size="sm"
            onClick={handleSubmit}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Provide
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
