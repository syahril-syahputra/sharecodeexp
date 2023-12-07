import React from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function AccpetProduct(props) {
  return (
    <BaseModalMedium
      title="Accept Product"
      onClick={() => props.setShowModal(false)}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          Do you want accept the product?
        </p>
      }
      action={
        <>
          <LightButton
            className="font-bold uppercase mr-2"
            onClick={() => props.setShowModal(false)}
          >
            No, Close
          </LightButton>

          <PrimaryButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => props.acceptance()}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Accept
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
