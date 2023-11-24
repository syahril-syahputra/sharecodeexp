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
    excel_product_file: {
      update_request: 0,
      in_progress: 0,
    },
    order: {
      incoming_inquiries: 0,
      provide_tracking_number: 0,
      good_test_result: 0,
      waiting_for_payment: 0,
      bad_test_result: 0,
    },
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
      <h1 className="font-normal text-2xl mb-3 mt-4">
        Excel Product Management
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.excel_product_file.update_request}
            </h1>
            <span className="text-md italic">Update Requested</span>
          </div>
          <Link
            href={`/admin/member/seller/product/uploaded?status=update-request`}
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
      <hr className="border-gray-500 my-4" />
      <h1 className="font-normal text-2xl mb-3">Order</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order.incoming_inquiries}
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
              {data.order.provide_tracking_number}
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
              {data.order.good_test_result}
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
              {data.order.waiting_for_payment || 0}
            </h1>
            <span className="text-md italic">Waiting For Payment</span>
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
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order.bad_test_result || 0}
            </h1>
            <span className="text-md italic">Bad Test Result</span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.returnedProduct.active.index}`}
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
