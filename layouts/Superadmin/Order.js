import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

export default function Order({ order }) {
  return (
    <li>
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                false ? 'bg-gray-50' : 'hover:bg-gray-50',
                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
              )}
            >
              <ShoppingCartIcon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Orders
              <ChevronRightIcon
                className={classNames(
                  open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                  'ml-auto h-5 w-5 shrink-0'
                )}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel as="ul" className="mt-1 px-2">
              <Link
                href="/admin/superadmin/orders/allorders"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Active Orders
                <PrimaryBadges title={order.active} />
              </Link>
              <Link
                href="/admin/superadmin/orders/inquiry-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Inquiries Rejected
                <PrimaryBadges title={order.inquiries_rejected} />
              </Link>
              <Link
                href="/admin/superadmin/orders/quotation-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Quotation Rejected
                <PrimaryBadges title={order.quotation_rejected} />
              </Link>
              <Link
                href="/admin/superadmin/orders/order-completed"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Complete Orders
                <PrimaryBadges title={order.complete} />
              </Link>
              <Link
                href="/admin/superadmin/orders/product-not-arrived"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Product not Arrived
                <PrimaryBadges title={order.not_arrived} />
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  )
}
