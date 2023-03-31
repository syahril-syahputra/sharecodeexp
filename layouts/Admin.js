import React, {useEffect} from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { signOut } from "next-auth/react"

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { PageSEO } from "@/components/Utils/SEO";
import siteMetadata from '@/data/siteMetadata'

export default function Admin({ children }) {
  const {data, status} = useSession();
  const router = useRouter();

  if(status == 'unauthenticated'){
    // router.replace("/auth/login")
    console.log('please login')
    // return window.location.href = '/auth/login'
  }

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
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
