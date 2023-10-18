import Link from 'next/link'
import classNames from '@/utils/classNames'

import { BuildingOffice2Icon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

export default function Registry({ registry }) {
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
              <BuildingOffice2Icon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Registry
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
                href="/admin/superadmin/registry/pendingcompany"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Pending
                <PrimaryBadges title={registry.pending} />
              </Link>
              <Link
                href="/admin/superadmin/registry/uploadedcompany"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Uploaded
                <PrimaryBadges title={registry.uploaded_additional_documents} />
              </Link>
              <Link
                href="/admin/superadmin/registry/approvedcompany"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Approved
                <PrimaryBadges title={registry.approved} />
              </Link>
              <Link
                href="/admin/superadmin/registry/rejectedcompany"
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Rejected
                <PrimaryBadges title={registry.rejected} />
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </li>
  )
}
