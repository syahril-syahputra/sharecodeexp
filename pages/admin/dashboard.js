import React, {useState, useEffect }from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react"

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


  return (
    <>
      { superadmin && 
        <>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-5/12 px-4">
              <PendingCompany />
            </div>
            <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
              <NewInquiries/>
            </div>          
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full px-4">
              <StatusUpdateOngoingOrder />
            </div>         
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-6/12 px-4">
              <PendingShipment />
            </div>
            <div className="w-full xl:w-6/12 px-4">
              <PendingPayment/>
            </div>          
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full px-4">
              <MemberStatistic />
            </div>         
          </div>
        </>
      }

    { !superadmin && 
      <div>
        {companyStatus == "pending" && 
          <div className="relative p-2 bg-white">
            <div className="text-center pb-10 mt-10">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
                <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>
              </h3>
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                <p>Wait for your confirmation from Exepart registration expert</p>
              </h3>
              <h3 className="text-md font-semibold leading-normal mb-2 text-blue-700 mb-2">
                <i>Please re-login your session if Exepart registration expert is accepted your member status</i>
              </h3>
            </div>
          </div> 
        }

        {companyStatus == "accepted" &&
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-5/12 px-4">
            </div>
            <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
              <NewInquiriesMember/>
            </div>          
          </div>
        }

      </div>
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
