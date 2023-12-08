import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import {VendorUrl} from '@/route/route-url'
import {ChatBubbleLeftEllipsisIcon} from '@heroicons/react/24/outline'

function MemberHelpNavigation() {
  return (
    <ul role="list" className="flex flex-col">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          <Link
            href={VendorUrl.help}
            className={classNames(
              false ? 'bg-gray-50' : 'hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
            )}
          >
            <ChatBubbleLeftEllipsisIcon
              className="h-6 w-6 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Help Request
          </Link>
        </ul>
      </li>
    </ul>
  )
}

export default MemberHelpNavigation
