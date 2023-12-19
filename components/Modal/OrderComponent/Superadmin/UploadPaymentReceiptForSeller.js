import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import TextInput from '@/components/Interface/Form/TextInput'
import FileInput from '@/components/Interface/Form/FileInput'
export default function UploadPaymentReceiptForSeller(props) {
  const [goodResult, setGoodResult] = useState('')
  const handlerUpload = () => {
    props.acceptance(goodResult)
  }

  return (
    <BaseModalMedium
      title="Upload Payment Receipt For Seller"
      onClick={() => props.closeModal()}
      body={
        <div>
          <div className="mb-6">
            <FileInput
              description="Input PDF (.pdf) only, max 10MB"
              accept=".pdf"
              name="File Upload"
              required
              onChange={(target) => setGoodResult(target.files[0])}
              errorMsg={props.errorInfo?.test_result}
            />
          </div>
        </div>
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
            onClick={handlerUpload}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Upload Receipt
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
