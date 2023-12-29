import React, {useEffect, useState} from 'react'
import {VendorUrl} from '@/route/route-url'
import {getSession} from 'next-auth/react'
import axios from '@/lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import Link from 'next/link'

export default function SellerDashboard({session}) {
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
    await axios
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

  function ComponentCardAdminDashboard({onClick, dataName, name, url, dataNameNotification}) {
    return (
      <PrimaryWrapper className="border border-blue-500">
        <div className="p-4 mb-auto">
          <div className="flex justify-between">
            <h1 className="font-semibold text-7xl mb-3">{dataName}</h1>
            {(typeof dataNameNotification == 'string' ? Number(dataNameNotification) > 0 : dataNameNotification > 0) &&
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

  async function resetCounter(counterKey) {
    // /buyer/dashboard/counter
    await axios
      .post(`/seller/dashboard/counter-checker/${counterKey}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
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
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.excel_product_file?.update_request || 0}
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
        </PrimaryWrapper> */}
        <ComponentCardAdminDashboard
          dataName={data.excel_product_file?.update_request || 0}
          name={"Update Requested"}
          url={`/admin/member/seller/product/uploaded?status=update-request`}
          onClick={() => resetCounter('update-request')}
          dataNameNotification={data.order?.newly_update?.update_request}
        />
        {/* <ComponentCardAdminDashboard
          dataName={data.excel_product_file?.in_progress || 0}
          name={"Inprogress Requested"}
          url={`/admin/member/seller/product/uploaded?status=inprogress-request`}
          onClick={() => resetCounter('update-request')}
          dataNameNotification={data.order?.newly_update?.in_progress}
        /> */}
      </div>
      <hr className="border-gray-500 my-4" />
      <h1 className="font-normal text-2xl mb-3">Order</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.incoming_inquiries}
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
        </PrimaryWrapper> */}
        <ComponentCardAdminDashboard
          dataName={data.order?.incoming_inquiries || 0}
          name={"Verified / Reject New Inquiries"}
          url={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=inquiry-sent`}
          onClick={() => resetCounter('incoming-inquiries')}
          dataNameNotification={data.order?.newly_update?.incoming_inquiries}
        />
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.provide_tracking_number}
            </h1>
            <span className="text-md italic">Orders Need Tracking Number</span>
          </div>
          <Link
            href={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=payment-accepted`}
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
        </PrimaryWrapper> */}
        <ComponentCardAdminDashboard
          dataName={data.order?.provide_tracking_number || 0}
          name={"Orders Need Tracking Number"}
          url={`${VendorUrl.sellingProduct.incomingInquiries.index}/?orderStatus=payment-accepted`}
          onClick={() => resetCounter('provide-tracking-number')}
          dataNameNotification={data.order?.newly_update?.provide_tracking_number}
        />
        {/* Kode di comment masuk kedalam sprint 7 
        https://venatronics-dev.atlassian.net/jira/software/projects/EX/boards/2?assignee=712020%3A7e9286ec-874a-4a10-826a-81ccef33c4c3&selectedIssue=EX-430
        */}
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.good_test_result}
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
        </PrimaryWrapper> */}
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.waiting_for_payment || 0}
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
        </PrimaryWrapper> */}
        {/* <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.bad_test_result || 0}
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
        </PrimaryWrapper> */}
        <ComponentCardAdminDashboard
          dataName={data.order?.bad_test_result || 0}
          name={"Bad Test Result"}
          url={`${VendorUrl.sellingProduct.returnedProduct.active.index}`}
          onClick={() => resetCounter('bad-test-result')}
          dataNameNotification={data.order?.newly_update?.bad_test_result}
        />
        <ComponentCardAdminDashboard
          dataName={data.order?.handling_product || 0}
          name={"Payment for Handling Product"}
          url={`${VendorUrl.sellingProduct.returnedProduct.completed?.index}`}
          onClick={() => resetCounter('handling-product')}
          dataNameNotification={data.order?.newly_update?.handling_product}
        />
      </div>
      {/* <hr className='border-gray-500 my-4' />
      <h1 className='font-normal text-2xl mb-3'>Product</h1>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        <PrimaryWrapper className={'border border-blue-500'}>
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.order?.bad_test_result || 0}
            </h1>
            <span className="text-md italic">Payment for Handling Product</span>
          </div>
          <Link
            // href={`${VendorUrl.sellingProduct.returnedProduct.active.index}`}
            href=""
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
      </div> */}
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
