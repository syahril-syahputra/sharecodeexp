import axios from 'lib/axios'
import React, {useState} from 'react'
import AreaInput from '@/components/Interface/Form/AreaInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'

export default function HelpRequestModal({session, ...props}) {
  const [stateSubject, setStateSubject] = useState()
  const [stateMessage, setStateMessage] = useState()
  const [isLoading, setIsLoading] = props.isLoading

  const handleAddHelpRequest = async (stateSubject, stateMessage) => {
    await axios
      .post(
        `/member/help-request`,
        {
          subject: stateSubject,
          message: stateMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response?.data?.message, toastOptions)
        props.callback()
        props.setShowModal(false)
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(
          error.data?.message,
          toastOptions
        )
        props.setShowModal(false)
        setIsLoading(false)
      })
  }

  return (
    <BaseModalMedium
      title="Help Request"
      onClick={() => {
        props.setShowModal(false)
        setIsLoading(false)
      }}
      body={
        <>
          <div className="w-full py-2">
            <TextInput
              label="Subject"
              name="stateSubject"
              placeholder="Write your subject here"
              value={stateSubject}
              onChange={(input) => setStateSubject(input.value)}
              errorMsg={props.errorInfo?.stateSubject}
            />
          </div>
          <div className="w-full py-2 ">
            <AreaInput
              name="stateMessage"
              required
              rows={4}
              label="Message"
              placeholder="Write your message here"
              value={stateMessage}
              errorMsg={props.errorInfo?.stateMessage}
              onChange={(input) => setStateMessage(input.value)}
            />
          </div>
        </>
      }
      action={
        <>
          <LightButton
            className="font-bold uppercase mr-2"
            isLoading={props.isLoading}
            disabled={isLoading}
            onClick={() => {
              props.setShowModal(false)
              setIsLoading(false)
            }}
          >
            Close
          </LightButton>
          <DangerButton
            disabled={isLoading || !stateSubject || !stateMessage}
            className="font-bold uppercase"
            onClick={() => {
              setIsLoading(true)
              handleAddHelpRequest(stateSubject, stateMessage)
            }}
          >
            {isLoading ? (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            ) : 'Send'}

          </DangerButton>
        </>
      }
    ></BaseModalMedium>
  )
}
