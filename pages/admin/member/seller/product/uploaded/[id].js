import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Admin from 'layouts/Admin.js'
import { getSession } from 'next-auth/react'
import axios from 'lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import { FileInput, Spinner } from 'flowbite-react'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import SuccessButton from '@/components/Interface/Buttons/SuccessButton'

DetailUploadedExcel.layout = Admin
export default function DetailUploadedExcel({ session, data }) {
  const router = useRouter()
  const [isRequestShow, setisRequestShow] = useState(false)
  const [uploadForm, setuploadForm] = useState(false)
  const [isOnUploading, setisOnUploading] = useState(false)
  const [file, setFile] = useState(null)
  const handleFileChange = (e) => {
    setFile(e)
  }
  const uploadHandler = async (file) => {
    setisOnUploading(true)
    const formData = new FormData()
    formData.append('excel_file', file)
    try {
      const response = await axios.post(
        '/seller/product/excel/update/' + data.id,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )

      // Handle the response from the server as needed
      toast.success(response.data.message, toastOptions)

      router.replace(router.asPath)
    } catch (error) {
      // Handle errors
      toast.error(error, toastOptions)
    } finally {
      setuploadForm(false)
      setisOnUploading(false)
    }
  }

  const validate = () => {
    if (!file) {
      return
    }
    uploadHandler(file.target.files[0])
  }

  return (
    <PrimaryWrapper>
      {data.requested_for_update && (
        <WarningNotification
          message="New Request From Admin"
          detail={
            <a
              onClick={() => setisRequestShow(true)}
              className="text-white text-xs block mt-1 italic underline hover:text-gray-600 cursor-pointer"
            >
              Show Request
            </a>
          }
        ></WarningNotification>
      )}
      {data.requested_for_update && isRequestShow && (
        <BaseModalMedium
          title="Request Update From Admin"
          onClick={() => setisRequestShow(false)}
          body={<div>{data.requested_for_update}</div>}
        ></BaseModalMedium>
      )}
      <PageHeader
        leftTop={
          <h3 className={'font-semibold text-lg text-blueGray-700'}>
            Detail File Excel {data.requested_for_update}
          </h3>
        }
      ></PageHeader>
      <div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={faFileExcel}
            className=" h-28 w-28 text-green-400 mx-auto"
          />
        </div>
        <table className="w-50 text-sm text-left text-gray-500 bg-white">
          <tbody>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                File Name
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data.name}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Excel Status
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data.status}</td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Uploaded at
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">
                {moment(data.created_at).format('dddd, D MMMM YYYY')}
              </td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Last Updated at
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">
                {moment(data.updated_at).format('dddd, D MMMM YYYY')}
              </td>
            </tr>
            <tr className="text-black hover:bg-slate-100">
              <th scope="col" className="px-6 py-3">
                Log
              </th>
              <td scope="row" className="text-sm px-6 py-4">
                :
              </td>
              <td className="text-sm px-2 py-4">{data.log || '-'}</td>
            </tr>
          </tbody>
        </table>
        {uploadForm ? (
          <div className="p-4">
            <FileInput
              helperText="Select Excel File"
              className="border border-gray-300"
              id="file"
              accept=".xls, .xlsx"
              disabled={isOnUploading}
              onChange={handleFileChange}
            />
            {isOnUploading ? (
              <div className="flex text-gray-600 space-x-4 justify-center items-center pt-8">
                <Spinner color="info" />
                <span>Loading</span>
              </div>
            ) : (
              <div className="flex justify-center space-x-2 pt-4">
                <DangerButton onClick={() => setuploadForm(false)}>
                  Cancel
                </DangerButton>
                <SuccessButton onClick={() => validate()}>Upload</SuccessButton>
              </div>
            )}
          </div>
        ) : (
          data.requested_for_update && (
            <div className="p-5">
              <SuccessButton onClick={() => setuploadForm(true)}>
                Upload
              </SuccessButton>
            </div>
          )
        )}
      </div>
    </PrimaryWrapper>
  )
}
async function fetchData(context, accessToken) {
  try {
    const data = await axios.get(
      `/seller/product/excel/${context.query.id}/details`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const result = await fetchData(context, session.accessToken)

  return {
    props: {
      session,
      data: result.data.data,
    },
  }
}
