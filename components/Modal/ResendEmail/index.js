import React, {useState} from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal'
import ChangeEmaiVerification from '../ChangeEmail'


export default function ResendEmailVerification(props) {
  const [loadingEmail, setLoadingEmail] = props.isLoading
  const [loadingDialogSuccess, setLoadingDialogSuccess] = props?.isLoadingDialog
  const [stateActionRequired, setStateActionRequired] = useState(true)
  const [changeEmailModal, setChangeEmailModal] = useState(false)

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
            <div className="text-lg my-4 hover:underline hover:text-footer-resources">
              <div className="text-center items-center flex space-x-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stateActionRequired}
                    className="sr-only peer"
                    id="stateActionRequired"
                    onChange={(e) => {
                      setStateActionRequired(!stateActionRequired)
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    or change your email address
                  </span>
                </label>

              </div>
            </div>
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
            {
              stateActionRequired ?
                <PrimaryButton
                  size="sm"
                  type="submit"
                  isLoading={props.isLoading}
                  disabled={loadingEmail || loadingDialogSuccess}
                  onClick={() => {
                    setChangeEmailModal(true)
                    props.closeModal()
                  }}
                >
                  {loadingEmail || loadingDialogSuccess ? (
                    <i className="px-3 fas fa-hourglass fa-spin"></i>
                  ) : (
                    'Change Email'
                  )}
                </PrimaryButton>
                :
                <PrimaryButton
                  size="sm"
                  isLoading={props.isLoading}
                  disabled={loadingEmail || loadingDialogSuccess}
                  onClick={() => {
                    props?.acceptance(),
                      setLoadingEmail(true),
                      setLoadingDialogSuccess(false)
                    setChangeEmailModal(false)

                  }}
                >
                  {loadingEmail || loadingDialogSuccess ? (
                    <i className="px-3 fas fa-hourglass fa-spin"></i>
                  ) : (
                    'Yes, Resend'
                  )}
                </PrimaryButton>
            }
          </>
        }
      />
    </>
  )
}
