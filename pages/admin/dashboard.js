import React from "react";

// superadmin
import SuperadminDashboard from "@/components/Dashboard/Superadmin/PendingCompany"
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic";

// member


// layout for page
import Admin from "layouts/Admin.js";

export default function Dashboard() {
  let superadmin = true
  if(superadmin == true) {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <SuperadminDashboard/>
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
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
