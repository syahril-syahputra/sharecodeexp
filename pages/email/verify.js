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
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { getSession } from 'next-auth/react'
import LayoutLandingPage from '@/layouts/LandingPage'
import DarkButton from '@/components/Interface/Buttons/DarkButton'

function EmailVerify({ session }) {
  const router = useRouter()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [verified, setVerified] = useState(false)
  const [stateDisabledResend, setStateDisabledResend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [resendModal, setResendModal] = useState(true)
  const [dialogState, setDialogState] = useState(false)
  const [isSucces, setIsSucces] = useState(false)
  useEffect(() => {
    const query = router.query
    verifyEmail(
      query.emailVerifyUrl,
      query.expires,
      query.hash,
      query.signature
    )
  }, [])

  const handleResendEmail = async () => {
    try {
      const response = await axios.post(
        `/email/resend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      toast.success(`${response?.data?.message}`, toastOptions)
      setDialogState(false)
      setResendModal(false)
      setLoading(false)
      setStateDisabledResend(true)

      toast.success(`You will direct to verify email `, toastOptions)
      router.push('/verify/email')
    } catch (error) {
      toast.error(`${error?.data?.message}`, toastOptions)
      setResendModal(false)
      setIsLoading(false)
      setDialogState(false)
    }
  }

  const verifyEmail = async (
    emailVerifyUrl = '',
    expiresValue = '',
    hasValue = '',
    signatureValue = ''
  ) => {
    try {
      await axios.get(
        `/email/verify/${emailVerifyUrl}?expires=${expiresValue}&hash=${hasValue}&signature=${signatureValue}`
      )
      setVerified(true)

      setIsLoading(false)
      if (session === null || session == undefined) {
        router.push('/auth/login')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container text-center py-8  ">
      <div className="flex items-center  text-2xl font-semibold text-gray-900">
        <ImageLogo size={250} />
      </div>
      {isLoading && <LoadingState className={'py-20 m-2'} />}
      {verified && !isLoading && (
        <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 my-8">
          Your email has been verified, please wait you will redirect to{' '}
          {`${
            session === undefined || session == null ? 'login' : 'dashboard'
          }`}
          .
        </h3>
      )}
      {!verified && !isLoading && (
        <>
          <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 pt-8">
            Your token has invalid.{' '}
          </h3>

          {session != null || session != undefined ? (
            <div className="flex justify-center">
              <DarkButton
                className="m-2 px-8 py-4"
                outline
                disabled={stateDisabledResend}
                onClick={() => setResendModal(true)}
              >
                Resend
              </DarkButton>
            </div>
          ) : null}
        </>
      )}
      {resendModal ? (
        <ResendEmailVerification
          isLoadingDialog={[dialogState, setDialogState]}
          closeModal={setResendModal}
          acceptance={handleResendEmail}
          isLoading={[isLoadingButton, setIsLoadingButton]}
          session={session}
        />
      ) : null}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
EmailVerify.layout = LayoutLandingPage
export default EmailVerify
