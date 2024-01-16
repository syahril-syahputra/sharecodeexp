import React, {useState, useEffect} from 'react'
import axios from '@/lib/axios'
import {getSession} from 'next-auth/react'
import Link from 'next/link'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import SuccessBadges from '@/components/Interface/Badges/SuccessBadges'

function ComponentCardAdminDashboard({onClick, dataName, name, url, dataNameNotification}) {
  return (
    <PrimaryWrapper className="border border-blue-500">
      <div className="p-4 mb-auto">
        <div className="flex justify-between">
          <h1 className="font-semibold text-7xl mb-3">{dataName}</h1>
          {!!dataNameNotification &&
            <>
              <span className="relative px-2">
                <i className="fas fa-bell text-5xl text-orange-500"></i>
                <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-orange-500 bg-white border-2 border-orange-500 rounded-full -end-1">{dataNameNotification}</div>
              </span>
            </>
          }
        </div>
        <span className="text-md italic">{name}</span>
      </div>
      <Link
        onClick={onClick}
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

  async function fetchData() {
    await axios
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
  useEffect(() => {
    if (!!message) {
      toast.warning(message, toastOptions)
    }
    fetchData()
  }, [])

  async function resetCounter(counterKey) {
    await axios
      .post(`/admin/dashboard/counter-checker/${counterKey}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
  }

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
              dataName={data?.order?.active_order || 0}
              url={'/admin/superadmin/orders/allorders'}
              name={'Status Update for Active Orders'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order?.approve_reject_payment || 0}
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
              dataName={data.order?.pending_shipment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
              }
              name={'Pending Shipment'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order.release_payment}
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
                dataName={data?.registry?.pending_companies || 0}
                dataNameNotification={data.registry?.newly_update?.pending_companies}
                onClick={() => resetCounter('registry-pending-companies')}
                url={'/admin/superadmin/registry/pendingcompany'}
                name={'Pending Company Registry'}
              />
              <ComponentCardAdminDashboard
                dataName={data?.registry?.uploaded_additional_documents || 0}
                dataNameNotification={data.registry?.newly_update?.uploaded_additional_documents}
                onClick={() => resetCounter('registry-uploaded-additional-documents')}
                url={'/admin/superadmin/registry/uploadedcompany'}
                name={'Additional Document Need to Review'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">
              Product Management
            </h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.product_management?.pending_products || 0}
                dataNameNotification={data.product_management?.newly_update?.pending_products}
                onClick={() => resetCounter('product-management-pending-products')}
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
                dataName={data?.excel_product_file?.uploaded_file || 0}
                dataNameNotification={data.excel_product_file?.newly_update?.uploaded_file}
                onClick={() => resetCounter('excel-product-file-uploaded-file')}
                url={'/admin/superadmin/product/uploaded'}
                name={'New File Uploaded'}
              />
              <ComponentCardAdminDashboard
                dataName={data?.excel_product_file?.in_progress || 0}
                dataNameNotification={data.excel_product_file?.newly_update?.in_progress}
                onClick={() => resetCounter('excel-product-file-in-progress')}
                url={'/admin/superadmin/product/uploaded'}
                name={'File In Progress'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">Orders</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data?.order?.active_order || 0}
                dataNameNotification={data.order?.newly_update?.active_order}
                onClick={() => resetCounter('order-active-order')}
                url={'/admin/superadmin/orders/allorders'}
                name={'Status Update for Active Orders'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order?.approve_reject_payment || 0}
                dataNameNotification={data.order?.newly_update?.approve_reject_payment}
                onClick={() => resetCounter('order-approve-reject-payment')}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=payment-uploaded'
                }
                name={'Approve/Reject Payment of Buyer'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order?.pending_shipment || 0}
                dataNameNotification={data.order?.newly_update?.pending_shipment}
                onClick={() => resetCounter('order-pending-shipment')}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
                }
                name={'Pending Shipment'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order?.ongoing_test || 0}
                dataNameNotification={data.order?.newly_update?.ongoing_test}
                onClick={() => resetCounter('order-ongoing-test')}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=shipped-to-lab'
                }
                name={'Ongoing Test'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order?.reimbursement_active || 0}
                dataNameNotification={data.order?.newly_update?.reimbursement_active}
                onClick={() => resetCounter('order-reimbursement-active')}
                url={
                  '/admin/superadmin/orders/allorders?orderStatus=product-accepted'
                }
                name={'Release Payment to Seller'}
              />
            </div>
            <hr className="border-gray-500 my-4" />
            <h1 className="font-normal text-2xl mb-3 mt-4">Bad Test Result</h1>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <ComponentCardAdminDashboard
                dataName={data.order?.bad_test_result || 0}
                dataNameNotification={data.order?.newly_update?.bad_test_result}
                onClick={() => resetCounter('order-bad-test-result')}
                url={
                  '/admin/superadmin/return-handling/active?orderStatus=bad-test-result'
                }
                name={'Bad Test Result'}
              />
              <ComponentCardAdminDashboard
                dataName={data.order?.reimbursement || 0}
                dataNameNotification={data.order?.newly_update?.reimbursement_active}
                onClick={() => resetCounter('order-reimbursement')}
                url={'/admin/superadmin/reimbursement/active'}
                name={'Release Payment to Buyer'}
              />
              {/* return_handling */}
              <ComponentCardAdminDashboard
                dataName={data.order?.return_handling || 0}
                dataNameNotification={data.order?.newly_update?.return_handling}
                onClick={() => resetCounter('order-return-handling')}
                url={'/admin/superadmin/return-handling/active'}
                name={'Return Handling'}
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
