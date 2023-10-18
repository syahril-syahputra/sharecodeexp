import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// layout for page
import Admin from 'layouts/Admin.js'

//toast
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// components
import SendEmailModal from '@/components/Modal/Registry/SendEmail'
import UpdateImageModal from '@/components/Modal/Registry/UpdateImage'
import AcceptMembership from '@/components/Modal/Registry/AcceptMembership'
import RejectMembership from '@/components/Modal/Registry/RejectMembership'
import PendingMembership from '@/components/Modal/Registry/PendingMembership'
import PageHeader from '@/components/Interface/Page/PageHeader'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import {
  CompanyStatusesIcon,
  CompanyStatusesText,
} from '@/components/Shared/Company/Statuses'
import { useRouter } from 'next/router'
import RemoveCompany from '@/components/Modal/Registry/RemoveCompany'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import { useContext } from 'react'
import GlobalContext from '@/store/global-context'

export default function CompanyDetail({ session, routeParam }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const context = useContext(GlobalContext)
  //data search
  const [isLoading, setIsLoading] = useState(false)
  const [companyData, setCompanyData] = useState({})
  const getData = async () => {
    setIsLoading(true)
    const response = await axios
      .get(`admin/companies?id=${routeParam.companyId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setCompanyData(result)
      })
      .catch((error) => {
        toast.error('Something went wrong. Company not found.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const updateState = () => {
    context.loadAdminSidebarCounter(session.accessToken)
  }

  useEffect(() => {
    updateState()
  }, [session])

  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const handleAcceptCompany = async () => {
    setShowAcceptModal(false)
    setIsLoading(true)
    const request = await axios
      .post(
        `admin/companies/${companyData.id}/update`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success('Company has been accepted successfully.', toastOptions)
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot accept company.',
          toastOptions
        )
      })
      .finally(() => {
        getData()
        updateState()
      })
  }

  const [showRejectModal, setShowRejectModal] = useState(false)
  const handleRejectCompany = async (text) => {
    setShowRejectModal(false)
    setIsLoading(true)
    const request = await axios
      .post(
        `admin/companies/${companyData.id}/reject`,
        {
          id: companyData.id,
          reason: text,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success('Company has been rejected successfully.', toastOptions)
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot reject company status.',
          toastOptions
        )
      })
      .finally(() => {
        getData()
        updateState()
      })
  }

  const [showPendingModal, setShowPendingModal] = useState(false)
  const handlePendingCompany = async (text) => {
    setShowPendingModal(false)
    setIsLoading(true)
    const request = await axios
      .post(
        `admin/companies/${companyData.id}/pending`,
        {
          id: companyData.id,
          reason: text,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success(
          'The company status has been changed into pending.',
          toastOptions
        )
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot change company status into pending.',
          toastOptions
        )
      })
      .finally(() => {
        getData()
        updateState()
      })
  }

  const [showSendEmailModal, setShowSendEmailModal] = useState(false)
  const handleSendEmail = async (messages) => {
    setIsLoading(true)
    const request = await axios
      .post(
        `/admin/companies/${companyData.id}/RequestAdditional`,
        {
          notification: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        // toast.success(response.data.message || "Email sent successfully", toastOptions)
        toast.success('Request sent.', toastOptions)
        setShowSendEmailModal(false)
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot request additional document.',
          toastOptions
        )
      })
      .finally(() => {
        getData()
        setIsLoading(false)
      })
  }

  const [showUpdateImageModal, setShowUpdateImageModal] = useState()
  const handleUpdateImage = async (image) => {
    setIsLoading(true)
    let formData = new FormData()
    formData.append('company_img', image)
    formData.append('id', companyData.id)
    const request = await axios
      .post(`admin/companies/${companyData.id}/updateImage`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        toast.success('Company logo has been updated.', toastOptions)
        setShowUpdateImageModal(false)
      })
      .catch((error) => {
        toast.error(
          "Something went wrong. Cannot update comapany's logo.",
          toastOptions
        )
      })
      .finally(() => {
        getData()
      })
  }

  const router = useRouter()
  const [showRemoveCompanyModal, setShowRemoveCompanyModal] = useState()
  const handleRemoveCompany = async () => {
    setIsLoading(true)
    const request = await axios
      .delete(`/admin/companies/${companyData.id}/delete`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        toast.success('The company has been deleted.', toastOptions)
        router.push(`/admin/superadmin/registry/approvedcompany`)
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot delete the company.',
          toastOptions
        )
      })
      .finally(() => {
        getData()
      })
  }

  return (
    <PrimaryWrapper>
      <PageHeader
        leftTop={
          <Link href="/admin/superadmin/registry/approvedcompany">
            <LightButton size="sm" className="mr-2">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        }
        rightTop={
          <>
            <SecondaryButton
              size="sm"
              className="mr-2"
              onClick={() => setShowSendEmailModal(true)}
            >
              <i className="mr-2 ml-1 fas fa-envelope text-white"></i>
              Send Email
            </SecondaryButton>
            {(companyData.is_confirmed == 'pending' ||
              companyData.is_confirmed == 'rejected') && (
              <PrimaryButton
                size="sm"
                className="mr-2"
                onClick={() => setShowAcceptModal(true)}
              >
                <i className="mr-2 ml-1 fas fa-check text-white"></i>
                Accept
              </PrimaryButton>
            )}
            {(companyData.is_confirmed == 'accepted' ||
              companyData.is_confirmed == 'rejected') && (
              <WarningButton
                size="sm"
                className="mr-2"
                onClick={() => setShowPendingModal(true)}
              >
                <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                Pending
              </WarningButton>
            )}
            {(companyData.is_confirmed == 'accepted' ||
              companyData.is_confirmed == 'pending') && (
              <DangerButton
                size="sm"
                className=""
                onClick={() => setShowRejectModal(true)}
              >
                <i className="mr-2 ml-1 fas fa-times text-white"></i>
                Reject
              </DangerButton>
            )}
          </>
        }
      ></PageHeader>
      {companyData?.reason && companyData.is_confirmed == 'rejected' && (
        <>
          <DangerNotification
            message="Your Company is Rejected"
            detail={companyData.reason}
          ></DangerNotification>
        </>
      )}
      {companyData?.additional_documents === 'uploaded' &&
        companyData.is_confirmed === 'pending' && (
          <>
            <InfoNotification
              message="Update Needed"
              detail={'Additional Document are Uploaded'}
            ></InfoNotification>
          </>
        )}
      {companyData?.reason && companyData.is_confirmed == 'pending' && (
        <>
          <InfoNotification
            message="Update Needed"
            detail={companyData.reason}
          ></InfoNotification>
        </>
      )}
      {companyData?.reason && companyData.is_confirmed != 'accepted' && (
        <div className="m-4 text-xl text-center font-medium italic">
          <h2>*This notification was sent for member</h2>
        </div>
      )}

      {/* main content */}
      {!isLoading ? (
        <>
          <div className="text-center pb-10">
            <img
              className="object-contain mb-3 h-40 mx-auto"
              alt={companyData.name}
              src={publicDir + '/companies_images/' + companyData.img}
            />
            <WarningButton
              size="sm"
              className="mb-2 mr-2"
              onClick={() => setShowUpdateImageModal(true)}
            >
              <i className="mr-2 fas fa-image text-white"></i>
              Update Image
            </WarningButton>
            {/* <WarningButton
              size="sm"
              className="mb-2"
              onClick={() => alert(':(') }
              disabled
            >
              <i className="mr-2 fas fa-pen text-white"></i>
              Update Company
            </WarningButton> */}
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
              {companyData.name}
              <CompanyStatusesIcon status={companyData.is_confirmed} />
            </h3>
            <CompanyStatusesText status={companyData.is_confirmed} />
            {/* <div>
              {companyData.is_confirmed == "rejected" && <i className="text-red-700">"{companyData.reason}"</i>}
            </div> */}
            <div className="text-sm leading-normal mt-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{' '}
              {companyData.country}, {companyData.address}
            </div>
            <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>{' '}
              {companyData.phone}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-circle-dot mr-2 text-lg text-blueGray-400"></i>
              Sector - {companyData.sector}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
              Main Account - {companyData.master_user?.name}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
              Main Email - {companyData.master_user?.email}
            </div>

            <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-9/12 px-4 mb-3">
                  <Link
                    target="_blank"
                    href={
                      publicDir +
                      '/companies_RegistrationDocument/' +
                      companyData.RegistrationDocument
                    }
                  >
                    <SecondaryButton size="sm">
                      View Company Registration Document
                    </SecondaryButton>
                  </Link>
                </div>
                <div className="w-full lg:w-9/12 px-4 mb-3">
                  <Link
                    target="_blank"
                    href={
                      publicDir +
                      '/companies_CertificationofActivity/' +
                      companyData.CertificationofActivity
                    }
                  >
                    <SecondaryButton size="sm">
                      View Certification of Activity
                    </SecondaryButton>
                  </Link>
                </div>
                <div className="w-full lg:w-9/12 px-4">
                  <Link
                    href={`/admin/superadmin/registry/additionaldocs/${companyData.id}`}
                  >
                    <SecondaryButton size="sm">
                      View Additional Documents
                    </SecondaryButton>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center mt-5">
                <div className="w-full lg:w-9/12 px-4">
                  <DangerButton
                    size="sm"
                    className="font-bold"
                    onClick={() => setShowRemoveCompanyModal(true)}
                  >
                    <i className="mr-2 fas fa-times text-white"></i>
                    DELETE COMPANY
                  </DangerButton>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingState className={'pb-40'} />
      )}

      {showSendEmailModal ? (
        <SendEmailModal
          isLoading={isLoading}
          setShowModal={setShowSendEmailModal}
          companyName={companyData.name}
          acceptModal={handleSendEmail}
        />
      ) : null}

      {showUpdateImageModal ? (
        <UpdateImageModal
          isLoading={isLoading}
          setShowModal={setShowUpdateImageModal}
          companyName={companyData.name}
          acceptModal={handleUpdateImage}
        />
      ) : null}

      {showAcceptModal ? (
        <AcceptMembership
          setShowModal={setShowAcceptModal}
          companyName={companyData.name}
          acceptModal={handleAcceptCompany}
        />
      ) : null}

      {showRejectModal ? (
        <RejectMembership
          setShowModal={setShowRejectModal}
          companyName={companyData.name}
          acceptModal={handleRejectCompany}
        />
      ) : null}

      {showPendingModal ? (
        <PendingMembership
          setShowModal={setShowPendingModal}
          companyName={companyData.name}
          acceptModal={handlePendingCompany}
        />
      ) : null}

      {showRemoveCompanyModal ? (
        <RemoveCompany
          isLoading={isLoading}
          setShowModal={setShowRemoveCompanyModal}
          companyName={companyData.name}
          acceptModal={handleRemoveCompany}
        />
      ) : null}
    </PrimaryWrapper>
  )
}

CompanyDetail.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
      routeParam: context.query,
    },
  }
}
