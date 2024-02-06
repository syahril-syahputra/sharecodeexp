import { VendorUrl } from '@/route/route-url'

import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import Link from 'next/link'

export default function BuyerDashboard({ session }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    order: {
      accept_quotation: 0,
      pending_payment: 0,
      ongoing_test: 0,
      ready_to_pick: 0,
      confirm_receipt_of_shipment: 0,
      reimbursement_active: 0,
    },
  })
  const loadData = async () => {
    setIsLoading(true)
    await axios
      .get(`/buyer/dashboard/counter`, {
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

  function ComponentCardBuyerDashboard({
    onClick,
    dataName,
    name,
    url,
    dataNameNotification,
  }) {
    return (
      <PrimaryWrapper className="border border-blue-500">
        <div className="p-4 mb-auto">
          <div className="flex justify-between">
            <h1 className="font-semibold text-7xl mb-3">{dataName}</h1>
            {(typeof dataNameNotification == 'string'
              ? Number(dataNameNotification) > 0
              : dataNameNotification > 0) && (
              <>
                <span className="relative px-2">
                  <i className="fas fa-bell text-5xl text-orange-500"></i>
                  <div className="absolute inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-orange-500 bg-white border-2 border-orange-500 rounded-full -end-1">
                    {dataNameNotification}
                  </div>
                </span>
              </>
            )}
          </div>
          <span className="text-md italic">{name}</span>
        </div>
        <Link
          onClick={onClick}
          href={url}
          className={`flex flex-wrap items-center justify-between  py-2 px-4 ${
            parseInt(dataName) === 0 ? 'bg-blue-500' : 'bg-orange-500'
          }`}
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

  async function resetCounter(counterKey) {
    await axios.post(
      `/buyer/dashboard/counter-checker/${counterKey}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <h1 className="font-normal text-2xl mb-3 mt-4">Buyer's Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <ComponentCardBuyerDashboard
          dataName={data.order?.accept_quotation}
          name={'Accept / Reject Quatations'}
          url={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=inquiry-verified`}
          onClick={() => resetCounter('order-accept-quotation')}
          dataNameNotification={data.order?.newly_update?.accept_quotation}
        />
        <ComponentCardBuyerDashboard
          dataName={data.order?.pending_payment}
          name={'Pending Payments'}
          url={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=proforma-invoice-sent`}
          onClick={() => resetCounter('order-pending-payment')}
          dataNameNotification={data.order?.newly_update?.pending_payment}
        />
        <ComponentCardBuyerDashboard
          dataName={data.order?.ready_to_pick}
          name={'Orders Ready to Pick Up'}
          url={`${VendorUrl.buyingProduct.inquiredProduct.index}/order-active/?orderStatus=good-test-result`}
          onClick={() => resetCounter('order-ready-to-pick')}
          dataNameNotification={data.order?.newly_update?.ready_to_pick}
        />
        <ComponentCardBuyerDashboard
          dataName={data.order?.confirm_receipt_of_shipment}
          name={'Confirm Receipt of Shipment'}
          url={`${VendorUrl.buyingProduct.inquiredProduct.index}/order-active/?orderStatus=shipped-to-buyer`}
          onClick={() => resetCounter('order-confirm-receipt-of-shipment')}
          dataNameNotification={
            data.order?.newly_update?.confirm_receipt_of_shipment
          }
        />
      </div>
    </>
  )
}

BuyerDashboard.layout = Admin

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
