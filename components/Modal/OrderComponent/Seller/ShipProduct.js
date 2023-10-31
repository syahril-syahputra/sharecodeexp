import { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
export default function ShipProduct(props) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [courier, setcourier] = useState('')
  const { data: session } = useSession()
  const [isDownloadedProformaInvoice, setisDownloadedProformaInvoice] =
    useState(false)
  const [isDownloadedPackingList, setisDownloadedPackingList] = useState(false)
  const [isLoadingProformaInvoice, setisLoadingProformaInvoice] =
    useState(false)
  const [isLoadingPackingList, setisLoadingPackingList] = useState(false)

  const handleSubmit = () => {
    if (isDownloadedPackingList && isDownloadedProformaInvoice) {
      props.acceptance(
        trackingNumber,
        courier,
        isDownloadedProformaInvoice,
        isDownloadedPackingList
      )
    } else {
      toast.error(
        'Please check if you have downloaded Invoice Proformance and Packing List',
        toastOptions
      )
    }
  }

  const openProformaInvoice = async () => {
    try {
      setisLoadingProformaInvoice(true)
      await axios.post(
        `/seller/order/verification-action/open-proforma-invoice`,
        {
          order_slug: props.orderSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      window.open(`pdf/proforma-invoice/${props.orderSlug}`, '_blank')
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingProformaInvoice(false)
    }
  }
  const openPackingList = async () => {
    try {
      setisLoadingPackingList(true)
      await axios.post(
        `/seller/order/verification-action/open-packing-list`,
        {
          order_slug: props.orderSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      window.open(`pdf/seller-packing-list/${props.orderSlug}`, '_blank')
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingPackingList(false)
    }
  }
  return (
    <BaseModalMedium
      title="Ship Product to LAB"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="">
            <div className="flex flex-wrap mb-6 space-y-4">
              <div className="w-full px-3">
                <TextInput
                  label="Courier Company"
                  name="courier"
                  value={courier}
                  onChange={(input) => setcourier(input.value)}
                  errorMsg={props.errorInfo?.trackingSeller}
                />
              </div>
              <div className="w-full px-3">
                <TextInput
                  label="Tracking Number"
                  name="trackingNumber"
                  value={trackingNumber}
                  onChange={(input) => setTrackingNumber(input.value)}
                  errorMsg={props.errorInfo?.trackingSeller}
                />
              </div>
              <div className="flex space-x-4 px-4">
                <SecondaryButton
                  onClick={openProformaInvoice}
                  size="sm"
                  disabled={isLoadingProformaInvoice}
                  outline
                >
                  {isLoadingProformaInvoice && (
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                  )}
                  Open Proforma Invoice
                </SecondaryButton>
                <SecondaryButton
                  onClick={openPackingList}
                  size="sm"
                  disabled={isLoadingPackingList}
                  outline
                >
                  {isLoadingPackingList && (
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                  )}
                  Open Packaging List
                </SecondaryButton>
              </div>
              <ul className="px-4 py-2 space-y-2">
                <li className="item-center flex space-x-2">
                  <input
                    type="checkbox"
                    checked={isDownloadedProformaInvoice}
                    onChange={() =>
                      setisDownloadedProformaInvoice(
                        !isDownloadedProformaInvoice
                      )
                    }
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    Downloaded Proforma Invoice
                  </span>
                </li>
                <li className="item-center flex space-x-2">
                  <input
                    type="checkbox"
                    checked={isDownloadedPackingList}
                    onChange={() =>
                      setisDownloadedPackingList(!isDownloadedPackingList)
                    }
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    Downloaded Packing List
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </>
      }
      action={
        <>
          <LightButton
            disabled={props.isLoading}
            className="mr-2"
            siez="sm"
            onClick={() => props.closeModal()}
          >
            Close
          </LightButton>

          <PrimaryButton
            disabled={props.isLoading}
            siez="sm"
            onClick={handleSubmit}
          >
            {props.isLoading && (
              <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
            )}
            Ship Product
          </PrimaryButton>
        </>
      }
    ></BaseModalMedium>
  )
}
