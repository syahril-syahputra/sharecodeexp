import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'

import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

export default function IncomingInquiries({ order }) {
  return (
    <li>
      <Disclosure as="div" defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                false ? 'bg-gray-50' : 'hover:bg-gray-50',
                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
              )}
            >
              <BuildingStorefrontIcon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Inquiries
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
                // as="a"
                href="/admin/member/seller/incoming-inquiry"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Active
                <PrimaryBadges title={order?.active || 0} />
              </Link>
              <Link
                // as="a"
                href="/admin/member/seller/incoming-inquiry/inquiry-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Inquiries Rejected
                {/* <PrimaryBadges title={order.inquiries_rejected} /> */}
              </Link>
              <Link
                // as="a"
                href="/admin/member/seller/incoming-inquiry/quotation-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Quotations Rejected
                {/* <PrimaryBadges title={order.quotation_rejected} /> */}
              </Link>
              {/* <Link
                // as="a"
                href="/admin/member/seller/incoming-inquiry/bad-test-result"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Bad Test Result
                <PrimaryBadges title={order.bad_result} />
              </Link> */}
              {/* <Link
                // as="a"
                href="/admin/member/seller/incoming-inquiry/order-completed"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Complete Orders
                <PrimaryBadges title={order.complete} />
              </Link> */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  )
}
