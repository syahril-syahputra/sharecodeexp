import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import PageHeader from "@/components/Interface/Page/PageHeader";
import WarningButton from "@/components/Interface/Buttons/WarningButton";

// components

export default function Account({session}) {
  const [userDetail, setUserDetail] = useState(session.user.userDetail)

  return(
    <PrimaryWrapper>
      <PageHeader
          leftTop={
              <h3 className="font-semibold text-lg text-blueGray-700">
                  My Account
              </h3>
          }
          rightTop={
              <Link href={`/admin/member/settings/myaccount/update`}>
                  <WarningButton size="sm">
                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                    Update Account
                  </WarningButton>
              </Link>
          }
      ></PageHeader>

      <div className="p-5">
        {userDetail?.status_id == 1 ? 
          <h2 className="text-md text-blueGray-700 font-bold">Vendor Account</h2>
        : <h2 className="text-md text-blueGray-700 font-bold">User Account</h2> }


          <h3 className="text-md text-blueGray-700">{userDetail?.name}</h3>
          <h3 className="text-md text-blueGray-700">{userDetail?.email}</h3>
      </div>
    </PrimaryWrapper>
  )

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
                    My Account
                    </h3>
                </div>
                <div className="px-4 my-2">
                {userDetail?.status_id == 1 ? 
                    <Link href="/admin/settings/masteraccount/add" className="relative bg-orange-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                    Update Master</Link>
                : null }

                {userDetail?.status_id == 2 ? 
                    <Link href="/admin/settings/masteraccount/add" className="relative bg-orange-500 p-2 text-white">
                      <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                    Update User</Link>
                : null }
                </div>
            </div>
            <div className="p-10">
            {userDetail?.status_id == 1 ? 
              <h2 className="text-md text-blueGray-700 font-bold">Master Account</h2>
            : <h2 className="text-md text-blueGray-700 font-bold">User Account</h2> }


              <h3 className="text-md text-blueGray-700">{userDetail?.name}</h3>
              <h3 className="text-md text-blueGray-700">{userDetail?.email}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

Account.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
      props: {
          session
      }
  }
}

