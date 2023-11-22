import { MyAccountUrl, VendorUrl } from '@/route/route-url'
import { Fragment, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import GlobalContext from '@/store/global-context'
import React, { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LogoutModal from '@/components/Modal/Logout/Logout'

const userNavigation = [{ name: 'My Profile', href: MyAccountUrl.view }]

function TopNavigation({ setSidebarOpen, role }) {
  const session = useSession()
  const { username, loadUsername } = useContext(GlobalContext)
  const [logoutModal, setLogoutModal] = useState(false)

  const route = useRouter()
  const switchToBuyer = async () => {
    await session.update({
      dashboardStatus: 'buyer',
    })
    route.push('/admin/member/buyer/dashboard')
  }
  const switchToSeller = async () => {
    await session.update({
      dashboardStatus: 'seller',
    })
    route.push('/admin/member/seller/dashboard')
  }

  useEffect(() => {
    loadUsername(session.data.accessToken)
  }, [])

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1">
            <div className="pt-5 text-gray-400">{role == 1 && 'ADMIN'}</div>
            {/* <div className="pt-5 text-gray-400">{role == 3 && 'SUPERADMIN'}</div> */}
            <div className="pt-5 text-gray-400">
              {role == 2 &&
                session.data.user.dashboardStatus == 'buyer' &&
                'BUYER AREA'}
            </div>
            <div className="pt-5 text-gray-400">
              {role == 2 &&
                session.data.user.dashboardStatus == 'seller' &&
                'SELLER AREA'}
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Separator */}
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    {username}
                  </span>
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-52 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  {session.data.user.dashboardStatus === 'seller' &&
                    !session.data.user.userDetail.company
                      .buying_restriction && (
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => switchToBuyer(true)}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Switch to Buyer
                          </span>
                        )}
                      </Menu.Item>
                    )}
                  {session.data.user.dashboardStatus === 'buyer' &&
                    !session.data.user.userDetail.company
                      .selling_restriction && (
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => switchToSeller(true)}
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Switch to Seller
                          </span>
                        )}
                      </Menu.Item>
                    )}
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        onClick={() => setLogoutModal(true)}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Sign out
                      </span>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {logoutModal && (
        <LogoutModal
          closeModal={() => setLogoutModal(false)}
          acceptance={() => {
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }}
        />
      )}
    </>
  )
}

export default TopNavigation
