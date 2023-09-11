import React, {useState, useEffect }from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

import Link from "next/link";

// superadmin
import PendingCompany from "@/components/Dashboard/Superadmin/PendingCompany"
import NewInquiries from "@/components/Dashboard/Superadmin/NewInquiries";
import StatusUpdateOngoingOrder from "@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder";
import PendingShipment from "@/components/Dashboard/Superadmin/PendingShipment";
import PendingPayment from "@/components/Dashboard/Superadmin/PendingPayment";
import MemberStatistic from "@/components/Dashboard/Superadmin/MemberStatistic";

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";

export default function SuperadminDashboard({session, message}) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    pending_companies: 0,
    pending_product: 0,
    order_process_one: {
        active_order: 0,
        approve_reject_payment: 0
    },
    order_process_two: {
        pending_shipment: 0,
        release_payment: 0
    }
  })

  useEffect(() => {
    if(!!message){
      toast.warning(message, toastOptions)
    }
    async function fetchData(){
      const response = await axios.get(`/admin/dashboard/all`, {
          headers: {
              "Authorization" : `Bearer ${session.accessToken}`
          }
      })
      .then((response) => {
          let result = response.data.data
          setData(result)
        }).catch((error) => {
          setData({})
          toast.error(error.data.message, toastOptions)
        }).finally(() => {
          setIsLoading(false)
        })
    }
    fetchData()       
  }, [])

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="">
            <h1 className="font-semibold text-2xl">
              Admin Dashboard
            </h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <PrimaryWrapper className="border border-blue-500">
          <div className="p-4 mb-auto">
            <h1 className="font-semibold text-7xl mb-3">
              {data.pending_companies}
            </h1>
            <span className="text-md italic">Pending Company</span>
          </div>
          <Link
            href="/admin/superadmin/registry/pendingcompany"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
              {data.pending_product}
            </h1>
            <span className="text-md italic">Pending Product</span>
          </div>
          <Link
            href="/admin/superadmin/product/pending"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
              {data.order_process_one.active_order}
            </h1>
            <span className="text-md italic">Active Orders</span>
          </div>
          <Link
            href="/admin/superadmin/orders/allorders"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
              {data.order_process_one.approve_reject_payment}
            </h1>
            <span className="text-md italic">Approve / Reject Payment</span>
          </div>
          <Link
            href="/admin/superadmin/orders/allorders?orderStatus=payment-uploaded"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
              {data.order_process_two.pending_shipment}
            </h1>
            <span className="text-md italic">Pending Shipment</span>
          </div>
          <Link
            href="/admin/superadmin/orders/allorders?orderStatus=payment-accepted"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
              {data.order_process_two.release_payment}
            </h1>
            <span className="text-md italic">Release Payment</span>
          </div>
          <Link
            href="/admin/superadmin/orders/allorders?orderStatus=invoice-uploaded"
            className="flex flex-wrap items-center justify-between bg-blue-500 py-2 px-4">
            <div className="">
                <h1 className="text-md text-white">
                  Check Now
                </h1>
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
  
SuperadminDashboard.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let redirectedMessage = ''
  if(!!context.query.redirect) {
    redirectedMessage = 'Superadmin cannot inquire any component!'
  }

  return {
      props: {
          session,
          message: redirectedMessage
      }
  }
}
