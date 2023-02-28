import React from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  const {data, status} = useSession();
  const router = useRouter();

  if(status == 'unauthenticated'){
    router.replace("/auth/login")
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );

  
  
}
