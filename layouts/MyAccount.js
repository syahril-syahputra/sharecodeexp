import React from 'react'
import navigation from './navigation'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

function MyAccount() {
  return (
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {!item.children ? (
                <Link
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                  )}
                >
                  <item.icon
                    className="h-6 w-6 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ) : (
                <Disclosure as="div" defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                          'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                            'ml-auto h-5 w-5 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel as="ul" className="mt-1 px-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            {/* 44px */}
                            <Disclosure.Button
                              as="a"
                              href={subItem.href}
                              className={classNames(
                                subItem.current
                                  ? 'bg-gray-50'
                                  : 'hover:bg-gray-50',
                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                              )}
                            >
                              {subItem.name}
                            </Disclosure.Button>
                          </li>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  )
}

export default MyAccount
