import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'

export default function UploadCourierDetails(props) {
  const [courier, setcourier] = useState('')
  const [account, setaccount] = useState('')

  const handleSubmit = () => {
    props.acceptance(courier, account)
  }

  return (
    <BaseModalMedium
      title="Courier Details"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="mb-4">
            <TextInput
              label="Courier Name"
              name="courier"
              value={courier}
              onChange={(input) => setcourier(input.value)}
              errorMsg={props.errorInfo?.buyer_courier_company_name}
            ></TextInput>
          </div>
          <div className="mb-4">
            <TextInput
              label="Courier Account Number"
              name="account"
              value={account}
              onChange={(input) => setaccount(input.value)}
              errorMsg={props.errorInfo?.buyer_courier_account_number}
            ></TextInput>
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
