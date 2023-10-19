import React, { useState, useEffect } from 'react'
import axios from 'lib/axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// layout for page
import Admin from 'layouts/Admin.js'

// components
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import UploadAdditionalDocsModal from '@/components/Modal/Member/Company/UploadAdditinalDocs'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import {
  CompanyStatusesIcon,
  CompanyStatusesText,
} from '@/components/Shared/Company/Statuses'
import UpdateImageModal from '@/components/Modal/Member/Company/UpdateImage'
import UpdateCertificationofActivityModal from '@/components/Modal/Member/Company/UpdateCertificationofActivity'
import UpdateRegistrationDocumentModal from '@/components/Modal/Member/Company/UpdateRegistrationDoc'

export default function MyCompany({ session }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [companyData, setCompanyData] = useState()
  const getData = async () => {
    setIsLoading(true)
    const response = await axios
      .get(`/company`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setCompanyData(result)
      })
      .catch((error) => {
        // console.log(error.response)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const [uploadAditionalDocsModal, setUploadAditionalDocsModal] = useState()
  const handleUploadAditionalDocsModal = async (file) => {
    setIsLoading(true)
    let formData = new FormData()
    for (const index in file) {
      formData.append('AddtionalDoc[]', file[index])
    }
    const request = await axios
      .post(`/master/company/RegistrationDocument/Additional`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        setUploadAditionalDocsModal(false)
        toast.success(response.data.data, toastOptions)
      })
      .catch((error) => {
        toast.warning('Something went wrong!', toastOptions)
        toast.warning('Please upload again.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  //update logo image
  const [errorInfo, setErrorInfo] = useState(null)

  const [showUpdateImageModal, setShowUpdateImageModal] = useState()
  const handleUpdateImage = async (image) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('img', image)
    const request = await axios
      .post(`master/company/img/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        toast.success('Company logo has been updated.', toastOptions)
        setShowUpdateImageModal(false)
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        toast.error('Something went wrong.', toastOptions)
      })
      .finally(() => {
        getData()
      })
  }

  //update logo image
  const [
    showUpdateCertificationofActivityModal,
    setShowUpdateCertificationofActivityModal,
  ] = useState()
  const handleUpdateCertificationofActivity = async (certification) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('CertificationofActivity', certification)
    const request = await axios
      .post(`master/company/CertificationofActivity/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        toast.success(
          'Certification of Activity has been updated.',
          toastOptions
        )
        setShowUpdateCertificationofActivityModal(false)
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        toast.error('Something went wrong.', toastOptions)
      })
      .finally(() => {
        getData()
      })
  }

  //update logo image
  const [
    showUpdateRegistrationDocumentModal,
    setShowUpdateRegistrationDocumentModal,
  ] = useState()
  const handleUpdateRegistrationDocument = async (certification) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('RegistrationDocument', certification)
    const request = await axios
      .post(`master/company/RegistrationDocument/update`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => {
        toast.success('Registration Document has been updated.', toastOptions)
        setShowUpdateRegistrationDocumentModal(false)
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        toast.error('Something went wrong.', toastOptions)
      })
      .finally(() => {
        getData()
      })
  }

  return (
    <>
      <PrimaryWrapper>
        <PageHeader
          rightTop={
            <>
              <WarningButton
                className="mr-2"
                onClick={() => setUploadAditionalDocsModal(true)}
                size="sm"
              >
                <i className="mr-2 ml-1 fas fa-folder text-white"></i>
                Upload Aditional Documents
              </WarningButton>
              <Link href="/admin/member/company/my-company/edit">
                <WarningButton size="sm">
                  <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                  Update Company
                </WarningButton>
              </Link>
            </>
          }
        ></PageHeader>
        {companyData?.reason && companyData.is_confirmed == 'rejected' && (
          <>
            <DangerNotification
              message="Your Company is Rejected"
              detail={companyData.reason}
            ></DangerNotification>
            <span className="mb-4" />
          </>
        )}
        {companyData?.reason && companyData.is_confirmed == 'pending' && (
          <InfoNotification
            message="Update Needed"
            detail={companyData.reason}
          ></InfoNotification>
        )}

        {!!companyData ? (
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
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                {companyData.name}
                <CompanyStatusesIcon status={companyData.is_confirmed} />
              </h3>
              <CompanyStatusesText status={companyData.is_confirmed} />
              <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{' '}
                {companyData.country}, {companyData.address}
              </div>
              {companyData?.address2 === '' ||
              companyData.address2 === null ||
              companyData.address2 === undefined ? null : (
                <div className="text-sm leading-normal mt-2 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{' '}
                  {companyData.address2}
                </div>
              )}
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
                Master Account - {companyData.master?.name}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                Master Email - {companyData.master?.email}
              </div>
            </div>
          </>
        ) : (
          <>
            <LoadingState className={'pb-40'} />
          </>
        )}
      </PrimaryWrapper>

      {/* docs */}
      {companyData && (
        <div className="lg:flex lg:justify-around">
          <div className="w-full lg:w-1/2 mr-4">
            <PrimaryWrapper>
              <div className="m-2 p-2 text-md uppercase border-b text-center text-slate-500">
                Company Registration Document
              </div>
              <div className="m-2 p-2 text-sm text-center">
                <Link
                  target="_blank"
                  href={
                    publicDir +
                    '/companies_RegistrationDocument/' +
                    companyData.RegistrationDocument
                  }
                >
                  <SecondaryButton size="sm" className="mr-2">
                    View
                  </SecondaryButton>
                </Link>
                <WarningButton
                  size="sm"
                  onClick={() => setShowUpdateRegistrationDocumentModal(true)}
                >
                  Edit
                </WarningButton>
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-full lg:w-1/2 mr-4">
            <PrimaryWrapper>
              <div className="m-2 p-2 text-md uppercase border-b text-center text-slate-500">
                Certification of Activity
              </div>
              <div className="m-2 p-2 text-sm text-center">
                <Link
                  target="_blank"
                  href={
                    publicDir +
                    '/companies_CertificationofActivity/' +
                    companyData.CertificationofActivity
                  }
                >
                  <SecondaryButton size="sm" className="mr-2">
                    View
                  </SecondaryButton>
                </Link>
                <WarningButton
                  size="sm"
                  onClick={() =>
                    setShowUpdateCertificationofActivityModal(true)
                  }
                >
                  Edit
                </WarningButton>
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-full lg:w-1/2">
            <PrimaryWrapper>
              <div className="m-2 p-2 text-md uppercase border-b text-center text-slate-500">
                Additional Documents
              </div>
              <div className="m-2 p-2 text-sm text-center">
                <Link href="/admin/member/company/my-company/additionaldocs">
                  <SecondaryButton size="sm">View</SecondaryButton>
                </Link>
              </div>
            </PrimaryWrapper>
          </div>
        </div>
      )}

      {/* modal  */}
      <>
        {uploadAditionalDocsModal && (
          <UploadAdditionalDocsModal
            isLoading={isLoading}
            closeModal={() => setUploadAditionalDocsModal(false)}
            acceptance={handleUploadAditionalDocsModal}
          />
        )}

        {showUpdateImageModal ? (
          <UpdateImageModal
            isLoading={isLoading}
            setShowModal={setShowUpdateImageModal}
            acceptModal={handleUpdateImage}
            errorInfo={errorInfo}
          />
        ) : null}

        {showUpdateCertificationofActivityModal ? (
          <UpdateCertificationofActivityModal
            isLoading={isLoading}
            setShowModal={setShowUpdateCertificationofActivityModal}
            acceptModal={handleUpdateCertificationofActivity}
            errorInfo={errorInfo}
          />
        ) : null}

        {showUpdateRegistrationDocumentModal ? (
          <UpdateRegistrationDocumentModal
            isLoading={isLoading}
            setShowModal={setShowUpdateRegistrationDocumentModal}
            acceptModal={handleUpdateRegistrationDocument}
            errorInfo={errorInfo}
          />
        ) : null}
      </>
    </>
  )
}

MyCompany.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
