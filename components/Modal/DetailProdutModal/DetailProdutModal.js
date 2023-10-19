import React from 'react'
import { useRouter } from 'next/router'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'

export default function DetailProdutModal(props) {
  const router = useRouter()

  return (
    <BaseModalMedium
      title="Detail Page Required"
      onClick={() => props.setShowModal(false)}
      body={
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          To see more of this product you should go to detail page, do you want
          to <span className="text-blueGray-700 font-bold">detail page</span>?
        </p>
      }
      action={
        <>
          <LightButton
            className="uppercase mr-2 font-bold"
            onClick={() => props.setShowModal(false)}
          >
            No, Close
          </LightButton>

          <PrimaryButton
            className="uppercase font-bold"
            isLoading={props.isLoading}
            onClick={() => router.push(`/product/detail/${props.item}`)}
          >
            Yes, go to detail
          </PrimaryButton>
        </>
      }
    />
  )
}
