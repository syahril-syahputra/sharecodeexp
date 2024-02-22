import { MyAccountUrl } from '@/route/route-url'
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { Fragment, useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import GlobalContext from '@/store/global-context'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LogoutModal from '@/components/Modal/Logout/Logout'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import axios from 'lib/axios'
import DarkButton from '@/components/Interface/Buttons/DarkButton'

const userNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'My Profile', href: MyAccountUrl.view },
]

const userEmailUnverifyNavigation = [
  {
    name: 'Verify Email',
    href: '/verify/email',
  },
]

const subNavigation = (navigationArr) => {
  return navigationArr.map((item) => (
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
  ))
}

const multipleNotificationWithSessions = (s) => {
  switch (true) {
    case s === null:
      return subNavigation(userEmailUnverifyNavigation)
    default:
      return subNavigation(userNavigation)
  }
}

export default function LandingPageLoginButton(navBarV2 = false) {
  const session = useSession()
  const router = useRouter()
  const { username, loadUsername } = useContext(GlobalContext)
  const [logoutModal, setLogoutModal] = useState(false)
  const [data, setData] = useState()

  async function fetchUser(accessToken) {
    try {
      const data = await axios.get(`/my-account`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setData(data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (session.data) {
      loadUsername(session.data.accessToken)
      fetchUser(session?.data?.accessToken)
    }
  }, [session])

  if (!session.data) {
    return (
      <div className="space-x-4">
        <a
          className="cursor-pointer hover:text-gray-500"
          onClick={() => {
            signIn()
          }}
        >
          Sign in
        </a>
        <Link href="/auth/register">
          <DarkButton>Sign Up</DarkButton>
        </Link>
      </div>
    )
  }

  if (session.data) {
    return (
      <div>
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <span className="hidden lg:flex lg:items-center">
              <span
                className="ml-4 text-sm leading-6 text-gray-900"
                aria-hidden="true"
              >
                {username === '...' ? `Hi, ${session.data.user.name}` : ''}
                {username !== '...' ? `Hi, ${username}` : ''}
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
              {multipleNotificationWithSessions(
                data?.data?.data?.email_verified_at
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
      </div>
    )
  }
}
