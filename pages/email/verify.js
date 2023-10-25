import axios from 'lib/axios'
import React, { Fragment, useState, useEffect } from 'react'
import IndexNavbar from 'components/Navbars/IndexNavbar.js'
import Footer from '@/components/Footers/Footer'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { useRouter } from 'next/router'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import { timeoutPromise } from '@/utils/general'
import { CountdownTimer } from '@/components/CounterdownTime'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { getSession } from 'next-auth/react'

export default function EmailVerify({ session }) {
  let time = 1
  const router = useRouter()
  const [stateExpires, setStateExpires] = useState('')
  const [stateEmailVerifyUrl, setEmailVerifyUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [stateHash, setStateHash] = useState('')
  const [isSucces, setIsSucces] = useState(false)
  const [stateSigniture, setStateSigniture] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  const [resendModal, setResendModal] = useState(false)
  const [loading, setLoading] = useState(true)
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
        setDialogState(true)
        setResendModal(false)
        setLoading(true)
        if (localStorage.getItem('end_date') === null) {
          localStorage.setItem(
            'end_date',
            JSON.stringify(dateTimeAfterThreeDays)
          )
        }
        setIsSucces(true)
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        setIsSucces(false)
        setResendModal(false)
      })
  }

  const verifyEmail = async (
    emailVerifyUrl = '',
    expiresValue = '',
    hasValue = '',
    signatureValue = ''
  ) => {
    try {
      await timeoutPromise(
        5 * 60 * 1000,
        axios.get(
          `/email/verify/${emailVerifyUrl}?expires=${expiresValue}&hash=${hasValue}&signature=${signatureValue}`
        )
      )
      setVerified(true)
      setIsLoading(false)
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  /**
   * This code should be refactor
   */

  const getUrlQyueryParams = (params) => {
    if (params?.length > 0) {
      let param = ''
      const queryParams = {}
      for (let i = 0; i < params?.length; i++) {
        param = params[i]?.split('=')
        queryParams[param[0]] = param[1]
      }

      return params
    }
  }

  useEffect(() => {
    const params = window.location.search.substring(1).split('&')
    const data = getUrlQyueryParams(params)
    const getEmailVerifyValue = data[0]?.substring(1).split('=')[1] || ''
    const getExpiresValue = data[1]?.substring(1).split('=')[1] || ''
    const getHashValue = data[2]?.substring(1).split('=')[1] || ''
    const getSignatureValue = data[3]?.substring(1).split('=')[1] || ''
    setEmailVerifyUrl(getEmailVerifyValue)
    setStateExpires(getExpiresValue)
    setStateHash(getHashValue)
    setStateSigniture(getSignatureValue)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyEmail(stateEmailVerifyUrl, stateExpires, stateHash, stateSigniture)
    }, 5000)

    return () => clearTimeout(timer)
  }, [stateSigniture, stateExpires, stateHash, stateEmailVerifyUrl])

  useEffect(() => {
    if (isSucces === true) {
      const timerToast = setTimeout(() => {
        toast.success(`You will direct to verify email `)
      }, 120000)

      const timer = setTimeout(() => {
        router.push('/verify/email')
      }, 123000)

      return () => {
        clearTimeout(timer)
        clearTimeout(timerToast)
      }
    }
  }, [isSucces])

  return (
    <Fragment>
      <IndexNavbar fixed hideLogin={true} emailVerification={true} />
      <section className="relative py-14 overflow-hidden h-3/6 ">
        <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
          {dialogState ? (
            <PrimaryNotification
              message={'Email notification has been resend successfully'}
              timer={countDownData()}
            />
          ) : null}
          <PrimaryWrapper className={'mt-6'}>
            <div className="text-center py-20">
              <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <ImageLogo size={250} />
              </div>
              {isLoading ? (
                <LoadingState className={'py-20 m-2'} />
              ) : (
                // border-blue-500border-blue-500
                <div className="flex justify-center border w-1/2 flex-col mx-auto  py-12">
                  {verified ? (
                    <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                      Your email has been verified, please login
                    </h3>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                        Your token has invalid.{' '}
                      </h3>
                      <div className="flex justify-center">
                        <PrimaryButton
                          className="m-2"
                          size="lg"
                          outline
                          disabled={dialogState || isSucces}
                          onClick={() => setResendModal(true)}
                        >
                          {dialogState || isSucces ? (
                            <i className="px-3 fas fa-hourglass fa-spin"></i>
                          ) : (
                            'Resend'
                          )}{' '}
                        </PrimaryButton>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </PrimaryWrapper>
        </div>
      </section>
      <Footer />
      {resendModal ? (
        <ResendEmailVerification
          isLoadingDialog={[dialogState, setDialogState]}
          closeModal={setResendModal}
          acceptance={handleResendEmail}
          isLoading={[isLoadingButton, setIsLoadingButton]}
        />
      ) : null}
    </Fragment>
  )
}
async function fetchUser(context, accessToken) {
  try {
    const data = await axios.get(`/my-account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const result = await fetchUser(context, session.accessToken)

  return {
    props: {
      session,
      data: result.data.data,
    },
  }
}
