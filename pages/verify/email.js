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
import ChangeEmaiVerification from '@/components/Modal/ChangeEmail'
import { useRouter } from 'next/router'
import LayoutLandingPage from '@/layouts/LandingPage'
import DarkButton from '@/components/Interface/Buttons/DarkButton'

function VerifyEmail({ session, ...props }) {
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [resendModal, setResendModal] = useState(false)
  const [dialogState, setDialogState] = useState(false)
  const [isSucces, setIsSucces] = useState(false)
  const [changeEmailModal, setChangeEmailModal] = useState(false)
  const [stateData, setStateData] = useState()
  const [stateDisabledResend, setStateDisabledResend] = useState(false)
  const router = useRouter()

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
        setResendModal(false)
        setLoading(false)
        setIsLoading(false)
        setDialogState(false)
        setStateDisabledResend(true)
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        setIsSucces(false)
        setResendModal(false)
        setIsLoading(false)
        setDialogState(false)
      })
  }

  async function fetchData() {
    try {
      const data = await axios.get(`/my-account`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setStateData(data?.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (stateData?.data?.email_verified_at) {
      if (session === null || session === undefined) {
        router.push('/auth/login')
      } else {
        router.push('/admin/dashboard')
      }
    }
  }, [stateData?.data?.email_verified_at])

  return (
    <Fragment>
      <PageSEO title={siteMetadata?.title} />
      <section className="relative py-14 overflow-hidden ">
        <div className="container mx-auto xs:pb-10 xs:pt-8 px-4">
          <PrimaryWrapper className={'mt-6'}>
            {
              <div className="text-center pb-20 pt-20">
                <div className="flex items-center mb-6 text-2xl font-semibold text-indigo-950 ">
                  <ImageLogo size={250} />
                </div>
                <h3 className="text-2xl font-semibold leading-normal text-indigo-950 mb-2">
                  Your email verification has been sent
                  <br />
                  {`to ${
                    stateData?.data.email ?? ''
                  }  please verify the email.`}
                </h3>
                <div className="mt-20">
                  <DarkButton
                    className="mx-2 px-8 py-4"
                    outline
                    disabled={stateDisabledResend}
                    onClick={() => setResendModal(true)}
                  >
                    Resend
                  </DarkButton>
                  <DarkButton
                    className="mx-2 px-8 py-4"
                    outline
                    onClick={() => setLogoutModal(true)}
                  >
                    Logout
                  </DarkButton>
                </div>
                <div className="text-center py-7">
                  <button
                    type="button"
                    className="font-medium text-gray-900 dark:text-indigo-950"
                    onClick={() => {
                      setChangeEmailModal(true)
                    }}
                  >
                    <span className="underline">Change Email</span>
                  </button>
                </div>
              </div>
            }
          </PrimaryWrapper>
        </div>
      </section>
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
          session={session}
        />
      ) : null}
      {changeEmailModal ? (
        <ChangeEmaiVerification
          closeModalEmail={setChangeEmailModal}
          session={session}
          callback={() => {
            fetchData()
          }}
        />
      ) : null}
    </Fragment>
  )
}

VerifyEmail.layout = LayoutLandingPage
export default VerifyEmail

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
