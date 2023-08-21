import Link from "next/link";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import GlobalContext from "@/store/global-context";

export default function BuyComponents(){
  const router = useRouter()
  const session = useSession()

  const {
    inquiryList, 
    updateInquiryList, 
    inquiredComponent, 
    updateInquiredComponent
  } = useContext(GlobalContext)

  useEffect(() => {
    updateInquiryList(session.data.accessToken)
    updateInquiredComponent(session.data.accessToken)
  }, [])

  return (
    <>
      {/* Divider */}
      <hr className="my-4 md:min-w-full" />
      {/* Heading */}
      <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        Buy Components
      </h6>
      {/* Navigation */}

      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/buycomponents/inquirylist"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/inquirylist") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-cart-shopping text-blueGray-400 mr-2 text-sm"></i>{" "}
              Inquiry List
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                {inquiryList}
              </span>
          </Link>

        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/buycomponents/inquiredcomponents"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/inquiredcomponents") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-truck text-blueGray-400 mr-1 text-sm"></i>{" "}
              Inquired Products 
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                {inquiredComponent}
              </span>
          </Link>
        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/buycomponents/completed-orders"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/completed-orders") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-handshake text-blueGray-400 mr-1 text-sm"></i>{" "}
              Complete Order
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                x
              </span> 
          </Link>
        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/buycomponents/rejected-orders"
            className={
              "text-xs uppercase py-2 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/rejected-orders") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-thumbs-down text-blueGray-400 mr-1 text-sm"></i>{" "}
              Reject Order 
              <span className="ml-1 text-xs font-semibold inline-block py-0.5 px-1 text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                1000
              </span>
          </Link>
        </li>
      </ul>

    </>
  )
}