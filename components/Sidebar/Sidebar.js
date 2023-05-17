import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import ImageLogo from "@/components/ImageLogo/ImageLogo";

import SettingsBar from "./Settings";

//superadmin
import Registry from "./Superadmin/Registry";
import Orders from "./Superadmin/Orders";
import Statistics from "./Superadmin/Statistics";
import Components from "./Superadmin/Components";
import MasterControl from "./Superadmin/MasterControl"

//member
import MemberSellComponents from "./Member/SellComponents";
import MemberBuyComponents from "./Member/BuyComponents";


export default function Sidebar(props) {
  const session = useSession()
  const [userDetail, setUserDetail] = useState()
  useEffect(() => { 
    setUserDetail(session.data?.user.userDetail) 
  }, [session])

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter()

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/"
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              <ImageLogo size={150}/>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      EXEpart
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Dashboard
                </Link>
              </li>
            </ul>
            {(!props.company?.is_confirmed && userDetail?.role_id == 2)&& 
              <div>
                <div className='text-center my-auto mt-10 mb-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>
            }
            {props.company?.is_confirmed == "accepted" && userDetail?.role_id == 2? 
              <>
                <MemberSellComponents/>
                <MemberBuyComponents/>
              </>
              : null }

            {userDetail?.role_id == 2 &&
              <SettingsBar
                companyStatus={props.company?.is_confirmed}
                statusId={userDetail?.status_id}
              />
            }

            {userDetail?.role_id == 1 ? 
              <>
                <Registry/>
                <Components/>
                <Orders/>
                <Statistics/>
                <MasterControl/>
              </>
            : null }            

          </div>
        </div>
      </nav>
    </>
  );
}
