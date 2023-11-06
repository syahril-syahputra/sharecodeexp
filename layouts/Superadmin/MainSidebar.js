import React from 'react'
import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import GlobalContext from '@/store/global-context'
import Registry from '@/layouts/Superadmin/Registry'
import ProductManagement from '@/layouts/Superadmin/ProductManagement'
import Order from '@/layouts/Superadmin/Order'

export default function MainSidebar() {
  const session = useSession()
  const { data } = session
  const { adminSidebarCounter, loadAdminSidebarCounter } =
    useContext(GlobalContext)
  useEffect(() => {
    loadAdminSidebarCounter(session.data.accessToken)
  }, [session])

  const sideBarOption = () => {
    switch (data.user?.userDetail.status_id) {
      case '1':
      case 1:
        return (
          <>
            <Registry registry={adminSidebarCounter.registry} />
            <ProductManagement product={adminSidebarCounter.product} />
            <Order order={adminSidebarCounter.order} />
          </>
        )
      case '2':
        return
      case '3':
        return <Registry registry={adminSidebarCounter.registry} />
      case '4':
        return <ProductManagement product={adminSidebarCounter.product} />
      case '5':
        return <Order order={adminSidebarCounter.order} />
      case '6':
        return
    }
  }

  return (
    <>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {sideBarOption()}
          </ul>
        </li>
      </ul>
      {/* Divider */}
      <hr className="md:min-w-full my-5" />
    </>
  )
}
