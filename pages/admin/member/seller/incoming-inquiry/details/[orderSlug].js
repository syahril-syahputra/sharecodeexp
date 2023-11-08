import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { VendorUrl } from '@/route/route-url'
import { checkValue } from '@/utils/general'

// layout for page
import Admin from 'layouts/Admin.js'

// components
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import VerifyInquiryModal from '@/components/Modal/OrderComponent/Seller/VerifyInquiry'
import RejectInquiryModal from '@/components/Modal/OrderComponent/Seller/RejectInquiry'
import UpdateVerifiedInquiryModal from '@/components/Modal/OrderComponent/Seller/UpdateVerifiedInquiry'
import ShipProductModal from '@/components/Modal/OrderComponent/Seller/ShipProduct'
import UploadInvoiceModal from '@/components/Modal/OrderComponent/Seller/UploadInvoice'

import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'

export default function InquiryDetails({ session, routeParam }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [isOrderValid, setIsOrderValid] = useState(true)
  const [errorInfo, setErrorInfo] = useState({})
  const [verifyInquiryModal, setVerifyInquiryModal] = useState(false)
  const [uploadInvoiceModal, setUploadInvoiceModal] = useState(false)
  const [shipProductModal, setShipProductModal] = useState(false)
  const [rejectInquiryModal, setRejectInquiryModal] = useState(false)
  const [updateVerifiedInquiryModal, setUpdateVerifiedInquiryModal] =
    useState(false)
  const [isLoadingPackingList, setisLoadingPackingList] = useState(false)
  const [isLoadingProformaInvoice, setisLoadingProformaInvoice] =
    useState(false)
  const openProformaInvoice = async () => {
    try {
      setisLoadingProformaInvoice(true)
      await axios.post(
        `/seller/order/verification-action/open-proforma-invoice`,
        {
          order_slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      window.open(`pdf/proforma-invoice/${data.slug}`, '_blank')
      setisLoadingProformaInvoice(false)
    }
  }
  const openPackingList = async () => {
    try {
      setisLoadingPackingList(true)
      await axios.post(
        `/seller/order/verification-action/open-packing-list`,
        {
          order_slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
    } catch (error) {
      toast.error(error.data.message, toastOptions)
    } finally {
      window.open(`pdf/seller-packing-list/${data.slug}`, '_blank')
      setisLoadingPackingList(false)
    }
  }

  const loadData = () => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .get(`/seller/order/${routeParam.orderSlug}/detail`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setData(result)
        setIsOrderValid(true)
      })
      .catch(() => {
        setIsOrderValid(false)
        toast.error(error.data.message, toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    loadData()
  }, [])

  if (!isOrderValid) {
    return (
      <div className="">
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-2xl">Order Details</h1>
          </div>
          <Link href={VendorUrl.sellingProduct.incomingInquiries.index}>
            <LightButton size="sm" className="">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        </div>
        <div className="px-4 py-3 border-0 mt-5 pb-64">
          <div className="flex justify-center">
            <div className="text-center mt-60">
              <h4 className="text-md italic">Your order is not found</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const verifyInquiryModalHandle = async (inputData) => {
    setIsLoading(true)
    setErrorInfo({})
  }

  const rejectInquiryModalHandle = async (inputData) => {
    setIsLoading(true)
    setErrorInfo({})
  }

  const updateVerifiedInquiryHandle = async (inputData) => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .post(
        `/seller/order/update-verified-inquiry`,
        {
          order_slug: data.slug,
          ...inputData,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setUpdateVerifiedInquiryModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(error.data.message, toastOptions)
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const shipProductHanlde = async (
    trackingNumber,
    courier,
    isDownloadedPerformaInvoice,
    isDownloadedPackingList
  ) => {
    setIsLoading(true)
    setErrorInfo({})
  }

  const uploadInvoiceHandler = async (invoice) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('seller_invoice', invoice)
    formData.append('order_slug', data.slug)
  }

  //notification
  let notification = (
    <PrimaryNotification
      message={data.order_status?.name}
      detail={data.order_status?.seller_notification?.message}
    ></PrimaryNotification>
  )
  switch (data.order_status?.id) {
    case 1:
    case 2:
    case 4:
    case 6:
    case 7:
    case 8:
    case 10:
    case 11:
    case 13:
    case 14:
    case 16:
      notification = (
        <PrimaryNotification
          message={data.order_status?.name}
          detail={data.order_status?.seller_notification?.message}
        ></PrimaryNotification>
      )
      break
    case 3:
    case 12:
    case 15:
      notification = (
        <WarningNotification
          message={data.order_status?.name}
          detail={data.order_status?.seller_notification?.message}
        ></WarningNotification>
      )
      break
    case 5:
      notification = (
        <>
          <WarningNotification
            message={data.order_status?.name}
            detail={data.order_status?.seller_notification?.message}
          ></WarningNotification>
          <InfoNotification
            message="Rejection Reason"
            detail={data.reason}
          ></InfoNotification>
        </>
      )
      break
    case 9:
      notification = (
        <>
          <WarningNotification
            message={data.order_status?.name}
            detail={data.order_status?.seller_notification?.message}
          ></WarningNotification>
        </>
      )
      break
    case 17:
      notification = (
        <InfoNotification
          message={data.order_status?.name}
          detail={data.order_status?.seller_notification?.message}
        ></InfoNotification>
      )
      break
  }

  //action to take using switch
  let actionToTake = (
    <div className="italic flex justify-center items-center h-28">
      No action to take
    </div>
  )
  switch (data.order_status?.id) {
    case 1:
      //verify
      //reject
      actionToTake = (
        <div>
          {verifyInquiryModal && (
            <VerifyInquiryModal
              isLoading={isLoading}
              orderId={data.id}
              orderQty={data.qty}
              availableQty={data.companies_products?.AvailableQuantity}
              moq={data.companies_products?.moq}
              dateCode={data.companies_products?.dateCode}
              closeModal={() => setVerifyInquiryModal(false)}
              acceptance={verifyInquiryModalHandle}
              errorInfo={errorInfo}
            />
          )}

          {rejectInquiryModal && (
            <RejectInquiryModal
              isLoading={isLoading}
              closeModal={() => setRejectInquiryModal(false)}
              acceptance={rejectInquiryModalHandle}
              errorInfo={errorInfo}
            />
          )}

          <div className="flex justify-center">
            <div className="mx-2 my-4">
              <PrimaryButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setVerifyInquiryModal(true)}
              >
                Verify Price & Quantity
              </PrimaryButton>
            </div>
            <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setRejectInquiryModal(true)}
              >
                Reject Inquiry
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 2:
      //update
      actionToTake = (
        <div>
          {updateVerifiedInquiryModal && (
            <UpdateVerifiedInquiryModal
              isLoading={isLoading}
              orderQty={data.qty}
              availableQty={data.companies_products?.AvailableQuantity}
              moq={data.companies_products?.moq}
              price={data.price}
              dateCode={data.companies_products?.dateCode}
              closeModal={() => setUpdateVerifiedInquiryModal(false)}
              acceptance={updateVerifiedInquiryHandle}
              errorInfo={errorInfo}
            />
          )}

          <div className="flex justify-center">
            <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setUpdateVerifiedInquiryModal(true)}
              >
                Update Verified Inquiry
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 8:
      // ship to lab
      actionToTake = (
        <div>
          {shipProductModal && (
            <ShipProductModal
              isLoading={isLoading}
              closeModal={() => setShipProductModal(false)}
              acceptance={shipProductHanlde}
              proformaInvoiceAvailable={data.proforma_invoice_available}
              sellerPackingListAvailable={data.seller_packing_list_available}
              orderSlug={data.slug}
              errorInfo={errorInfo}
            />
          )}
          <div className="flex flex-col">
            <div className="mx-2 my-4 flex justify-center">
              <PrimaryButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setShipProductModal(true)}
              >
                Ship Product to LAB
              </PrimaryButton>
            </div>
            <div className="mx-2 my-1 text-sm font-bold text-gray-500">
              Note:
            </div>
            <div className="mx-2 text-sm text-gray-500 mb-5">
              Use proforma invoice and packing list to send product to LAB.
            </div>
          </div>
        </div>
      )
      break
    case 14:
      // upload invoice
      actionToTake = (
        <div>
          {uploadInvoiceModal && (
            <UploadInvoiceModal
              isLoading={isLoading}
              closeModal={() => setUploadInvoiceModal(false)}
              acceptance={uploadInvoiceHandler}
              errorInfo={errorInfo}
            />
          )}

          <div className="flex justify-center">
            <div className="mx-2 my-4">
              <PrimaryButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setUploadInvoiceModal(true)}
              >
                Upload Invoice
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-2xl">Order Details</h1>
          </div>
          <Link href={VendorUrl.sellingProduct.incomingInquiries.index}>
            <LightButton size="sm" className="">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        </div>
        {!!data.order_status?.name ? (
          notification
        ) : (
          <div className="animate-pulse my-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-400 w-full"></div>
          </div>
        )}

        <PrimaryWrapper>
          <PageHeader
            leftTop={
              <h3 className="font-semibold text-lg text-blueGray-700">
                {!!data.order_status?.name ? (
                  data.order_status?.name
                ) : (
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-gray-400 w-40"></div>
                  </div>
                )}
              </h3>
            }
            rightTop={
              <h3 className="text-md text-blueGray-700">{data.order_number}</h3>
            }
          ></PageHeader>
          {!!data.order_status?.slug ? (
            <Image
              src={`/img/order-status/${data.order_status?.slug}.png`}
              width="2000"
              height="200"
              alt="exepart-order-status"
              className="mx-auto"
            ></Image>
          ) : (
            <div className="animate-pulse">
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 dark:bg-gray-400">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
          )}
        </PrimaryWrapper>
        {/* seller tracking number */}
        <div className="flex">
          <div className="w-1/2 lg:w-1/3 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                Tracking Number
              </div>
              <div className="mx-2 mb-5 text-xl">
                {checkValue(data.trackingSeller)}
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-1/2 lg:w-1/3 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                Courier
              </div>
              <div className="mx-2 mb-5 text-xl">
                {checkValue(data.seller_courier)}
              </div>
            </PrimaryWrapper>
          </div>
        </div>

        {parseInt(data?.return_product) === 1 ? (
          <div className="flex">
            <div className="w-1/2 lg:w-1/3 mr-4">
              <PrimaryWrapper className="p-1">
                <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                  New Tracking Number
                </div>
                <div className="mx-2 mb-5 text-xl">
                  {checkValue(data.seller_return_tracking_number)}
                </div>
              </PrimaryWrapper>
            </div>
            <div className="w-1/2 lg:w-1/3 mr-4">
              <PrimaryWrapper className="p-1">
                <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                  New Courier
                </div>
                <div className="mx-2 mb-5 text-xl">
                  {checkValue(data.seller_return_courier)}
                </div>
              </PrimaryWrapper>
            </div>
          </div>
        ) : undefined}

        {/* product info and quotation */}
        <div className="lg:flex lg:justify-around">
          <div className="w-full lg:w-2/3 mr-4">
            <PrimaryWrapper className="p-3">
              <div className="lg:flex lg:justify-around">
                <div className="w-full lg:w-1/2 mr-4 border">
                  {isLoading && (
                    <div className="animate-pulse">
                      <div className="flex items-center justify-center w-full h-48 bg-gray-300 dark:bg-gray-400">
                        <svg
                          className="h-14 w-14 text-gray-200 dark:text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {data.companies_products?.img && !isLoading && (
                    <div className="flex justify-center items-center">
                      <Image
                        src={
                          publicDir +
                          '/product_images/' +
                          data.companies_products.img
                        }
                        width="400"
                        height="400"
                        alt="exepart-product"
                      ></Image>
                    </div>
                  )}
                  {!data.companies_products?.img && !isLoading && (
                    <div className="flex justify-center items-center h-40">
                      no image
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="mx-2 my-1 text-xl">
                    {!!data.companies_products?.ManufacturerNumber ? (
                      data.companies_products?.ManufacturerNumber
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 dark:bg-gray-400 w-60"></div>
                      </div>
                    )}
                  </div>
                  <div className="mx-2 text-md mb-5">
                    {!!data.companies_products?.Manufacture ? (
                      data.companies_products?.Manufacture
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-60"></div>
                      </div>
                    )}
                  </div>
                  <div className="mx-2 my-1 text-gray-500 text-sm">
                    Description
                  </div>
                  <div className="mx-2 text-md mb-5">
                    {!!data.companies_products?.Description ? (
                      data.companies_products?.Description
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-3 bg-gray-200 dark:bg-gray-400"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-400 mt-1"></div>
                      </div>
                    )}
                  </div>
                  <div className="mx-2 my-1 text-gray-500 text-sm">
                    Inquired Date
                  </div>
                  <div className="mx-2 text-md">
                    {!!data.companies_products?.created_at ? (
                      moment(data.created_at).format('dddd, D MMMM YYYY')
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-60"></div>
                      </div>
                    )}
                  </div>
                  <div className="mx-2 my-1 text-gray-500 text-sm">
                    Order Date
                  </div>
                  <div className="mx-2 text-md">
                    {!isLoading ? (
                      data.order_date ? (
                        moment(data.created_at).format('dddd, D MMMM YYYY')
                      ) : (
                        '-'
                      )
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-60"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:flex lg:justify-around mt-5">
                <div className="w-full lg:w-1/3 mr-2">
                  <div className="mx-2 my-1 text-gray-500 text-sm">MOQ</div>
                  <div className="mx-2 text-md">
                    {!!data.companies_products?.moq ? (
                      data.companies_products?.moq
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/3 mr-2">
                  <div className="mx-2 my-1 text-gray-500 text-sm">
                    Available Quantity
                  </div>
                  <div className="mx-2 text-md">
                    {!!data.companies_products?.AvailableQuantity ? (
                      data.companies_products?.AvailableQuantity
                    ) : (
                      <div className="animate-pulse">
                        {data?.companies_products?.AvailableQuantity === 0 ||
                        data?.companies_products?.AvailableQuantity === null ? (
                          <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52">
                            Out of Stock
                          </div>
                        ) : (
                          <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/3">
                  <div className="mx-2 my-1 text-gray-500 text-sm">Country</div>
                  <div className="mx-2 text-md">
                    {!!data.companies_products?.country ? (
                      data.companies_products?.country
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 mb-8">
                <div className="w-full lg:w-1/3 mr-2">
                  <div className="mx-2 my-1 text-gray-500 text-sm">
                    Packaging
                  </div>
                  <div className="mx-2 text-md">
                    {!!data.companies_products?.packaging ? (
                      data.companies_products?.packaging
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-full lg:w-1/3">
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-md">Inquiry Details</div>
              <div className="mx-2 my-1 text-sm border-b">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500">Date Code</span>
                  {!!data.companies_products?.dateCode ? (
                    <span>{data.companies_products?.dateCode}</span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-2 my-1 text-sm">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500">Order Quantity</span>
                  {!!data.qty ? (
                    <span>{data.qty}</span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-2 my-1 text-sm border-b">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500">Unit Price (USD)</span>
                  {!isLoading ? (
                    <span>${data.price}</span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-2 my-1 text-sm mb-5">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500 font-bold">
                    Total Price (USD)
                  </span>
                  {!isLoading ? (
                    <span>
                      $
                      {data.price
                        ? parseFloat(data.price) * parseInt(data.qty)
                        : ''}
                    </span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-5 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-2 my-1 text-sm font-bold text-gray-500">
                Note:
              </div>
              <div className="mx-2 text-sm text-gray-500 mb-5">
                Price is only for the product. The order type is Ex-works. The
                price you see on screen does not include logistic costs,
                customs, tax, insurance or any additional expenses that may
                occur.
              </div>
            </PrimaryWrapper>
          </div>
        </div>

        {/* document and action to take */}
        <div className="lg:flex lg:justify-around">
          <div className="w-full lg:w-1/2 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Documents
              </div>
              <div className="mx-2 mt-1 text-sm">
                <span className="text-gray-500">Seller</span>
              </div>
              <div className="mx-2 mt-1 text-sm border-b mb-2">
                <div className="flex flex-wrap justify-between">
                  <span>Seller's Invoice</span>
                  {data.seller_invoice_path ? (
                    <Link
                      target="_blank"
                      href={publicDir + data.seller_invoice_path}
                      className="underline text-blue-500"
                    >
                      view
                    </Link>
                  ) : (
                    <span className="underline text-gray-500">view</span>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <div className="mx-2 mt-1 text-sm">
                  <span className="text-gray-500">Exepart</span>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Purchase Order</span>
                    {data.purchase_order_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/purchase-order/${data.slug}`}
                        className="underline text-blue-500"
                      >
                        view
                      </Link>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Packaging Lists</span>
                    {data.seller_packing_list_available == 1 ? (
                      <label
                        onClick={openPackingList}
                        className={
                          'underline ' +
                          (isLoadingPackingList
                            ? 'text-blue-300 cursor-wait'
                            : 'text-blue-500 cursor-pointer')
                        }
                      >
                        {isLoadingPackingList ? 'loading' : 'view'}
                      </label>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Proforma Invoice</span>
                    {data.proforma_invoice_available == 1 ? (
                      <label
                        onClick={openProformaInvoice}
                        className={
                          'underline ' +
                          (isLoadingProformaInvoice
                            ? 'text-blue-300 cursor-wait'
                            : 'text-blue-500 cursor-pointer')
                        }
                      >
                        {isLoadingProformaInvoice ? 'loading' : 'view'}
                      </label>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Test Result</span>
                    {data.test_result_path ? (
                      <Link
                        target="_blank"
                        href={publicDir + data.test_result_path}
                        className="underline text-blue-500"
                      >
                        view
                      </Link>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Admin's Receipt</span>
                    {data.admin_receipt_path ? (
                      <Link
                        target="_blank"
                        href={publicDir + data.admin_receipt_path}
                        className="underline text-blue-500"
                      >
                        view
                      </Link>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div>
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-full lg:w-1/2">
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Actions to take
              </div>
              {actionToTake}
            </PrimaryWrapper>
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Event History
              </div>
              <ul className="space-y-2 p-2 text-sm">
                {data.event_history?.length === 0 && (
                  <div className="text-base italic text-center p-4">
                    No Event History
                  </div>
                )}
                {data.event_history?.map((item) => (
                  <li key={item.id} className="flex">
                    <span className="text-cyan-700 mr-2 w-1/5 ">
                      {moment(item.updated_at)
                        .local()
                        .format('DD MMM YYYY hh:mm')}
                    </span>
                    <div>
                      <span className="font-bold">{item.description}</span>
                      {item.note && (
                        <div className="italic py-2">{item.note}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </PrimaryWrapper>
          </div>
        </div>
      </div>
    </>
  )
}

InquiryDetails.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session: session,
      routeParam: context.query,
    },
  }
}
