import React, {useState} from 'react'
import LightButton from '@/components/Interface/Buttons/LightButton'
import {BaseModalLarge} from '@/components/Interface/Modal/BaseModal'
import Link from 'next/link'

export default function ModalPdf({...props}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [isLoading, setIsLoading] = props.isLoading

  return (
    <BaseModalLarge
      title={props?.title ?? "List of Document"}
      onClick={() => {
        props.setShowModal(false)
        setIsLoading(false)
      }}
      body={
        <>
          <div className="flex justify-between flex-wrap my-2">
            <div>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                File Name
              </p>
            </div>
            <div>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Action
              </p>
            </div>
          </div>
          {props?.receiptData?.map((value, index) => {
            return (
              <div key={index + '-' + `${value.name}`} className="flex justify-between ">
                <div>
                  <p className="mb-2 text-black dark:text-gray-500">
                    {value.file_name}
                  </p>
                </div>
                <div>
                  <Link
                    target="_blank"
                    href={publicDir + value.path}
                    className="underline text-blue-500"
                  >
                    view
                  </Link>
                </div>
              </div>
            )
          })}
        </>
      }
      action={
        <>
          <LightButton
            className="uppercase mr-2 font-bold"
            isLoading={props.isLoading}
            disabled={isLoading}
            onClick={() => {
              props.setShowModal(false)
              setIsLoading(false)
            }}
          >
            Close
          </LightButton>
        </>
      }
    />
  )
}
