import { useRouter } from "next/router"
import Link from "next/link";
import { useState } from "react";

export default function SettingsBar(props){
    const router = useRouter()
    const statusId = props.statusId
    return (
        <>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Settings
            </h6>
            {/* Navigation */}

            {statusId == 1 ? 
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/member/company/mycompany"
                  className={
                    "text-xs uppercase py-2 font-bold block " +
                    (router.pathname.indexOf("/admin/member/company/mycompany") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-building text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Company
                </Link>
              </li>
            </ul>
             : null} 

            {statusId == 1 && props.companyStatus == 'accepted' ? 
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/member/settings/users"
                  className={
                    "text-xs uppercase py-2 font-bold block " +
                    (router.pathname.indexOf("/admin/member/settings/users") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-users text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Contributors
                </Link> 
              </li>
            </ul>
            : null}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/member/settings/myaccount"
                  className={
                    "text-xs uppercase py-2 font-bold block " +
                    (router.pathname.indexOf("/admin/member/settings/myaccount") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-user text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Account
                </Link>
              </li>
            </ul>
        </>
    )
}