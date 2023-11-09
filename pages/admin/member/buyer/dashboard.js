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
    accept_quotation: 0,
    pending_payment: 0,
    ongoing_test: 0,
    order_ready_to_pick: 0,
    confirm_receipt_of_shipment: 0,
    reimbursement: 0,
  })
  const loadData = async () => {
    setIsLoading(true)
    const response = await axios
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

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
          <h1 className="font-semibold text-2xl">Buyer's Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.accept_quotation}
            </h1>
            <span className="text-md italic">Accept / Reject Quotations</span>
          </div>
          <Link
            href={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=inquiry-verified`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.pending_payment}
            </h1>
            <span className="text-md italic">Pending Payments</span>
          </div>
          <Link
            href={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=proforma-invoice-sent`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">{data.ongoing_test}</h1>
            <span className="text-md italic">On-going Test</span>
          </div>
          <Link
            href={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=shipped-to-lab`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order_ready_to_pick}
            </h1>
            <span className="text-md italic">Orders Ready to Pick Up</span>
          </div>
          <Link
            href={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=good-test-result`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.confirm_receipt_of_shipment}
            </h1>
            <span className="text-md italic">Confirm Receipt of Shipment</span>
          </div>
          <Link
            href={`${VendorUrl.buyingProduct.inquiredProduct.index}/?orderStatus=shipped-to-buyer`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
        {/* reimbursement_active */}
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.reimbursement || 0}
            </h1>
            <span className="text-md italic">Reimbursement Active</span>
          </div>
          <Link
            href={`${VendorUrl.reimbursement.active.index}`}
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4"
          >
            <div className="">
              <h1 className="text-md text-white">Check Now</h1>
            </div>
            <div className="">
              <span className="text-md">
                <i className="fas fa-chevron-right text-white"></i>
              </span>
            </div>
          </Link>
        </PrimaryWrapper>
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
