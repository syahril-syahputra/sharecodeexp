import React from 'react'
import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import GlobalContext from '@/store/global-context'

import InquiredProduct from './InquiredProduct'
import SearchProduct from './SearchProduct'
import Reimbursment from './Reimbursement'

export default function MainSidebar() {
  const session = useSession()

  const { buyerSidebarCounter, loadBuyerSidebarCounter } =
    useContext(GlobalContext)
  useEffect(() => {
    loadBuyerSidebarCounter(session.data.accessToken)
  }, [session])

  return (
    <>
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <SearchProduct />
            <InquiredProduct order={buyerSidebarCounter.order} />
            <Reimbursment reimbursement={buyerSidebarCounter?.order} />
          </ul>
        </li>
      </ul>
      {/* Divider */}
      <hr className="md:min-w-full my-5" />
    </>
  )
}
