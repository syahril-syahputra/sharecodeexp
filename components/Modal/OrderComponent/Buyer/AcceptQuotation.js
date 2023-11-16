import React from 'react'
import moment from 'moment'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useRouter } from 'next/router'

export default function VerifyOrder(props) {
  const test_free = parseFloat(props.price * props.quantity) > 1000
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoadingOpenQUotation, setisLoadingOpenQUotation] = useState(false)
  const acceptHandler = () => {
    props.acceptance()
  }
  const openQuotationHandler = async () => {
    try {
      setisLoadingOpenQUotation(true)
      await axios.post(
        `/buyer/order/verification-action/open-quotation`,
        {
          order_slug: props.orderSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      const url = `/admin/member/buyer/inquired-product/details/pdf/quotation/${props.orderSlug}`
      window.open(url, '_blank')
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingOpenQUotation(false)
    }
  }

  const convert = (availableDate) => {
    if (availableDate) {
      const utcMoment = moment.utc(availableDate, 'YYYY-MM-DD HH:mm:ss')
      const localMoment = utcMoment.local()

      return localMoment.format('dddd, D MMMM YYYY, HH:mm:ss')
    }

    return ''
  }
  const cek = (availableDate) => {
    const utcMoment = moment.utc(availableDate, 'YYYY-MM-DD HH:mm:ss')
    const available = utcMoment.local()
    const thisTime = moment()
    if (available.isBefore(thisTime)) {
      return false
    }

    return true
  }

  return (
    <BaseModalMedium
      title="Accept Quotation"
      onClick={() => props.closeModal()}
      body={
        <>
          {cek(props.availableDate) && (
            <div className="rounded-lg text-sm text-center  bg-red-100 mb-2 p-2">
              Quotation will Available at : {convert(props.availableDate)}{' '}
            </div>
          )}

          <p className="text-blueGray-500 text-md leading-relaxed italic">
            Quotation Expiration Date:{' '}
            <span className="text-blueGray-700 font-bold">
              {moment(props.expirationDate).format(
                'dddd, D MMMM YYYY HH:mm:ss'
              )}
            </span>
          </p>
          <p className="mb-5 text-blueGray-500 text-lg leading-relaxed">
            Do you agree to{' '}
            <span className="text-blueGray-700 font-bold">accept</span> this
            quotation?
          </p>
          {!test_free && (
            <p className="text-sm text-orange-500 italic mb-5">
              The amount to be paid is below $1,000.00, hence this order is
              charged separately for test payment at the LAB. Check Quotation
              for more further.
            </p>
          )}
          <SecondaryButton
            onClick={() => openQuotationHandler()}
            size="sm"
            disabled={isLoadingOpenQUotation}
            outline
          >
            {isLoadingOpenQUotation && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Open Quotation
          </SecondaryButton>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            size="sm"
            className="mr-2"
            onClick={() => props.closeModal()}
          >
            No, Close
          </LightButton>

          <PrimaryButton
            disabled={props.isLoading}
            size="sm"
            onClick={() => acceptHandler()}
          >
            {props.isLoading && (
              // eslint-disable-next-line react/react-in-jsx-scope
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Yes, Accept
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
