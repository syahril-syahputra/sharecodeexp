import React from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'

export default function ResendEmailVerification(props) {
  const [loadingEmail, setLoadingEmail] = props.isLoading
  const [loadingDialogSuccess, setLoadingDialogSuccess] = props?.isLoadingDialog

  return (
    <>
      <BaseModalMedium
        title="Resend Email Verification"
        onClick={() => {
          props.closeModal(),
            setLoadingEmail(false),
            setLoadingDialogSuccess(false)
        }}
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
              disabled={loadingEmail || loadingDialogSuccess}
              size="sm"
              onClick={() => props.closeModal()}
            >
              No
            </LightButton>

            <PrimaryButton
              size="sm"
              isLoading={props.isLoading}
              disabled={loadingEmail || loadingDialogSuccess}
              onClick={() => {
                props?.acceptance(),
                  setLoadingEmail(true),
                  setLoadingDialogSuccess(false)
              }}
            >
              {loadingEmail || loadingDialogSuccess ? (
                <i className="px-3 fas fa-hourglass fa-spin"></i>
              ) : (
                'Yes, Resend'
              )}
            </PrimaryButton>
          </>
        }
      />
    </>
  )
}
