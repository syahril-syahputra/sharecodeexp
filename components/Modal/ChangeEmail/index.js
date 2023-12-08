import React, {useState} from 'react';
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal';
import LightButton from '@/components/Interface/Buttons/LightButton';
import TextInputEmail from '@/components/Interface/Form/TextInputEmail'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'

export default function ChangeEmaiVerification({session, ...props}) {
  const [stateEmail, setStateEmail] = useState()
  const [errorInfo, setErrorInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitEmail = async (stateEmail) => {
    setErrorInfo(null)
    setIsLoading(true)
    await axios.post(`/email/change-email`, {
      email: stateEmail
    }, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }).then((response) => {
      toast.success(response?.data?.message, toastOptions)
      props.closeModalEmail()
      props.closeModal()
      setErrorInfo(null)
      setIsLoading(false)
    }).catch((error) => {
      const erroEmptyStr = error?.data?.message == '' ? 'Something went wrong' : error?.data?.message
      setErrorInfo(error?.data?.data)
      toast.error(
        erroEmptyStr,
        toastOptions
      )
      setIsLoading(false)
    })
  }

  return (
    <>
      <BaseModalMedium
        title="Change Email and Resend Verification"
        onClick={() => {
          props.closeModalEmail()
          props.closeModal()
          setIsLoading(false)
        }}
        body={
          <div className="w-full my-4">
            <TextInputEmail
              label="Email"
              name="stateEmail"
              placeholder="Write your subject here"
              value={stateEmail}
              onChange={(input) => setStateEmail(input.value)}
              errorMsg={errorInfo?.email}
            />
          </div>
        }
        action={
          <>
            <LightButton
              className="mr-2"
              size="sm"
              disabled={!stateEmail}
              onClick={() => {
                props.closeModalEmail()
                props.closeModal()
                setIsLoading(false)
              }}
            >
              No
            </LightButton>
            <PrimaryButton
              size="sm"
              disabled={!stateEmail}
              onClick={() => {
                handleSubmitEmail(stateEmail)
              }}
            >
              {isLoading ? (
                <i className="px-3 fas fa-hourglass fa-spin"></i>
              ) : (
                'Yes, Send'
              )}
            </PrimaryButton>
          </>

        }
      />
    </>
  )


}