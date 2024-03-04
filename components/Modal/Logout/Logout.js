import React, { useState } from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import DarkButton from '@/components/Interface/Buttons/DarkButton'

export default function Logout(props) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <BaseModalMedium
        title="Logout"
        onClick={() => props.closeModal()}
        body={
          <p className="my-4 text-indigo-950 text-lg leading-relaxed">
            Do you want to <span className="font-bold">log out</span>?
          </p>
        }
        action={
          <>
            <LightButton
              className="mr-2 rounded-full"
              size="sm"
              disabled={isLoading}
              onClick={() => props.closeModal()}
            >
              No, Stay
            </LightButton>

            <DarkButton
              size="sm"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => {
                props.acceptance(), setIsLoading(true)
              }}
            >
              {isLoading ? (
                <i className="px-3 fas fa-hourglass fa-spin"></i>
              ) : (
                'Yes, Logout'
              )}
            </DarkButton>
          </>
        }
      />
    </>
  )
}
