import React from "react";

// superadmin
import PendingCompany from "@/components/Dashboard/Superadmin/PendingCompany"
import NewInquiries from "@/components/Dashboard/Superadmin/NewInquiries";
import StatusUpdateOngoingOrder from "@/components/Dashboard/Superadmin/StatusUpdateOngoingOrder";
import PendingShipment from "@/components/Dashboard/Superadmin/PendingShipment";
import PendingPayment from "@/components/Dashboard/Superadmin/PendingPayment";
import MemberStatistic from "@/components/Dashboard/Superadmin/MemberStatistic";

// member


// layout for page
import Admin from "layouts/Admin.js";

export default function Dashboard() {
  let superadmin = true
  if(superadmin == true) {
    return (
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
    );
  }

  if(superadmin == false) {
    return (
      <>
        <h2>Welcome</h2>
      </>
    );
  }
}
  

Dashboard.layout = Admin;
