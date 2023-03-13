import React, { useState, useEffect } from "react";
import axios from "lib/axios"
import { useSession } from "next-auth/react";
import Link from "next/link";

// components

// layout for page
import Admin from "layouts/Admin.js";

export default function MyCompany() {
  const session = useSession()
  const [userDetail, setUserDetail] = useState()
  const [token, setToken] = useState({
    accessToken: ''
  })

  const [companyStatus, setCompanyStatus] = useState()
  useEffect(() => { 
    setToken({accessToken: session.data?.accessToken})
    setUserDetail(session.data?.user.userDetail) 
    setCompanyStatus(session.data?.user.isCompanyConfirmed) 
  }, [session])

  return (
    <>
      <div className="relative">
        <div className="mb-0 px-4 py-3 border-0 bg-white">
            <div className="flex justify-between">
                <div className="px-4">
                    <h3
                    className={
                        "font-semibold text-lg text-blueGray-700"
                    }
                    >
                    My Company
                    </h3>
                </div>
                <div className="px-4 my-2">
                    <Link href="/admin/settings/masteraccount/add" className="relative bg-orange-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                    Update Company</Link>
                </div>
            </div>
            <div className="p-10">
            {companyStatus == "true" ? 
              <h2 className="text-md text-blueGray-700 font-bold">Member Approved <i className="mr-2 ml-1 fas fa-check text-blue-700"></i></h2>
            : <h2 className="text-md text-blueGray-700 font-bold"><i className="mr-2 ml-1 fas fa-clock text-orange-500"></i></h2> }

              <h3 className="text-md text-blueGray-700">{userDetail?.name}</h3>
              <h3 className="text-md text-blueGray-700">{userDetail?.email}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

MyCompany.layout = Admin;
