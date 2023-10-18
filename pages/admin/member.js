import React, { useContext, useEffect, useState } from 'react'
import { useSession, getSession, signOut } from 'next-auth/react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import LogoutModal from '@/components/Modal/Logout/Logout'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import { CompanyStatusesIcon } from '@/components/Shared/Company/Statuses'
import Link from 'next/link'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import ResendEmailVerification from '@/components/Modal/ResendEmail'
import GlobalContext from '@/store/global-context'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'

export default function MemberDashboard({ company, message, session }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  useEffect(() => {
    if (!!message) {
      toast.warning(message, toastOptions)
    }
  }, [])

  const { update } = useSession()
  const router = useRouter()
  const handleDashboard = async (status) => {
    await update({
      dashboardStatus: status,
    })
    if (status === 'buyer') {
      router.replace('/admin/member/buyer/dashboard')
    }

    if (status === 'seller') {
      router.replace('/admin/member/seller/dashboard')
    }
  }

  const handleResendEmail = async () => {
    await axios
      .post(
        `/email/resend`,
        {},
        {
          headers: {
            Authorization: `${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response?.message}`, toastOptions)
      })
      .catch((error) => {
        toast.error(`${error.message}`, toastOptions)
      })
  }

  return (
    <>
      <div>
        {/* Rejected */}
        {company.is_confirmed == 'rejected' && (
          <PrimaryWrapper>
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i
                  title="Member Rejected"
                  className="mr-2 ml-1 fas fa-times text-orange-500"
                ></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                <p>
                  Your membership was rejected by Exepart registration expert
                </p>
              </h3>
              <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
                <i>
                  If something is not agreeable, please contact Exepart
                  registration expert. You can also check on{' '}
                  <Link
                    href="/admin/member/company/my-company"
                    className="underline text-black"
                  >
                    My Company
                  </Link>
                </i>
              </h3>
            </div>
          </PrimaryWrapper>
        )}
        {/* Pending */}
        {company.is_confirmed == 'pending' && (
          <PrimaryWrapper>
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i
                  title="Member Pending"
                  className="mr-2 ml-1 fas fa-clock text-orange-500"
                ></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                <p>
                  Wait for your confirmation from Exepart registration expert
                </p>
              </h3>
              <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
                <i>
                  Please refresh if Exepart registration expert is accepted your
                  member status
                </i>
              </h3>
            </div>
          </PrimaryWrapper>
        )}

        {/* {company.is_confirmed == "accepted" &&
          <PrimaryWrapper>
            <div className="text-center pb-10 pt-10">
              <img className="object-contain mb-3 h-40 mx-auto" 
                alt={company.name}
                src={publicDir + "/companies_images/" + company.img}/>
              <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                {company.name}
                <CompanyStatusesIcon status={company.is_confirmed}/>                
              </h3>
            </div>
          </PrimaryWrapper>
        } */}
        {/* Accepted */}
        {company.is_confirmed == 'accepted' && (
          <div className="container mx-auto mt-10 xs:pb-10 xs:pt-8 px-4">
            {company?.RegistrationDocument === '' ? (
              <WarningNotification
                message={'Update Needed'}
                detail={
                  'Please send additional document to complete your registration'
                }
              />
            ) : null}
            <PrimaryWrapper>
              <div className="text-center pb-20 pt-20">
                <img
                  className="object-contain mb-3 h-40 mx-auto"
                  alt={company.name}
                  src={publicDir + '/companies_images/' + company.img}
                />
                <h3 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {company.name}
                  <CompanyStatusesIcon status={company.is_confirmed} />
                </h3>
                <div className="mt-20">
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    onClick={() => handleDashboard('buyer')}
                  >
                    Buyer
                  </PrimaryButton>
                  <PrimaryButton
                    className="m-2"
                    size="lg"
                    outline
                    onClick={() => handleDashboard('seller')}
                  >
                    Seller
                  </PrimaryButton>
                </div>
              </div>
            </PrimaryWrapper>
          </div>
        )}
      </div>
    </>
  )
}

MemberDashboard.layout = Admin

export async function getServerSideProps(context) {
  console.log(context, '<<<context')
  const session = await getSession(context)
  console.log(session, '<<<session')
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  let company = {}
  let redirectedMessage = ''
  if (session.user.dashboardStatus) {
    return {
      redirect: {
        permanent: false,
        destination: `/admin/member/${session.user.dashboardStatus}/dashboard`,
      },
    }
  }

  const loadCompany = await axios
    .get(`/company`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    .then((res) => {
      company = res.data.data
    })
    .catch((err) => {
      redirectedMessage = err.data.message
    })

  console.log(loadCompany, company, '<<<loadCompany')

  if (!!context.query.redirect) {
    redirectedMessage = 'Waiting for your company approval'
  }

  return {
    props: {
      session,
      company,
      message: redirectedMessage,
    },
  }
}
