import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function TestingAndHandlingServices(props) {
  const [testingLabAmount, settestingLabAmount] = useState('150')
  const [handlingServicesAmount, sethandlingServicesAmount] = useState('')

  const handleSubmit = () => {
    props.acceptance(testingLabAmount, handlingServicesAmount || 0)
  }

  return (
    <BaseModalMedium
      title="Testing And Handling Services"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="mb-4">
            <TextInput
              label="Testing Lab Amount"
              name="testingLabAmount"
              value={testingLabAmount}
              onChange={(input) => settestingLabAmount(input.value)}
              errorMsg={props.errorInfo?.testingLabAmount}
            ></TextInput>
          </div>
          {props.sellerCourier === null && (
            <div className="mb-4">
              <TextInput
                label="Handling Services Amount"
                name="handlingServicesAmount"
                value={handlingServicesAmount}
                onChange={(input) => sethandlingServicesAmount(input.value)}
                errorMsg={props.errorInfo?.handlingServicesAmount}
              ></TextInput>
            </div>
          )}
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
