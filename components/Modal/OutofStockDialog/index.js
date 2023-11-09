import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import axios from 'lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

export default function OutofStockDialog({ session, ...props }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = props.isLoading

  const handleOutofStock = async () => {
    await axios
      .post(
        `/seller/product/set-out-of-stock/${props?.item}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response?.data?.message}`, toastOptions)
        props.setShowModal(false)
        setIsLoading(true)
        props.callback()
      })
      .catch((error) => {
        toast.error(`${error?.data?.message}`, toastOptions)
        props.setShowModal(false)
        setIsLoading(false)
      })
  }

  return (
    <BaseModalMedium
      title="Action Required"
      onClick={() => {
        props.setShowModal(false)
        setIsLoading(false)
      }}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          Do you want to make this product quantity and moq{' '}
          <span className="text-blueGray-700 font-bold">out of stock</span>?
        </p>
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
            No, Close
          </LightButton>

          <PrimaryButton
            className="uppercase font-bold"
            isLoading={props.isLoading}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true)
              handleOutofStock()
            }}
          >
            {isLoading ? (
              <i className="px-3 fas fa-hourglass fa-spin"></i>
            ) : (
              ' Yes, Out of Stock'
            )}
          </PrimaryButton>
        </>
      }
    />
  )
}
