import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
export default function ShipProduct(props) {
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmit = () => {
    props.acceptance(trackingNumber)
  }

  return (
    <BaseModalMedium
      title="Ship Product to LAB"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="">
            <div className="flex flex-wrap mb-6 space-y-4">
              <div className="w-full px-3">
                <TextInput
                  label="Courier Company"
                  name="courierCompany"
                  value={trackingNumber}
                  onChange={(input) => setTrackingNumber(input.value)}
                  errorMsg={props.errorInfo?.trackingSeller}
                />
              </div>
              <div className="w-full px-3">
                <TextInput
                  label="Tracking Number"
                  name="trackingNumber"
                  value={trackingNumber}
                  onChange={(input) => setTrackingNumber(input.value)}
                  errorMsg={props.errorInfo?.trackingSeller}
                />
              </div>
              <ul className="px-4 py-2 space-y-2">
                <li className="item-center flex space-x-2">
                  <input type="checkbox" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    Downloaded Proforma Invoice
                  </span>
                </li>
                <li className="item-center flex space-x-2">
                  <input type="checkbox" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    Downloaded Packing List
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            className="mr-2"
            siez="sm"
            onClick={() => props.closeModal()}
          >
            Close
          </LightButton>

          <PrimaryButton
            disabled={props.isLoading}
            siez="sm"
            onClick={handleSubmit}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Ship Product
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
