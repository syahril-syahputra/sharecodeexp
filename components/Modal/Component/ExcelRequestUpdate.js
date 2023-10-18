import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import AreaInput from '@/components/Interface/Form/AreaInput'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import React, { useState } from 'react'

export default function ExcelRequestUpdate(props) {
  const [value, setvalue] = useState('')

  const sendHandler = () => {
    if (value) {
      props.acceptModal(value)
    }
  }

  return (
    <BaseModalMedium
      title="Request Update"
      onClick={() => props.setShowModal(false)}
      body={
        <div>
          <AreaInput
            characterCount={value.length}
            characterLimit={30}
            label="Insert Your Request"
            name="request"
            required
            value={value}
            onChange={(input) => setvalue(input.value)}
            // errorMsg={["disabled", "second error"]}
          />
        </div>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            className="font-bold uppercase mr-2"
            onClick={() => props.setShowModal(false)}
          >
            Cancel
          </LightButton>

          <PrimaryButton
            disabled={props.isLoading}
            className="font-bold uppercase"
            onClick={() => sendHandler()}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Send Request
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
