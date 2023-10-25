import React, { Fragment, useEffect, useState } from 'react'
import axios from 'lib/axios'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from '@/components/Footers/Footer'
import { signOut } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import LogoutModal from '@/components/Modal/Logout/Logout'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import { CountdownTimer } from '@/components/CounterdownTime'

export default function VerifyEmail({ session }) {
  let time = 1
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [resendModal, setResendModal] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  const [isSucces, setIsSucces] = useState(false)
  const THREE_DAYS_IN_MS = 1 * 1 * 2 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  if (typeof window !== 'undefined') {
    time = parseInt(localStorage.getItem('end_date'), 10)
  }

  const countDownData = () => {
    return <CountdownTimer setDialogState={setDialogState} targetDate={time} />
  }
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
        setIsSucces(true)
        setDialogState(true)
        setResendModal(false)
        setLoading(true)
        if (localStorage.getItem('end_date') === null) {
          localStorage.setItem(
            'end_date',
            JSON.stringify(dateTimeAfterThreeDays)
          )
        }
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        setIsSucces(false)
        setResendModal(false)
      })
  }

  return (
    <Fragment>
      <PageSEO title={siteMetadata?.title} />
      <IndexNavbar fixed />
      <section className="relative py-14 overflow-hidden h-3/6 ">
        <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
          {dialogState ? (
            <PrimaryNotification
              message={'Email notification has been resend successfully'}
              timer={countDownData()}
            />
          ) : null}
          <PrimaryWrapper className={'mt-6'}>
            {
              <div className="text-center pb-20 pt-20">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                  <ImageLogo size={250} />
                </div>
                <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                  Your email verification has been sent,
                  <br />
                  please verify the email.
                </h3>
                <div className="mt-20">
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    disabled={dialogState}
                    onClick={() => setResendModal(true)}
                  >
                    {dialogState ? (
                      <i className="px-3 fas fa-hourglass fa-spin"></i>
                    ) : (
                      'Resend'
                    )}
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
              </div>
            }
          </PrimaryWrapper>
        </div>
      </section>
      <Footer />
      {logoutModal && (
        <LogoutModal
          closeModal={() => setLogoutModal(false)}
          acceptance={() => {
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }}
        />
      )}
      {resendModal ? (
        <ResendEmailVerification
          isLoadingDialog={[dialogState, setDialogState]}
          closeModal={setResendModal}
          acceptance={handleResendEmail}
          isLoading={[isLoading, setIsLoading]}
        />
      ) : null}
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
