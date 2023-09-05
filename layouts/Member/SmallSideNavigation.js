import { VendorUrl, vendorsNavigation } from "./navigation";

import { Fragment } from "react";
import Link from "next/link";
import classNames from "@/utils/classNames";
import useCompany from '@/hooks/useCompany';
import { useSession } from "next-auth/react"

import LoadingState from "@/components/Interface/Loader/LoadingState";
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import ImageLogo from "@/components/ImageLogo/ImageLogo";
import MyAccount from "../MyAccount";

import SellerDahsboardNavigation from "./Seller/Dashboard";
import ProductManagement from "./Seller/ProductManagement";
import IncomingInquiries from "./Seller/IncomingInquiries";

import BuyerDashboardNavigation from "./Buyer/Dashboard";
import InquiredProduct from "./Buyer/InquiredProduct"
import SearchProduct from "./Buyer/SearchProduct"

function SmallSideNavigation({sidebarOpen, setSidebarOpen}){
  const session = useSession();
  const status = session.data.user.userDetail.status_id
  const company = useCompany(session.data.user.userDetail, session.data.accessToken)

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <div className="flex h-16 shrink-0 items-center">
                  <Link href="/" className="flex h-16 shrink-0 items-center mt-4">
                    <ImageLogo size={200}/>
                  </Link>
                </div>
                <nav className="">
                  {/* Dashboard */}
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {!session.data.user.dashboardStatus && 
                          <Link
                              href={VendorUrl.dahsboard}
                              className={classNames(
                              false ? 'bg-gray-50' : 'hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                              )}
                          >
                              <HomeIcon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                              Dashboard
                          </Link>
                        }
                        {session.data.user.dashboardStatus == 'buyer' && 
                          <BuyerDashboardNavigation/>
                        }

                        {session.data.user.dashboardStatus == 'seller' && 
                          <SellerDahsboardNavigation/>
                        }
                      </ul>
                    </li>
                  </ul>
                  {/* Divider */}
                  <hr className="md:min-w-full my-5" />

                  {/* protectedNavigation */}
                  {!company?.is_confirmed && 
                    <>
                      <LoadingState/>
                      {/* Divider */}
                      <hr className="md:min-w-full my-5" />
                    </>
                  }

                  {(company?.is_confirmed === 'accepted' && session.data.user.dashboardStatus == 'buyer') ? 
                    <>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <SearchProduct/>
                            <InquiredProduct/>
                          </ul>
                        </li>
                      </ul>
                      {/* Divider */}
                      <hr className="md:min-w-full my-5" />
                    </>
                    :
                    null
                  }

                  {(company?.is_confirmed === 'accepted' && session.data.user.dashboardStatus == 'seller') ? 
                    <>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <ProductManagement/>
                            <IncomingInquiries/>
                          </ul>
                        </li>
                      </ul>
                      {/* Divider */}
                      <hr className="md:min-w-full my-5" />
                    </>
                    :
                    null
                  }

                  {/* vendorsNavigation */}
                  {status == 1 && 
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {vendorsNavigation.map((item) => (
                            <li key={item.name}>
                              {!item.children ? (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              ) : (
                                <Disclosure as="div">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        className={classNames(
                                          item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                          'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                        )}
                                      >
                                        <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                        {item.name}
                                        <ChevronRightIcon
                                          className={classNames(
                                            open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                            'ml-auto h-5 w-5 shrink-0'
                                          )}
                                          aria-hidden="true"
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel as="ul" className="mt-1 px-2">
                                        {item.children.map((subItem) => (
                                          <li key={subItem.name}>
                                            {/* 44px */}
                                            <Disclosure.Button
                                              as="a"
                                              href={subItem.href}
                                              className={classNames(
                                                subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                              )}
                                            >
                                              {subItem.name}
                                            </Disclosure.Button>
                                          </li>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  }
                  {/* Divider */}
                  <hr className="md:min-w-full my-5" />

                  {/* MyAccount */}
                  <MyAccount/>

                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>  
  )
}

export default SmallSideNavigation;