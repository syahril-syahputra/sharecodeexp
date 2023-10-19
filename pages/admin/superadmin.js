import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

import Link from 'next/link'

// superadmin
import PendingCompany from '@/components/Dashboard/Superadmin/PendingCompany'
import NewInquiries from '@/components/Dashboard/Superadmin/NewInquiries'
import StatusUpdateOngoingOrder from '@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder'
import PendingShipment from '@/components/Dashboard/Superadmin/PendingShipment'
import PendingPayment from '@/components/Dashboard/Superadmin/PendingPayment'
import MemberStatistic from '@/components/Dashboard/Superadmin/MemberStatistic'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'

function ComponentCardAdminDashboard({ dataName, name, url }) {
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

export default function SuperadminDashboard({ session, message }) {
  const { status_id } = session?.user?.userDetail
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    pending_companies: 0,
    pending_product: 0,
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
          <ComponentCardAdminDashboard
            dataName={data.pending_companies}
            url={'/admin/superadmin/registry/pendingcompany'}
            name={'Pending Company'}
          />
        )
      case '4':
        return (
          <ComponentCardAdminDashboard
            dataName={data.pending_product}
            url={'/admin/superadmin/product/pending'}
            name={'Pending Product'}
          />
        )
      case '5':
        return (
          <>
            <ComponentCardAdminDashboard
              dataName={data?.order_process_one?.active_order || 0}
              url={'/admin/superadmin/orders/allorders'}
              name={'Active Orders'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_one?.approve_reject_payment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-uploaded'
              }
              name={'Approve / Reject Payment'}
            />
          </>
        )
      case '6':
        return (
          <>
            <ComponentCardAdminDashboard
              dataName={data.order_process_two?.pending_shipment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
              }
              name={'Pending Shipment'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_two.release_payment}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=invoice-uploaded'
              }
              name={'Release Payment'}
            />
          </>
        )
      default:
        return (
          <>
            <ComponentCardAdminDashboard
              dataName={data.pending_companies}
              url={'/admin/superadmin/registry/pendingcompany'}
              name={'Pending Company'}
            />
            <ComponentCardAdminDashboard
              dataName={data.pending_product}
              url={'/admin/superadmin/product/pending'}
              name={'Pending Product'}
            />
            <ComponentCardAdminDashboard
              dataName={data?.order_process_one?.active_order || 0}
              url={'/admin/superadmin/orders/allorders'}
              name={'Active Orders'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_one?.approve_reject_payment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-uploaded'
              }
              name={'Approve / Reject Payment'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_two?.pending_shipment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=payment-accepted'
              }
              name={'Pending Shipment'}
            />
            <ComponentCardAdminDashboard
              dataName={data.order_process_two.release_payment || 0}
              url={
                '/admin/superadmin/orders/allorders?orderStatus=invoice-uploaded'
              }
              name={'Release Payment'}
            />
            <ComponentCardAdminDashboard
              dataName={data.uploaded_additional_documents || 0}
              url={'/admin/superadmin/registry/uploadedcompany'}
              name={'Additional Document Need to Review'}
            />
          </>
        )
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">Admin Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {componentDashboardCard()}
      </div>
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
