import React from 'react'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import { VendorUrl } from '@/route/route-url'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { BanknotesIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import PrimaryBadges from '@/components/Interface/Badges/PrimaryBadges'

function MemberHelpNavigation() {
  return (
    <>
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                false ? 'bg-gray-50' : 'hover:bg-gray-50',
                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
              )}
            >
              <ChatBubbleLeftEllipsisIcon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Help
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
                href={VendorUrl.help.helpRequest}
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Help Request
              </Link>
              <Link
                href={VendorUrl.help.demoAndguideline}
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                Demo and Guideline
              </Link>
              <Link
                href={VendorUrl.help.faq}
                className={classNames(
                  false ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 flex justify-between'
                )}
              >
                FAQ
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
    // <ul role="list" className="flex flex-col">
    //   <li>
    //     <ul role="list" className="-mx-2 space-y-1">
    //       <Link
    //         href={VendorUrl.help}
    //         className={classNames(
    //           false ? 'bg-gray-50' : 'hover:bg-gray-50',
    //           'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
    //         )}
    //       >
    //         <ChatBubbleLeftEllipsisIcon
    //           className="h-6 w-6 shrink-0 text-gray-400"
    //           aria-hidden="true"
    //         />
    //         Help Request
    //       </Link>
    //     </ul>
    //   </li>
    // </ul>
  )
}

export default MemberHelpNavigation
