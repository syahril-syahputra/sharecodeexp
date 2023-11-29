import Link from 'next/link'
import { useSession } from 'next-auth/react'
import FooterAdmin from '@/components/Footers/FooterAdmin'
import { PageSEO } from '@/components/Utils/SEO'
import siteMetadata from '@/utils/siteMetadata'
import React, { useState } from 'react'
import TopNavigation from './TopNavigation'
import ImageLogo from '@/components/ImageLogo/ImageLogo'
import SuperadminNav from './Superadmin/SideNavigation'
import MemberNav from './Member/SideNavigation'
import SmallSideSuperadminNav from './Superadmin/SmallSideNavigation'
import SmallSideMemberNav from './Member/SmallSideNavigation'
import MyAccount from './MyAccount'
import HelpNavigation from './help'
import AdminHelpNavigation from './AdminHelp'

export default function Admin({ children }) {
  const session = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!session.data) {
    return (
      <div className="relative p-2 bg-white">
        <div className="text-center pb-10 mt-20">
          <div className="mt-10 mb-10">
            <ImageLogo size={200} />
          </div>
          <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
            <p>unauthenticated</p>
          </h3>
          <h3 className="text-md font-semibold leading-normal text-blue-700 mb-2">
            <i>
              Please{' '}
              <Link href="/auth/login" className="text-blueGray-700 underline">
                login
              </Link>{' '}
              before accesing this URL
            </i>
          </h3>
        </div>
      </div>
    )
  }
  const role = session.data.user.userDetail.role_id

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div>
        {role == 1 && (
          <SmallSideSuperadminNav
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {role == 2 && (
          <SmallSideMemberNav
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col shadow-xl">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <Link href="/" className="flex h-16 shrink-0 items-center mt-4">
              <ImageLogo size={200} />
            </Link>

            {role == 1 && <SuperadminNav session={session} />}

            {role == 2 && <MemberNav></MemberNav>}

            {/* Divider */}
            <hr className="md:min-w-full" />
            <nav className="flex flex-1 flex-col mb-20">
              <MyAccount />
            </nav>
           { role == 2 &&  <nav className="flex flex-1 flex-col justify-end">
              <HelpNavigation />
            </nav>}
            { role == 1 &&  <nav className="flex flex-1 flex-col justify-end">
              <AdminHelpNavigation />
            </nav>}
          </div>
        </div>

        <div className="lg:pl-72">
          <TopNavigation setSidebarOpen={setSidebarOpen} role={role} />
          <div className="bg-zinc-100">
            <div className="px-4 pt-6 md:px-10 mx-auto h-full">{children}</div>
            <FooterAdmin />
          </div>
        </div>
      </div>
    </>
  )
}
