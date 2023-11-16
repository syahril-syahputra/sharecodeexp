import React, { useState } from 'react'
import { BaseModalMedium } from '@/components/Interface/Modal/BaseModal'
import TextInput from '@/components/Interface/Form/TextInput'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'
import FileInput from '@/components/Interface/Form/FileInput'

export default function ShipProduct(props) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [courier, setcourier] = useState('')
  const { data: session } = useSession()
  const [isDownloadedPurchaseOrder, setisDownloadedPurchaseOrder] =
    useState(false)
  const [isDownloadedPackingList, setisDownloadedPackingList] = useState(false)
  const [isLoadingPurchaseOrder, setisLoadingPurchaseOrder] = useState(false)
  const [isLoadingPackingList, setisLoadingPackingList] = useState(false)
  const [file, setFile] = useState(null)

  const handleSubmit = () => {
    if (!isDownloadedPackingList || !isDownloadedPurchaseOrder) {
      toast.error(
        'Please check if you have downloaded Purchase Order and Packing List',
        toastOptions
      )

      return
    }
    if (!file) {
      toast.error('Please select invoice file', toastOptions)

      return
    }
    props.acceptance(
      trackingNumber,
      courier,
      isDownloadedPurchaseOrder,
      isDownloadedPackingList,
      file.files[0]
    )
  }

  const openPurchaseOrder = async () => {
    try {
      setisLoadingPurchaseOrder(true)
      await axios.post(
        `/seller/order/verification-action/open-purchase-order`,
        {
          order_slug: props.orderSlug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      window.open(`pdf/purchase-order//${props.orderSlug}`, '_blank')
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      setisLoadingPurchaseOrder(false)
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
              <div className="w-full px-3  border-b border-gray-300 pb-4">
                <FileInput
                  label="Invoice"
                  description="Input PDF (.pdf) only, max 10MB"
                  accept=".pdf"
                  name="File Upload"
                  required
                  onChange={(target) => setFile(target)}
                  //   errorMsg={['disabled', 'second error']}
                />
              </div>
              <div className="flex space-x-4 px-4">
                <SecondaryButton
                  onClick={openPurchaseOrder}
                  size="sm"
                  disabled={
                    isLoadingPurchaseOrder ||
                    props.purchaseOrderAvailable === '0'
                  }
                  outline
                >
                  {isLoadingPurchaseOrder && (
                    <i className="fas fa-hourglass fa-spin text-white mr-2"></i>
                  )}
                  Open Purchase Invoice
                </SecondaryButton>
                <SecondaryButton
                  onClick={openPackingList}
                  size="sm"
                  disabled={
                    isLoadingPackingList ||
                    props.sellerPackingListAvailable === '0'
                  }
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
                    checked={isDownloadedPurchaseOrder}
                    id="downloadPurchaseOrder"
                    name="downloadPurchaseOrder
"
                    onChange={() =>
                      setisDownloadedPurchaseOrder(!isDownloadedPurchaseOrder)
                    }
                  />
                  <label
                    htmlFor="downloadPurchaseOrder"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Downloaded Purchase Order
                  </label>
                </li>
                <li className="item-center flex space-x-2">
                  <input
                    type="checkbox"
                    id="downloadPackingList"
                    name="downloadPackingList"
                    checked={isDownloadedPackingList}
                    onChange={() =>
                      setisDownloadedPackingList(!isDownloadedPackingList)
                    }
                  />
                  <label
                    htmlFor="downloadPackingList"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    Downloaded Packing List
                  </label>
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
