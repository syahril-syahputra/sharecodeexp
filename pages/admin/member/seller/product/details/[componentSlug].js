import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import axios from 'lib/axios'
import {getSession} from 'next-auth/react'
import Admin from 'layouts/Admin.js'
import ComponentStatus from '@/components/Shared/Component/Statuses'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import {toastOptions} from '@/lib/toastOptions'
import DangerNotification from '@/components/Interface/Notification/DangerNotification'
import LoadingState from '@/components/Interface/Loader/LoadingState'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import {toast} from 'react-toastify'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import OutofStockDialog from '@/components/Modal/OutofStockDialog'

export default function MyProduct({session, routeParam}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [slugState, setSlugState] = useState('')

  const getData = async () => {
    setIsLoading(true)
    await axios
      .get(`/companyproduct?id=${routeParam.componentSlug}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setData(result)
      })
      .catch((error) => {
        toast.error(error.data.message, toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <PrimaryWrapper>
        <PageHeader
          leftTop={
            <h3 className={'font-semibold text-lg text-blueGray-700'}>
              Product Details
            </h3>
          }
          rightTop={
            <>
              {!!data.id &&
                (data?.moq === 0 ||
                  data?.AvailableQuantity === 0 ||
                  data?.moq === null ||
                  data?.AvailableQuantity === null ? undefined : (
                  <DangerButton
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setShowModal(true)
                      setSlugState(data?.slug)
                    }}
                  >
                    {showModal == true ? (
                      <i className="px-3 fas fa-hourglass fa-spin"></i>
                    ) : (
                      'Out of Stock'
                    )}
                  </DangerButton>
                ))}
              {!!data.id && (
                <Link href={`/admin/member/seller/product/edit/${data.slug}`}>
                  <WarningButton size="sm">
                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                    Edit Product
                  </WarningButton>
                </Link>
              )}
            </>
          }
        />
        {data.reason && data.status == 'rejected' && (
          <DangerNotification
            message={`Component is rejected`}
            detail={data.reason}
          />
        )}
        {!isLoading ? (
          <>
            {/* <div className="w-full">
              {data.img ? (
                <div className="p-16 border mx-2 my-4">
                  <img
                    className="object-contain mb-3 h-40 mx-auto"
                    alt={data.ManufacturerNumber}
                    src={publicDir + '/product_images/' + data.img}
                  />
                </div>
              ) : (
                <div className="px-3 mb-6 md:mb-0 text-center">
                  <div className="p-24 border mx-2 my-4">
                    product image {data.ManufacturerNumber}
                  </div>
                </div>
              )}
            </div> */}
            <div className="overflow-x-auto pb-10">
              <table className="w-50 text-sm text-left text-gray-500 bg-white">
                <tbody>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Manufacturer Part Number
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">
                      {data.ManufacturerNumber}
                    </td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Manufacturer
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.Manufacture}</td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Available Quantity
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">
                      {data.AvailableQuantity === null ||
                        parseInt(data?.AvailableQuantity) === 0 ||
                        data.AvailableQuantity === undefined
                        ? 'Out of Stock'
                        : data?.AvailableQuantity}
                    </td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      MOQ
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">
                      {' '}
                      {data.moq === null ||
                        parseInt(data?.moq) === 0 ||
                        data.moq === undefined
                        ? 'Out of Stock'
                        : data?.moq}
                    </td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Stock Location
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.country}</td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Product/Part Description
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.Description}</td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Date Code
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.dateCode}</td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Packaging
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.packaging}</td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">
                      <ComponentStatus
                        status={data.status}
                        title={`stock status ${data.status}`}
                        label={data.status}
                      />
                    </td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Created on
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">
                      {moment(data.created_at).local().format('dddd, D MMMM YYYY')} {/* set to local time */}  
                    </td>
                  </tr>
                  <tr className="text-black hover:bg-slate-100">
                    <th scope="col" className="px-6 py-3">
                      Note
                    </th>
                    <td scope="row" className="text-sm px-6 py-4">
                      :
                    </td>
                    <td className="text-sm px-2 py-4">{data.note}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <LoadingState className={'pb-40'} />
        )}
      </PrimaryWrapper>
      <PrimaryWrapper className="p-1">
        {!isLoading ? (
          <>
            <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
              Event History
            </div>
            <ul className="space-y-2 p-2 text-sm">
              {data.event_history?.length === 0 && (
                <div className="text-base italic text-center p-4">
                  No Event History
                </div>
              )}
              {data.event_history?.map((item) => (
                <li key={item.id} className="flex">
                  <span className="text-cyan-700 mr-2 w-1/5 ">
                    {moment(item.updated_at)
                      .local()
                      .format('DD MMM YYYY hh:mm')}
                  </span>
                  <div>
                    <span className="font-bold">{item.description}</span>
                    {item.note && (
                      <div className="italic py-2">{item.note}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <LoadingState className={'pb-20'} />
        )}
      </PrimaryWrapper>
      {showModal ? (
        <OutofStockDialog
          setShowModal={setShowModal}
          item={slugState}
          isLoading={[isLoadingModal, setIsLoadingModal]}
          session={session}
          routerParam={routeParam}
          callback={() => {
            getData()
          }}
        />
      ) : null}
    </>
  )
}

MyProduct.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
      routeParam: context.query,
    },
  }
}
