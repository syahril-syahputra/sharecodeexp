import React, { useState } from 'react'
import { useRouter } from 'next/router'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import Link from 'next/link'

export default function NeedLogin(props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = props.isLoading

  return (
    <BaseModalMedium
      title="Login Required"
      onClick={() => {
        props.setShowModal(false), props.setCartLoading({ id: 0 })
      }}
      body={
        <>
          <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
            To inquire this product you should login, do you want to{' '}
            <span className="text-blueGray-700 font-bold">login</span>?
          </p>

          <div className="text-lg hover:underline hover:text-footer-resources">
            <Link href={`/product/detail/${props.item}`}>
              <span className="text-blue-500 underline">
                or go to details component
              </span>
            </Link>
          </div>
        </>
      }
      action={
        <>
          <LightButton
            className="uppercase mr-2 font-bold"
            onClick={() => {
              props.setShowModal(false), props.setCartLoading({ id: 0 })
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
              router.push('/auth/login')
            }}
          >
            {isLoading ? (
              <i className="px-3 fas fa-hourglass fa-spin"></i>
            ) : (
              ' Yes, Login'
            )}
          </PrimaryButton>
        </>
      }
    />
  )
}
