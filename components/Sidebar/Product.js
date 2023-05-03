import React, {useState, useEffect} from "react";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "@/lib/axios";

export default function ProductBar(){
  const router = useRouter()

  const session = useSession()
  const [user, setUser] = useState({
    accessToken: ''
  })
  useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [totalItem, setTotalItem] = useState(0)
  const countCart = async (srch, page=1) =>{
    if(!!user.accessToken){
      setIsLoading(true)
      const response = await axios.get(`/countcart`,
          {
            headers: {
              "Authorization" : `Bearer ${user.accessToken}`
            }
          }
        )
        .then((response) => {
          let result = response.data
          setTotalItem(result.data)
        }).catch((error) => {
          // console.log(error.response)
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }
  useEffect(() => {
    countCart()
  }, [user])

  return (
    <>
        {/* Divider */}
        <hr className="my-4 md:min-w-full" />
        {/* Heading */}
        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Sell Products
        </h6>
        {/* Navigation */}

        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          <li className="items-center">
            <Link href="/admin/product/myproduct"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/myproduct") !== -1
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
            <Link href="/admin/product/incominginquiry"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/incominginquiry") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }>
                <i className="fas fa-box text-blueGray-400 mr-2 text-sm"></i>{" "}
                Incoming Inquiry 
            </Link>
          </li>
        </ul>
        {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          <li className="items-center">
            <Link href="/admin/product/mycart"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/mycart") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }>
                <i className="fas fa-cart-shopping text-blueGray-400 mr-2 text-sm"></i>{" "}
                My Cart
                <span className="ml-5 text-xs font-semibold inline-block py-1 px-2 uppercase text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                  {totalItem}
                </span>
            </Link>

          </li>
        </ul>
        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          <li className="items-center">
            <Link href="/admin/product/myorder"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/myorder") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }>
                <i className="fas fa-truck text-blueGray-400 mr-2 text-sm"></i>{" "}
                My Order 
            </Link>
          </li>
        </ul> */}


        {/* Divider */}
        <hr className="my-4 md:min-w-full" />
        {/* Heading */}
        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Buy Products
        </h6>
        {/* Navigation */}

        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          <li className="items-center">
            <Link href="/admin/product/mycart"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/mycart") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }>
                <i className="fas fa-cart-shopping text-blueGray-400 mr-2 text-sm"></i>{" "}
                Inquire Now
                <span className="ml-5 text-xs font-semibold inline-block py-1 px-2 uppercase text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                  {totalItem}
                </span>
            </Link>

          </li>
        </ul>
        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
          <li className="items-center">
            <Link href="/admin/product/myorder"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/admin/product/myorder") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }>
                <i className="fas fa-truck text-blueGray-400 mr-2 text-sm"></i>{" "}
                Inquiry List 
            </Link>
          </li>
        </ul>

    </>
  )
}