import React from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'

export default function ResendEmailVerification(props) {
  return (
    <>
      <BaseModalMedium
        title="Resend Email Verification"
        onClick={() => props.closeModal()}
        body={
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to{' '}
            <span className="text-blueGray-700 font-bold">
              Resend Email Verification
            </span>
            ?
          </p>
        }
        action={
          <>
            <LightButton
              className="mr-2"
              size="sm"
              onClick={() => props.closeModal()}
            >
              No
            </LightButton>

            <PrimaryButton
              size="sm"
              isLoading={props.isLoading}
              onClick={() => props?.acceptance()}
            >
              Yes, Resend
            </PrimaryButton>
          </>
        }
      />
    </>
  )
}
