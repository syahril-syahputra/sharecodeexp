import React, {Fragment, useEffect, useState} from 'react'
import {CountdownTimer} from '../CounterdownTime'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import axios from 'lib/axios'
import LogoutModal from '@/components/Modal/Logout/Logout'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import ChangeEmaiVerification from '@/components/Modal/ChangeEmail'

const VerifyComp = ({session, signOut}) => {
  let time = null
  const [loading, setLoading] = useState(true)
  const [logoutModal, setLogoutModal] = useState(false)
  const [changeEmailModal, setChangeEmailModal] = useState(false)
  const [resendModal, setResendModal] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  const isServer = typeof window === 'undefined'
  let initialValue = time
  const [isSucces, setIsSucces] = useState(false)
  const THREE_DAYS_IN_MS = 1 * 1 * 2 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  // if (typeof window !== 'undefined') {
  //   time = parseInt(localStorage.getItem('end_date'), 10)
  // }

  // const countDownData = () => {
  //   return <CountdownTimer setDialogState={setDialogState} targetDate={time} />
  // }

  const handleResendEmail = async () => {
    await axios
      .post(
        `/email/resend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response?.data?.message}`, toastOptions)
        setIsSucces(false)
        setDialogState(true)
        setResendModal(false)
        setLoading(false)

      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        setIsSucces(false)
        setResendModal(false)
      })
  }

  return (
    <>
      <section className="relative py-14 overflow-hidden h-3/6 ">
        <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
          {/* {dialogState || Boolean(time) ? (
            <PrimaryNotification
              message={'Email notification has been resend successfully'}
              timer={countDownData()}
            />
          ) : null} */}
          <PrimaryWrapper className={'mt-6'}>
            {
              <div className="text-center pb-20 pt-20">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                  <ImageLogo size={250} />
                </div>
                <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                  Your email verification has been sent,
                  <br />
                  {`to ${session?.user?.userDetail?.email ?? ''}  please verify the email.`}
                </h3>
                <div className="mt-20">
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    disabled={dialogState || Boolean(time)}
                    onClick={() => setResendModal(true)}
                  >
                    Resend
                  </PrimaryButton>
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    onClick={() => setLogoutModal(true)}
                  >
                    Logout
                  </PrimaryButton>
                </div>
                <div className="text-center py-2  hover:underline hover:text-footer-resources">
                  <span className="font-medium text-gray-900 dark:text-gray-300" onClick={() => {
                    setChangeEmailModal(true)
                  }}>
                    Change Email
                  </span>
                </div>
              </div>
            }
          </PrimaryWrapper>
        </div>
      </section>
      {logoutModal && (
        <LogoutModal
          closeModal={() => setLogoutModal(false)}
          acceptance={() => props.signOut()}
        />
      )}
      {resendModal ? (
        <ResendEmailVerification
          closeModal={setResendModal}
          acceptance={handleResendEmail}
          session={session}
        />
      ) : null}
      {
        changeEmailModal ?
          <ChangeEmaiVerification
            closeModalEmail={setChangeEmailModal}
            session={session}
          />
          :
          null
      }
    </>
  )
}

export default VerifyComp
