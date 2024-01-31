import {useRouter} from 'next/router'
import React, {useState} from 'react'
import Admin from 'layouts/Admin.js'
import {getSession} from 'next-auth/react'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileExcel} from '@fortawesome/free-solid-svg-icons'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal'
import {FileInput, Spinner} from 'flowbite-react'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import SuccessButton from '@/components/Interface/Buttons/SuccessButton'
import BaseTable from '@/components/Interface/Table/BaseTable'
import {checkValue} from '@/utils/general'
import NoData from '@/components/Interface/Table/NoData'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'

DetailUploadedExcel.layout = Admin
export default function DetailUploadedExcel({session, data}) {
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
        '/seller/product/excel/update/' + data?.excel.id,
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


  const arrEvent = data?.excel?.event_history || []
  const lastElement = arrEvent.findLast((item) => true)

  return (
    <>
      {
        data?.excel?.event_history?.length > 0 && (
          <PrimaryNotification
            detail={lastElement?.description ?? null}
          />
        )
      }
      {data.excel?.requested && (
        <InfoNotification
          message="New Request From Admin"
          detail={
            <a
              onClick={() => setisRequestShow(true)}
              className="text-white text-xs block mt-1 italic underline hover:text-gray-600 cursor-pointer"
            >
              Show Request
            </a>
          }
        />
      )}

      {data.excel?.requested && isRequestShow && (
        <BaseModalMedium
          title="Request Update From Admin"
          onClick={() => setisRequestShow(false)}
          body={<div>{data.excel?.requested}</div>}
        ></BaseModalMedium>
      )}
      <PrimaryWrapper>
        <PageHeader
          leftTop={
            <h3 className={'font-semibold text-lg text-blueGray-700'}>
              Detail File Excel
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
                <td className="text-sm px-2 py-4">{checkValue(data.excel?.name)}</td>
              </tr>
              <tr className="text-black hover:bg-slate-100">
                <th scope="col" className="px-6 py-3">
                  Excel Status
                </th>
                <td scope="row" className="text-sm px-6 py-4">
                  :
                </td>
                <td className="text-sm px-2 py-4">{checkValue(data.excel?.file_status?.name)}</td>
              </tr>
              <tr className="text-black hover:bg-slate-100">
                <th scope="col" className="px-6 py-3">
                  Uploaded at
                </th>
                <td scope="row" className="text-sm px-6 py-4">
                  :
                </td>
                <td className="text-sm px-2 py-4">
                  {moment(data.excel?.created_at).local().format('dddd, D MMMM YYYY')} {/* set to local time */}
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
                  {moment(data.excel?.updated_at).local().format('dddd, D MMMM YYYY')} {/* set to local time */}
                </td>
              </tr>
              <tr className="text-black hover:bg-slate-100">
                <th scope="col" className="px-6 py-3">
                  Log
                </th>
                <td scope="row" className="text-sm px-6 py-4">
                  :
                </td>
                <td className="text-sm px-2 py-4">{checkValue(data.excel?.log)}</td>
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
                  <SuccessButton onClick={() => validate()}>
                    Upload
                  </SuccessButton>
                </div>
              )}
            </div>
          ) : (
            //   data.excel_product_file_status_id && (
            parseInt(data.excel?.excel_product_file_status_id) === 7 && (
              <div className="p-5">
                <SuccessButton onClick={() => setuploadForm(true)}>
                  Upload
                </SuccessButton>
              </div>
            )
          )}
        </div>
      </PrimaryWrapper>
      <PrimaryWrapper className="p-1">
        <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
          Event History
        </div>
        <ul className="space-y-2 p-2 text-sm">
          {data?.excel?.event_history?.length === 0 && (
            <div className="text-base italic text-center p-4">
              No Event History
            </div>
          )}
          {data.excel?.event_history?.map((item) => (
            <li key={item.id} className="flex">
              <span className="text-cyan-700 mr-2 w-1/5 ">
                {moment(item.updated_at).local().format('DD MMM YYYY hh:mm')} {/* set to local time */}
              </span>
              <div>
                <span className="font-bold">{item.description}</span>
                {item.note && <div className="italic py-2">{item.note}</div>}
              </div>
            </li>
          ))}
        </ul>
      </PrimaryWrapper>
      <PrimaryWrapper className="p-1">
        <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
          On Going Order
        </div>
        <div className="mx-2 my-1 text-sm font-bold text-gray-500">
          Note:
        </div>
        <div className="mx-2 text-sm text-gray-500 mb-5">
          Avoid excel row to contain this Product Number.
        </div>
        <div className="">
          <BaseTable
            header={
              <>
                <th scope="col" className="px-6 py-3">
                  Product Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Manufacturer
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Status
                </th>
              </>
            }
            tableData={
              <>
                {
                  data?.products?.map((item, index) => {
                    return (
                      <tr key={index} className="border-b odd:bg-gray-50 even:bg-gray-100">
                        <td scope="row" className="text-sm px-6 py-2">
                          {checkValue(item?.companies_products?.manufacturer_number)}
                        </td>
                        <td scope="row" className="text-sm px-6 py-2">
                          {checkValue(item.companies_products?.manufacture)}
                        </td>
                        <td scope="row" className="text-sm px-6 py-2">
                          {checkValue(item.companies_products?.stock_country)}
                        </td>
                        <td scope="row" className="text-sm px-6 py-2">
                          {checkValue(item.companies_products?.date_code)}
                        </td>
                        <td scope="row" className="text-sm px-6 py-2">
                          {checkValue(item.order_status?.name)}
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  data?.products?.length === 0 &&
                  <NoData colSpan={5} />
                }
              </>
            }
          />
        </div>
      </PrimaryWrapper>
    </>
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
