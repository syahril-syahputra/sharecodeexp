import moment from 'moment'
import { checkValue } from '@/utils/general'
import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import axios from '@/lib/axios'
import Link from 'next/link'

// layout for page
import Admin from 'layouts/Admin.js'

//route
import { AdminUrl } from '@/route/route-url'

// components
import SendProformaInvoiceModal from '@/components/Modal/OrderComponent/Superadmin/SendProformaInvoice'
import AcceptPaymentModal from '@/components/Modal/OrderComponent/Superadmin/AcceptPayment'
import RequestUpdatePaymentModal from '@/components/Modal/OrderComponent/Superadmin/RequestUpdatePayment'
import GoodResultModal from '@/components/Modal/OrderComponent/Superadmin/GoodResult'
import BadResultModal from '@/components/Modal/OrderComponent/Superadmin/BadResult'
import TrackerNumberForBuyerModal from '@/components/Modal/OrderComponent/Superadmin/TrackerNumberForBuyer'
import CompleteOrderModal from '@/components/Modal/OrderComponent/Superadmin/CompleteOrder'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'
import PageHeader from '@/components/Interface/Page/PageHeader'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import LightButton from '@/components/Interface/Buttons/LightButton'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import { CompanyStatusesIcon } from '@/components/Shared/Company/Statuses'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'

export default function OrderDetails({ session, routeParam }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [errorInfo, setErrorInfo] = useState({})
  const [isOrderValid, setIsOrderValid] = useState(true)
  const loadData = async () => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .get(`/admin/orders/${routeParam.orderSlug}/detail`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setData(result)
        setIsOrderValid(true)
      })
      .catch((error) => {
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

  const [sendProformaInvoiceModal, setSendProformaInvoiceModal] =
    useState(false)
  const sendProformaInvoiceHandler = async () => {
    setIsLoading(true)
    setErrorInfo({})
    const request = await axios
      .post(
        '/admin/orders/send-proforma-invoice',
        {
          order_slug: data.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setSendProformaInvoiceModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot send the proforma invoice.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [acceptPaymentModal, setAcceptPaymentModal] = useState(false)
  const handleAcceptPaymentModal = async (isReviewdm, isAccepted) => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .post(
        `/admin/orders/accept-payment`,
        {
          order_slug: data.slug,
          payment_reviewed: isReviewdm,
          payment_accepted: isAccepted,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setAcceptPaymentModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(error.data.message, toastOptions)
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [requestUpdatePaymentModal, setRequestUpdatePaymentModal] =
    useState(false)
  const handleRequestUpdatePaymentModal = async (requestUpdate) => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .post(
        `/admin/orders/request-update-payment`,
        {
          order_slug: data.slug,
          request_update_payment_reason: requestUpdate,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setRequestUpdatePaymentModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot sent the request.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [goodResultModal, setGoodResultModal] = useState(false)
  const handleGoodResultModal = async (goodResult) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('test_result', goodResult)

    const response = await axios
      .post(`/admin/orders/upload-good-test`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setRequestUpdatePaymentModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot upload the result.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [badResultModal, setBadResultModal] = useState(false)
  const handleBadResultModal = async (badResult, terminateOrder) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('test_result', badResult)
    formData.append('terminate_order', terminateOrder)

    const response = await axios
      .post(`/admin/orders/upload-bad-test`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setRequestUpdatePaymentModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot upload the result.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [trackerNumberForBuyerModal, setTrackerNumberForBuyerModal] =
    useState(false)
  const handleTrackerNumberForBuyerModal = async (trackingNumber) => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .post(
        `/admin/orders/shipping-product-to-buyer`,
        {
          order_slug: data.slug,
          tracking_number: trackingNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setTrackerNumberForBuyerModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot send tracking number to buyer.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  const [completeOrderModal, setCompleteOrderModal] = useState(false)
  const handleCompleteOrderModal = async (adminReceipt, orderArrived) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('admin_receipt', adminReceipt)
    formData.append('order_arrived', orderArrived)

    const response = await axios
      .post(`/admin/orders/close-order`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setCompleteOrderModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot complete the order.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }

  if (!isOrderValid) {
    return (
      <div className="">
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-2xl">Order Details</h1>
          </div>
          <Link href={AdminUrl.orderProduct.allOrders}>
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

  //notification
  let notification = (
    <PrimaryNotification
      message={data.order_status?.name}
      detail={data.order_status?.admin_notification?.message}
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
          detail={data.order_status?.admin_notification?.message}
        ></PrimaryNotification>
      )
      break
    case 3:
    case 12:
    case 15:
      notification = (
        <WarningNotification
          message={data.order_status?.name}
          detail={data.order_status?.admin_notification?.message}
        ></WarningNotification>
      )
      break
    case 5:
      notification = (
        <>
          <WarningNotification
            message={data.order_status?.name}
            detail={data.order_status?.admin_notification?.message}
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
            detail={data.order_status?.admin_notification?.message}
          ></WarningNotification>
          <InfoNotification
            message="Request Update"
            detail={data.request_update_payment_reason}
          ></InfoNotification>
        </>
      )
      break
    case 17:
      notification = (
        <InfoNotification
          message={data.order_status?.name}
          detail={data.order_status?.admin_notification?.message}
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
    case 4:
      actionToTake = (
        <div>
          {sendProformaInvoiceModal && (
            <SendProformaInvoiceModal
              isLoading={isLoading}
              orderSlug={data.slug}
              closeModal={() => setSendProformaInvoiceModal(false)}
              acceptance={sendProformaInvoiceHandler}
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
                onClick={() => setSendProformaInvoiceModal(true)}
              >
                Send Proforma Invoice
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
    case 7:
      actionToTake = (
        <div>
          {acceptPaymentModal && (
            <AcceptPaymentModal
              isLoading={isLoading}
              closeModal={() => setAcceptPaymentModal(false)}
              acceptance={(isReviewed, isAccepted) =>
                handleAcceptPaymentModal(isReviewed, isAccepted)
              }
              orderSlug={routeParam.orderSlug}
              file={publicDir + data.buyer_receipt_path}
              errorInfo={errorInfo}
            />
          )}

          {requestUpdatePaymentModal && (
            <RequestUpdatePaymentModal
              isLoading={isLoading}
              closeModal={() => setRequestUpdatePaymentModal(false)}
              acceptance={handleRequestUpdatePaymentModal}
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
                onClick={() => setAcceptPaymentModal(true)}
              >
                Accept Payment
              </PrimaryButton>
            </div>
            <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setRequestUpdatePaymentModal(true)}
              >
                Request Update Payment
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 10:
      actionToTake = (
        <div>
          {goodResultModal && (
            <GoodResultModal
              isLoading={isLoading}
              closeModal={() => setGoodResultModal(false)}
              acceptance={handleGoodResultModal}
              errorInfo={errorInfo}
            />
          )}

          {badResultModal && (
            <BadResultModal
              isLoading={isLoading}
              closeModal={() => setBadResultModal(false)}
              acceptance={handleBadResultModal}
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
                onClick={() => setGoodResultModal(true)}
              >
                Upload Good Result
              </PrimaryButton>
            </div>
            <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setBadResultModal(true)}
              >
                Upload Bad Result
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 11:
      actionToTake = (
        <div>
          {trackerNumberForBuyerModal && (
            <TrackerNumberForBuyerModal
              isLoading={isLoading}
              closeModal={() => setTrackerNumberForBuyerModal(false)}
              acceptance={handleTrackerNumberForBuyerModal}
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
                onClick={() => setTrackerNumberForBuyerModal(true)}
              >
                Provide Tracking Number
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
    case 16:
      actionToTake = (
        <div>
          {completeOrderModal && (
            <CompleteOrderModal
              isLoading={isLoading}
              closeModal={() => setCompleteOrderModal(false)}
              acceptance={handleCompleteOrderModal}
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
                onClick={() => setCompleteOrderModal(true)}
              >
                Complete Order
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
  }

  return (
    <>
      <div className="">
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <h1 className="font-semibold text-2xl">Order Details</h1>
          </div>
          <Link href={AdminUrl.orderProduct.allOrders}>
            <LightButton size="sm" className="">
              <i className="mr-2 ml-1 fas fa-arrow-left"></i>
              Back
            </LightButton>
          </Link>
        </div>
        {/* <OrderNotification order_status={data.order_status}/> */}
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

        {/* seller buyer */}
        <div className="lg:flex lg:justify-around">
          <div className="w-full lg:w-1/2 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Buyer
              </div>
              <div className="mx-2 my-1 text-xl">
                {!!data.buyer?.name ? (
                  <>
                    <Link
                      href={`/admin/superadmin/registry/company/${data.buyer?.id}`}
                      className="text-blueGray-700 underline"
                    >
                      {data.buyer?.name}
                    </Link>
                    <CompanyStatusesIcon status={data.buyer?.is_confirmed} />
                  </>
                ) : (
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-gray-400 w-48"></div>
                  </div>
                )}
              </div>
              <div className="mx-2 text-md mb-5">
                {!!data.buyer?.country ? (
                  data.buyer?.country
                ) : (
                  <div className="animate-pulse">
                    <div className="h-3 bg-gray-200 dark:bg-gray-400 w-40"></div>
                  </div>
                )}
              </div>
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Buyer's Shipment Info
              </div>
              <div className="mx-2 my-1 text-sm uppercase text-gray-500">
                Tracking Number
              </div>
              <div className="mx-2 mb-5 text-xl">
                {checkValue(data.trackingBuyer)}
              </div>
            </PrimaryWrapper>
          </div>
          <div className="w-full lg:w-1/2">
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Seller
              </div>
              <div className="mx-2 my-1 text-xl">
                {!!data.companies_products?.company?.name ? (
                  <>
                    <Link
                      href={`/admin/superadmin/registry/company/${data.companies_products?.company?.id}`}
                      className="text-blueGray-700 underline"
                    >
                      {data.companies_products?.company?.name}
                    </Link>
                    <CompanyStatusesIcon
                      status={data.companies_products?.company?.is_confirmed}
                    />
                  </>
                ) : (
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-gray-400 w-48"></div>
                  </div>
                )}
              </div>
              <div className="mx-2 text-md mb-5">
                {!!data.companies_products?.company?.country ? (
                  data.companies_products?.company?.country
                ) : (
                  <div className="animate-pulse">
                    <div className="h-3 bg-gray-200 dark:bg-gray-400 w-40"></div>
                  </div>
                )}
              </div>
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Seller's Shipment Info
              </div>
              <div className="mx-2 my-1 text-sm text-gray-500">
                Tracking Number
              </div>
              <div className="mx-2 mb-5 text-xl uppercase">
                {checkValue(data.trackingSeller)}
              </div>
            </PrimaryWrapper>
          </div>
        </div>

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
                        <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
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
                {/* <div className="w-full lg:w-1/3 mr-2">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Category
                                    </div>
                                    <div className="mx-2 text-sm">
                                        {!!data.companies_products?.subcategory?.category?.name?
                                            data.companies_products?.subcategory?.category?.name:
                                            <div className="animate-pulse">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Sub-Category
                                    </div>
                                    <div className="mx-2 text-sm">
                                        {!!data.companies_products?.subcategory?.name?
                                            data.companies_products?.subcategory?.name:
                                            <div className="animate-pulse">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-400 w-52"></div>
                                            </div>
                                        }
                                    </div>
                                </div> */}
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
              <div className="mx-2 my-1 text-sm">Seller</div>
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

              {/* Exepart */}
              <div className="mx-2 my-1 text-sm">Exepart</div>
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
                    <span>${data.price_profite}</span>
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
                      {data.price_profite
                        ? parseFloat(data.price_profite) * parseInt(data.qty)
                        : ''}
                    </span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-5 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              {parseFloat(data.price_profite) * parseInt(data.qty) < 1000 && (
                <div className="mx-2 my-1 text-sm mb-5">
                  <div className="flex flex-wrap justify-between">
                    <span className="text-orange-500 font-bold">
                      This order is charged for test lab separately
                    </span>
                    <span className="text-orange-500">
                      Check Quotation for more further
                    </span>
                  </div>
                </div>
              )}
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
                <span className="text-gray-500">From Buyer</span>
              </div>
              <div className="mx-2 mt-1 text-sm border-b mb-2">
                <div className="flex flex-wrap justify-between">
                  <span>Buyer's Payment</span>
                  {data.buyer_receipt_path ? (
                    <Link
                      target="_blank"
                      href={publicDir + data.buyer_receipt_path}
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
                <span className="text-gray-500">From Seller</span>
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
                    <span>Quotation</span>
                    {data.quotation_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/quotation/${data.slug}`}
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
                    <span>Proforma Invoice</span>
                    {data.proforma_invoice_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/proforma-invoice/${data.slug}`}
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
                    <span>Buyer's Invoice</span>
                    {data.buyer_invoice_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/buyer-invoice/${data.slug}`}
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
                    <span>Packing List for Seller</span>
                    {data.seller_packing_list_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/seller-packing-list/${data.slug}`}
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
                    <span>Packing List for White Horse (Bad Result)</span>
                    {data.lab_to_seller_packing_list_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/to-seller-packing-list/${data.slug}`}
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
                    <span>Packing List for White Horse (Good Result)</span>
                    {data.lab_to_buyer_packing_list_available == 1 ? (
                      <Link
                        target="_blank"
                        href={`pdf/to-buyer-packing-list/${data.slug}`}
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
          </div>
        </div>
      </div>
    </>
  )
}

OrderDetails.layout = Admin

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
      routeParam: context.query,
    },
  }
}
