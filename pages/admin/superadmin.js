import Admin from 'layouts/Admin.js'
import axios from '@/lib/axios'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'

function ComponentCardAdminDashboard({dataName, name, url}) {
  return (
    <PrimaryWrapper className="border border-blue-500">
      <div className="p-4 mb-auto">
        <h1 className="font-semibold text-7xl mb-3">{dataName}</h1>
        <span className="text-md italic">{name}</span>
      </div>
      <Link
        href={url}
        className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
      >
        <div className="">
          <h1 className="text-md text-white">Check Now</h1>{' '}
        </div>
        <div className="">
          <span className="text-md">
            <i className="fas fa-chevron-right text-white"></i>
          </span>
        </div>
      </Link>
    </PrimaryWrapper>
  )
}

export default function SuperadminDashboard({session, message}) {
  const status_id = session?.user?.userDetail?.status_id
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    registry: {
      pending_companies: 0,
      uploaded_additional_documents: 0,
    },
    product_management: {
      pending_product: 0,
    },
    excel_product_file: {
      uploaded_file: 0,
      in_progress: 0,
    },
    order_process_one: {
      active_order: 0,
      approve_reject_payment: 0,
    },
    order_process_two: {
      pending_shipment: 0,
      release_payment: 0,
    },
  })

  useEffect(() => {
    if (!!message) {
      toast.warning(message, toastOptions)
    }
    async function fetchData() {
      const response = await axios
        .get(`/admin/dashboard/all`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => {
          let result = response.data.data
          setData(result)
        })
        .catch((error) => {
          setData({})
          toast.error(error.data.message, toastOptions)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    fetchData()
  }, [])

  const componentDashboardCard = () => {
    switch (status_id) {
      case '3':
        return (
          <div className="grid grid-cols-4 gap-4 mt-5">
            <ComponentCardAdminDashboard
              dataName={data?.registry?.pending_companies}
              url={'/admin/superadmin/registry/pendingcompany'}
              name={'Pending Company Registry'}
            />
          </div>
        )
      case '4':
        return (
          <div className="grid grid-cols-4 gap-4 mt-5">
            <ComponentCardAdminDashboard
              dataName={data?.product_management?.pending_product}
              url={'/admin/superadmin/product/pending'}
              name={'Pending Product Approval'}
            />
          </div>
        )
      case '5':
        return (
          <div className="grid grid-cols-4 gap-4 mt-5">
            <ComponentCardAdminDashboard
              dataName={data?.order_process_one?.active_order || 0}
              url={'/admin/superadmin/orders/allorders'}
              name={'Status Update for Active Orders'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_one?.approve_reject_payment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-uploaded'
              }
              name={'Approve/Reject Payment of Buyer'}
            />
          </div>
        )
      case '6':
        return (
          <div className="grid grid-cols-4 gap-4 mt-5">
            <ComponentCardAdminDashboard
              dataName={data.order_process_two?.pending_shipment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
              }
              name={'Pending Shipment'}
            />
            <ComponentCardAdminDashboard
              dataName={data?.order_process_two?.release_payment}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=invoice-uploaded'
              }
              name={'Release Payment to Seller'}
            />
          </div>
        )
      default:
        return (
          <>
            <h1 className="font-normal text-2xl mb-3 mt-4">Registry</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.registry?.pending_companies}
                url={'/admin/superadmin/registry/pendingcompany'}
                name={'Pending Company Registry'}
              />
              <ComponentCardAdminDashboard
                dataName={data?.registry?.uploaded_additional_documents}
                url={'/admin/superadmin/product/pending'}
                name={'Uploaded Additional Documents'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">
              Product Management
            </h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.product_management?.pending_product}
                url={'/admin/superadmin/product/pending'}
                name={'Pending Product Approval'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">
              Excel Product Management
            </h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.excel_product_file?.uploaded_file}
                url={'/admin/superadmin/product/uploaded'}
                name={'New File Uploaded'}
              />

              <ComponentCardAdminDashboard
                dataName={data?.excel_product_file?.in_progress}
                url={'/admin/superadmin/product/uploaded'}
                name={'File In Progress'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">Orders</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.order_process_one?.active_order || 0}
                url={'/admin/superadmin/orders/allorders'}
                name={'Status Update for Active Orders'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order_process_one?.approve_reject_payment || 0}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=payment-uploaded'
                }
                name={'Approve/Reject Payment of Buyer'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order_process_two?.pending_shipment || 0}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
                }
                name={'Pending Shipment'}
              />
              <ComponentCardAdminDashboard
                dataName={data?.order_process_two?.release_payment || 0}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=invoice-uploaded'
                }
                name={'Release Payment to Seller'}
              />
              <ComponentCardAdminDashboard
                dataName={data.uploaded_additional_documents || 0}
                url={'/admin/superadmin/registry/uploadedcompany'}
                name={'Additional Document Need to Review'}
              />
              <ComponentCardAdminDashboard
                dataName={data.reimbursement || 0}
                url={'/admin/superadmin/reimbursement/active'}
                name={'Reimbursement'}
              />
            </div>
          </>
        )
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">Admin Dashboards</h1>
        </div>
      </div>

      {componentDashboardCard()}
    </>
  )
}

SuperadminDashboard.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let redirectedMessage = ''
  if (!!context.query.redirect) {
    redirectedMessage = 'Superadmin cannot inquire any component!'
  }

  return {
    props: {
      session,
      message: redirectedMessage,
    },
  }
}
