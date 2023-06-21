import React, {useState, useEffect }from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// superadmin
import PendingCompany from "@/components/Dashboard/Superadmin/PendingCompany"
import NewInquiries from "@/components/Dashboard/Superadmin/NewInquiries";
import StatusUpdateOngoingOrder from "@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder";
import PendingShipment from "@/components/Dashboard/Superadmin/PendingShipment";
import PendingPayment from "@/components/Dashboard/Superadmin/PendingPayment";
import MemberStatistic from "@/components/Dashboard/Superadmin/MemberStatistic";

// layout for page
import Admin from "layouts/Admin.js";

export default function SuperadminDashboard({session, message}) {
  useEffect(() => {
    if(!!message){
      toast.warning(message, toastOptions)
    }
  }, [])
  const [loadingPendingCompany, setLoadingPendingCompany] = useState()
  const [pendingCompany, setPendingCompany] = useState([])
  const loadPendingCompany = async () => {
    setLoadingPendingCompany(true)
    const request = await axios.get(`/admin/companies?status=pending`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingCompany(result.data)
        }).catch((error) => {
          setPendingCompany([])
        }).finally(() => {
          setLoadingPendingCompany(false)
        })
  }
  useEffect(() => {
    loadPendingCompany()
  }, [])

  const [loadingNewInquiries, setLoadingNewInquiries] = useState()
  const [newInquiries, setNewInquiries] = useState([])
  const loadNewInquiries = async () => {
    setLoadingNewInquiries(true)
    const request = await axios.get(`/admin/orders/inquired`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setNewInquiries(result.data)
        }).catch((error) => {
          setNewInquiries([])
        }).finally(() => {
          setLoadingNewInquiries(false)
        })
  }
  useEffect(() => {
    loadNewInquiries()
  }, [])

  const [loadingActiveOrders, setLoadingActiveOrders] = useState()
  const [activeOrders, setActiveOrders] = useState([])
  const loadActiveOrders = async () => {
    setLoadingActiveOrders(true)
    const request = await axios.get(`/admin/orders/ongoing`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setActiveOrders(result.data)
        }).catch((error) => {
          setActiveOrders([])
        }).finally(() => {
          setLoadingActiveOrders(false)
        })
  }
  useEffect(() => {
    loadActiveOrders()
  }, [])

  const [loadingPendingShipments, setLoadingPendingShipments] = useState()
  const [pendingShipments, setPendingShipments] = useState([])
  const loadPendingShipments = async () => {
    setLoadingPendingShipments(true)
    const request = await axios.get(`/admin/orders/preparing_shipment`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingShipments(result.data)
        }).catch((error) => {
          setPendingShipments([])
        }).finally(() => {
          setLoadingPendingShipments(false)
        })
  }
  useEffect(() => {
    loadPendingShipments()
  }, [])

  const [loadingPendingPayments, setLoadingPendingPayments] = useState()
  const [pendingPayments, setPendingPayments] = useState([])
  const loadPendingPayments = async () => {
    setLoadingPendingPayments(true)
    const request = await axios.get(`/admin/orders/payment_verified`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingPayments(result.data)
        }).catch((error) => {
          setPendingPayments([])
        }).finally(() => {
          setLoadingPendingPayments(false)
        })
  }
  useEffect(() => {
    loadPendingPayments()
  }, [])

  const [loadingMemberStatistics, setLoadingMemberStatistics] = useState()
  const [memberStatistics, setMemberStatistics] = useState([])
  const loadMemberStatistics = async () => {
    setLoadingMemberStatistics(true)
    const request = await axios.get(`/admin/visitor`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setMemberStatistics(result)
        }).catch((error) => {
          setMemberStatistics([])
        }).finally(() => {
          setLoadingMemberStatistics(false)
        })
  }
  useEffect(() => {
    loadMemberStatistics()
  }, [])

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <PendingCompany 
            isLoading={loadingPendingCompany}
            data={pendingCompany}
          />
        </div>         
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <NewInquiries
            isLoading={loadingNewInquiries}
            data={newInquiries}
          />
        </div>         
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <StatusUpdateOngoingOrder 
            isLoading={loadingActiveOrders}
            data={activeOrders}
          />
        </div>         
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <PendingShipment 
            isLoading={loadingPendingShipments}
            data={pendingShipments}
          />
        </div>         
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <PendingPayment
            isLoading={loadingPendingPayments}
            data={pendingPayments}
          />
        </div>         
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <MemberStatistic 
            isLoading={loadingMemberStatistics}
            data={memberStatistics}
          />
        </div>         
      </div>
    </>
  )
}
  
SuperadminDashboard.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  let redirectedMessage = ''
  if(!!context.query.redirect) {
    redirectedMessage = 'Superadmin can not inquire any component!'
  }

  return {
      props: {
          session,
          message: redirectedMessage
      }
  }
}
