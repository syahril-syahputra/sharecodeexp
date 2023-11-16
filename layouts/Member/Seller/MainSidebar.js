import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import GlobalContext from '@/store/global-context'
import ProductManagement from './ProductManagement'
import IncomingInquiries from './IncomingInquiries'
import Reimbursement from './Reimbursement'

export default function MainSidebar() {
  const session = useSession()

  const { sellerSidebarCounter, loadSellerSidebarCounter } =
    useContext(GlobalContext)
  useEffect(() => {
    loadSellerSidebarCounter(session.data.accessToken)
  }, [session])

  return (
    <>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <ProductManagement
              product={sellerSidebarCounter.product}
              excel={sellerSidebarCounter.excel_file}
            />
            <IncomingInquiries order={sellerSidebarCounter.order} />
            <Reimbursement reimbursement={sellerSidebarCounter?.order} />
          </ul>
        </li>
      </ul>
      {/* Divider */}
      <hr className="md:min-w-full my-5" />
    </>
  )
}
