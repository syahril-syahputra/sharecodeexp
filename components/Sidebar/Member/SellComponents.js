import React, {useEffect, useContext} from "react";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";
import Link from "next/link";
import GlobalContext from "@/store/global-context";

export default function SellComponents(){
  const router = useRouter()
  const session = useSession()
  const {incomingInquiry, updateIncomingInquiry} = useContext(GlobalContext)
  useEffect(() => {
    updateIncomingInquiry(session.data.accessToken)
  }, [])

  return (
    <>
      {/* Divider */}
      <hr className="my-4 md:min-w-full" />
      {/* Heading */}
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Sell Components
      </h6>
      {/* Navigation */}

      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/sellcomponents/component"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/sellcomponents/component") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-shop text-blueGray-400 mr-2 text-sm"></i>{" "}
              My Stocks 
          </Link>
        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/sellcomponents/incominginquiry"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/sellcomponents/incominginquiry") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-box text-blueGray-400 mr-2 text-sm"></i>{" "}
              Incoming Inquiry 
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                {incomingInquiry}
              </span>
          </Link>
        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/sellcomponents/completed-orders"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/sellcomponents/completed-orders") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-handshake text-blueGray-400 mr-2 text-sm"></i>{" "}
              Complete Order
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                x
              </span>
          </Link>
        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/sellcomponents/rejected-orders"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/sellcomponents/rejected-orders") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-thumbs-down text-blueGray-400 mr-2 text-sm"></i>{" "}
              Rejected Order
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                x
              </span>
          </Link>
        </li>
      </ul>
    </>
  )
}