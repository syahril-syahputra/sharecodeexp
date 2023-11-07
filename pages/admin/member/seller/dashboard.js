import React, { useEffect, useState } from 'react'
import { VendorUrl } from '@/route/route-url'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import Link from 'next/link'

export default function SellerDashboard({ session }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    incoming_inquiries: 0,
    provide_tracking_number: 0,
    good_test_result: 0,
    upload_invoice: 0,
  })

  const loadData = async () => {
    setIsLoading(true)
    const response = await axios
      .get(`/seller/dashboard/counter`, {
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
          <h1 className="font-semibold text-2xl">Seller's Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.incoming_inquiries}
            </h1>
            <span className="text-md italic">
              Verified / Reject New Inquiries
            </span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=inquiry-sent`}
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
              {data.provide_tracking_number}
            </h1>
            <span className="text-md italic">Orders Need Tracking Number</span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=proforma-invoice-sent`}
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
              {data.good_test_result}
            </h1>
            <span className="text-md italic">Good Test Result</span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=good-test-result`}
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
              {data.upload_invoice}
            </h1>
            <span className="text-md italic">Orders Need Invoice</span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=product-accepted`}
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

SellerDashboard.layout = Admin

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
