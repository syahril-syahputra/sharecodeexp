import React, {useState, useEffect }from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import axios from "@/lib/axios";

// superadmin
import PendingCompany from "@/components/Dashboard/Superadmin/PendingCompany"
import NewInquiries from "@/components/Dashboard/Superadmin/NewInquiries";
import StatusUpdateOngoingOrder from "@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder";
import PendingShipment from "@/components/Dashboard/Superadmin/PendingShipment";
import PendingPayment from "@/components/Dashboard/Superadmin/PendingPayment";
import MemberStatistic from "@/components/Dashboard/Superadmin/MemberStatistic";

// member
import NewInquiriesMember from "@/components/Dashboard/Member/NewInquiries";

// layout for page
import Admin from "layouts/Admin.js";

export default function Dashboard({session}) {
  const [superadmin, setSuperadmin] = useState()
  const [companyStatus, setCompanyStatus] = useState()

  useEffect(() => {
    setSuperadmin(session.user.userDetail.role_id == 1 ? true : false)
    setCompanyStatus(session.user.isCompanyConfirmed)
  }, [])

  const [loadingPendingCompany, setLoadingPendingCompany] = useState()
  const [pendingCompany, setPendingCompany] = useState([])
  const loadPendingCompany = async () => {
    setLoadingPendingCompany(true)
    const response = await axios.get(`/admin/companies?status=pending`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingCompany(result.data)
        }).catch((error) => {
          console.log(error)
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
    const response = await axios.get(`/admin/orders/inquired`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setNewInquiries(result.data)
        }).catch((error) => {
          console.log(error)
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
    const response = await axios.get(`/admin/orders/ongoing`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setActiveOrders(result.data)
        }).catch((error) => {
          console.log(error)
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
    const response = await axios.get(`/admin/orders/preparing_shipment`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingShipments(result.data)
        }).catch((error) => {
          console.log(error)
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
    const response = await axios.get(`/admin/orders/payment_verified`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          setPendingPayments(result.data)
        }).catch((error) => {
          console.log(error)
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
    const response = await axios.get(`/admin/visitor`,
        {
            headers: {
            "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
          let result = response.data.data
          console.log(result)
          setMemberStatistics(result)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoadingMemberStatistics(false)
        })
  }
  useEffect(() => {
    loadMemberStatistics()
  }, [])

  return (
    <>
      { superadmin && 
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
      }
  </>
  )
}
  

Dashboard.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
      props: {
          session: session
      }
  }
}
