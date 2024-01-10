import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'

import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

export default function ComponentManagement({ product, excel }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR

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
              <Cog8ToothIcon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Product Management
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
                href="/admin/superadmin/product/pending"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Pending
                <PrimaryBadges title={product.pending} />
              </Link>
              <Link
                href="/admin/superadmin/product/approved"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Approved
                {/* <PrimaryBadges title={product.approved} /> */}
              </Link>
              <Link
                href="/admin/superadmin/product/rejected"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Rejected
                {/* <PrimaryBadges title={product.rejected} /> */}
              </Link>

              <Link
                href="/admin/superadmin/product/uploaded"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Uploaded Excel File{' '}
                <PrimaryBadges title={product.uploaded_excel_file} />
              </Link>
              <Link
                href={publicDir + '/template/exepart_template.xlsx'}
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Download Product Template
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  )
}
