import { 
  VendorUrl,
  vendorsNavigation 
} from "./navigation";
import Link from "next/link";
import classNames from "@/utils/classNames";
import useCompany from '@/hooks/useCompany';
import { useSession } from "next-auth/react"

import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import LoadingState from "@/components/Interface/Loader/LoadingState";

import SellerDahsboardNavigation from "./Seller/Dashboard";
import ProductManagement from "./Seller/ProductManagement";
import IncomingInquiries from "./Seller/IncomingInquiries";

import BuyerDashboardNavigation from "./Buyer/Dashboard";
import InquiredProduct from "./Buyer/InquiredProduct"
import SearchProduct from "./Buyer/SearchProduct"

function SideNavigation(){
  const session = useSession();
  const status = session.data.user.userDetail.status_id
  const company = useCompany(session.data.user.userDetail, session.data.accessToken)

  return (
    <nav className="">
      {/* Dashboard  */}
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
                                <Link
                                  // as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                  )}
                                >
                                  {subItem.name}
                                </Link>
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
    </nav>
  )
}

export default SideNavigation;