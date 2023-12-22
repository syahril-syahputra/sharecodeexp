import React, {useState} from 'react'
import {useRouter} from 'next/router'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import {BaseModalMedium} from '@/components/Interface/Modal/BaseModal'
import axios from 'lib/axios'
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import Link from 'next/link'

export default function ModalPdf({session, ...props}) {
  const router = useRouter()
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [isLoading, setIsLoading] = props.isLoading
  const [isError, setIsError] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [showModalOutOfStockProps, setShowModalOutOfStockProps] = props.setShowModal



  return (
    <BaseModalMedium
      title="List of Document"
      onClick={() => {
        setShowModalOutOfStockProps(false)
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
          {props?.buyerSellerReceiptData?.map((value, index) => {
            return (
              <div key={index + '-' + `${value.name}`} className="flex justify-between">
                <div>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
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
          <PrimaryButton
            className="uppercase mr-2 font-bold"
            isLoading={props.isLoading}
            disabled={isLoading}
            onClick={() => {
              setShowModalOutOfStockProps(false)
              setIsLoading(false)
            }}
          >
            Close
          </PrimaryButton>
        </>
      }
    />
  )
}
