import Link from "next/link";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";

export default function BuyComponents(){
  const router = useRouter()
  const session = useSession()

  const [totalItem, setTotalItem] = useState(0)
  const countCart = async () =>{
    const response = await axios.get(`/countWish`,
      {
        headers: {
          "Authorization" : `Bearer ${session.data.accessToken}`
        }
      })
      .then((response) => {
        let result = response.data
        setTotalItem(result.data)
      }).catch((error) => {
        // console.log(error.response)
      }).finally(() => {
        // setIsLoading(false)
      })
  }
  useEffect(() => {
    countCart()
  }, [])

  const [totalInquiredItem, setTotalInquiredItem] = useState(0)
  const countInquiredList = async () =>{
    const response = await axios.get(`/buyer/order/count`,
      {
        headers: {
          "Authorization" : `Bearer ${session.data.accessToken}`
        }
      })
      .then((response) => {
        let result = response.data
        setTotalInquiredItem(result.data)
      }).catch((error) => {
        // console.log(error.response)
      }).finally(() => {
        // setIsLoading(false)
      })
  }
  useEffect(() => {
    countInquiredList()
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
          <Link href="/admin/member/buycomponents/inquirynow"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/inquirynow") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-cart-shopping text-blueGray-400 mr-2 text-sm"></i>{" "}
              Inquiry List
              <span className="ml-1 text-xs font-semibold inline-block py-1 px-2 uppercase text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                {totalItem}
              </span>
          </Link>

        </li>
      </ul>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link href="/admin/member/buycomponents/inquirylist"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("/admin/member/buycomponents/inquirylist") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }>
              <i className="fas fa-truck text-blueGray-400 mr-1 text-sm"></i>{" "}
              Inquired Components 
              <span className="ml-1 text-xs font-semibold inline-block py-1 px-2 uppercase text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                {totalInquiredItem}
              </span>
          </Link>
        </li>
      </ul>

    </>
  )
}