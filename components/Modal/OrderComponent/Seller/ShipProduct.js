import React, { useState } from 'react'
import {
  BaseModalLarge,
  BaseModalMedium,
} from '@/components/Interface/Modal/BaseModal'
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
  const [hts, sethts] = useState('')
  const [coo, setcoo] = useState('')
  const [eccn, seteccn] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [courier, setcourier] = useState('')
  const { data: session } = useSession()
  const [isDownloadedPurchaseOrder, setisDownloadedPurchaseOrder] =
    useState(false)
  const [isDownloadedPackingList, setisDownloadedPackingList] = useState(false)
  const [isconfirm, setisconfirm] = useState(false)
  const [isLoadingPurchaseOrder, setisLoadingPurchaseOrder] = useState(false)
  const [isLoadingPackingList, setisLoadingPackingList] = useState(false)
  const [file, setFile] = useState(null)

  const handleSubmit = () => {
    if (!isDownloadedPackingList || !isDownloadedPurchaseOrder || !isconfirm) {
      toast.error(
        'Please check if you have downloaded Purchase Order and Packing List and all input are correct',
        toastOptions
      )

      return
    }

    if (!file) {
      toast.error('Please select invoice file', toastOptions)

      return
    }
    props.acceptance(
      hts,
      coo,
      eccn,
      trackingNumber,
      courier,
      isDownloadedPurchaseOrder,
      isDownloadedPackingList,
      isconfirm,
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
    <BaseModalLarge
      title="Ship Product to LAB"
      onClick={() => props.closeModal()}
      body={
        <>
          <div className="flex space-x-4 items-start">
            <div className="flex flex-wrap mb-6 space-y-4 flex-1">
              <div className="w-full px-3">
                <TextInput
                  label="HTS"
                  name="hts"
                  value={hts}
                  onChange={(input) => sethts(input.value)}
                  errorMsg={props.errorInfo?.hts}
                />
              </div>
              <div className="w-full px-3">
                <TextInput
                  label="COO"
                  name="coo"
                  value={coo}
                  onChange={(input) => setcoo(input.value)}
                  errorMsg={props.errorInfo?.coo}
                />
              </div>
              <div className="w-full px-3">
                <TextInput
                  label="ECCN"
                  name="eccn"
                  value={eccn}
                  onChange={(input) => seteccn(input.value)}
                  errorMsg={props.errorInfo?.eccn}
                />
              </div>
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
              <div className="italic  text-gray-500 text-sm px-3">
                NOTE: Please ensure that these details are also added to your
                invoice as they will be required at the time of customs.
              </div>
            </div>
            <div className="flex flex-col mb-6 space-y-4 flex-1">
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
                  Open Purchase Order
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
                <li className="item-center flex space-x-2">
                  <input
                    type="checkbox"
                    id="isconfirm"
                    name="isconfirm"
                    checked={isconfirm}
                    onChange={() => setisconfirm(!isconfirm)}
                  />
                  <label
                    htmlFor="isconfirm"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    We hereby confirm that the above mentioned details are
                    correct to the best of our knowledge and we are responsible
                    for the smooth delivery of products to the laboratory.
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
    ></BaseModalLarge>
  )
}
