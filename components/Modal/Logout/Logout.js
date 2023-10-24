import React from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'

export default function Logout(props) {
  const [isLoading, setIsLoading] = props?.isLoadingModal

  return (
    <>
      <BaseModalMedium
        title="Logout"
        onClick={() => props.closeModal()}
        body={
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            Do you want to{' '}
            <span className="text-blueGray-700 font-bold">log out</span>?
          </p>
        }
        action={
          <>
            <LightButton
              className="mr-2"
              size="sm"
              onClick={() => props.closeModal()}
            >
              No, Stay
            </LightButton>

            <PrimaryButton
              size="sm"
              isLoading={props.isLoading}
              onClick={() => {
                props.acceptance(), setIsLoading(true)
              }}
            >
              {isLoading ? (
                <i className="px-3 fas fa-hourglass fa-spin"></i>
              ) : (
                'Yes, Logout'
              )}
            </PrimaryButton>
          </>
        }
      />
    </>
  )
}
