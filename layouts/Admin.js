import React from "react";
import { useSession } from "next-auth/react"
import Link from "next/link";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { PageSEO } from "@/components/Utils/SEO";
import siteMetadata from '@/utils/siteMetadata'

//hooks
import useCompany from '@/hooks/useCompany'
import ImageLogo from "@/components/ImageLogo/ImageLogo";

export default function Admin({ children }) {
  const session = useSession();
  if (!session.data) {
    return (
      <div className="relative p-2 bg-white">
        <div className="text-center pb-10 mt-20">
          <div className="mt-10 mb-10">
            <ImageLogo size={200}/>
          </div>
          <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
            <p>unauthenticated</p>
          </h3>
          <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
            <i>Please <Link href="/auth/login" className="text-blueGray-700 underline">login</Link> before accesing this URL</i>
          </h3>
        </div>
      </div> 
    );
  }
  const company = useCompany(session.data.user.userDetail, session.data.accessToken)
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Sidebar company={company}/>
      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24 h-full">
          {children}
          <FooterAdmin /> 
        </div>
      </div>
    </>
  );
}
