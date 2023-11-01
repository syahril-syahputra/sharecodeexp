import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

export default function IncomingInquiries({ order }) {
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
                href="/admin/member/buyer/inquired-product"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Active
                <PrimaryBadges title={order.active} />
              </Link>
              <Link
                // as="a"
                href="/admin/member/buyer/inquired-product/inquiry-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Inquiries Rejected
                <PrimaryBadges title={order.inquiries_rejected} />
              </Link>
              <Link
                // as="a"
                href="/admin/member/buyer/inquired-product/quotation-rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Quotations Rejected
                <PrimaryBadges title={order.quotation_rejected} />
              </Link>
              <Link
                // as="a"
                href="/admin/member/buyer/inquired-product/order-completed"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Complete Orders
                <PrimaryBadges title={order.complete} />
              </Link>

              {/* This link comment due to change request on cart task 
              https://venatronics-dev.atlassian.net/jira/software/projects/EX/boards/2?assignee=712020%3A7e9286ec-874a-4a10-826a-81ccef33c4c3&selectedIssue=EX-145
              */}
              {/* <Link
                href="/admin/member/buyer/inquired-product/product-not-arrived"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Didn't Receive Any
                <PrimaryBadges title={order.not_arrived} />
              </Link> */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  )
}
