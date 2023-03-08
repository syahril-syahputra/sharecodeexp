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
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/settings/masteraccount"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/settings/masteraccount") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-user text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Master Account
                </Link> 
              </li>
            </ul>
            : null}

            {statusId == 1 ? 
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/settings/mycompany"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/settings/mycompany") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }>
                    <i className="fas fa-user text-blueGray-400 mr-2 text-sm"></i>{" "}
                    My Company
                </Link>
              </li>
            </ul>
            : null}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/admin/settings/account"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/admin/settings/account") !== -1
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