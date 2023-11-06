import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

// components
import AcceptQuotationModal from '@/components/Modal/OrderComponent/Buyer/AcceptQuotation'
import RejectQuotationModal from '@/components/Modal/OrderComponent/Buyer/RejectQuotation'
import SendPaymentDocsModal from '@/components/Modal/OrderComponent/Buyer/SendPaymentDocs'
import SendUpdatedPaymentDocsModal from '@/components/Modal/OrderComponent/Buyer/SendUpdatedPaymentDocs'
import AcceptOrderModal from '@/components/Modal/OrderComponent/Buyer/AcceptOrder'
import DidntReceiveAnyModal from '@/components/Modal/OrderComponent/Buyer/DidntReceiveAny'
import { toast } from 'react-toastify'
import { toastOptions } from '@/lib/toastOptions'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import { VendorUrl } from '@/route/route-url'
import InfoNotification from '@/components/Interface/Notification/InfoNotification'
import WarningNotification from '@/components/Interface/Notification/WarningNotification'
import PrimaryNotification from '@/components/Interface/Notification/PrimaryNotification'
import { checkValue } from '@/utils/general'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import calculateTimeDifference from '@/lib/calculateTimeDifference'

export default function InquiryDetails({ session, routeParam }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [errorInfo, setErrorInfo] = useState({})
  const [data, setData] = useState([])
  const [isOrderValid, setIsOrderValid] = useState(true)
  const [acceptQuotationModal, setAcceptQuotationModal] = useState(false)
  const [rejectionReason, setRejectionReasons] = useState([
    { value: 'other', label: 'Other' },
  ])
  const [rejectQuotationModal, setRejectQuotationModal] = useState(false)
  const [sendPaymentDocsModal, setSendPaymentDocsModal] = useState(false)
  const [sendUpdatedPaymentDocsModal, setSendUpdatedPaymentDocsModal] =
    useState(false)

  const [acceptOrderModal, setAcceptOrderModal] = useState(false)
  const [didntReceiveAnyModal, setDidntReceiveAnyModal] = useState(false)
  const [isLoadingOpenQUotation, setisLoadingOpenQUotation] = useState(false)
  const openQuotationHandler = async () => {
    try {
      setisLoadingOpenQUotation(true)
      await axios.post(
        `/buyer/order/verification-action/open-quotation`,
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
      window.open(`pdf/quotation/${data.slug}`)
      setisLoadingOpenQUotation(false)
    }
  }
  const loadData = async () => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .get(`/buyer/order/${routeParam.orderSlug}/detail`, {
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
    loadRejectionReason()
  }, [])
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
          <Link href={VendorUrl.buyingProduct.inquiredProduct.index}>
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

  const acceptQuotationModalHandle = async () => {
    setIsLoading(true)
    const response = await axios
      .post(
        `/buyer/order/accept-quotation`,
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
        setAcceptQuotationModal(false)
        loadData()
      })
      .catch((error) => {
        if (error.data.message === 'This inquiry is not yet available.') {
          const timeDiference = calculateTimeDifference(
            error.data.data.available_after
          )
          const timer = error.data.data.available_after
            ? '\navailable in ' + timeDiference
            : ''
          toast.error(error.data.message + timer, toastOptions)
        } else {
          toast.error(error.data.message, toastOptions)
        }

        // console.log(error.data.data.available_after)
        // const momentObject = moment.parse('2023-10-27 15:11:13')
        // const localTimeZone = moment.local()
        // momentObject.tz(localTimeZone)
        // const localTime = momentObject.format('YYYY-MM-DD HH:mm:ss')

        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const loadRejectionReason = async () => {
    setIsLoading(true)
    const response = await axios
      .get(`/reason`)
      .then((response) => {
        let result = response.data
        setRejectionReasons([
          ...result.data,
          { value: 'other', label: 'Other' },
        ])
      })
      .catch((error) => {
        toast.error('Failed to load rejection reason.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const rejectQuotationModalHandle = async (quotationRejectionReason) => {
    setIsLoading(true)
    const response = await axios
      .post(
        `/buyer/order/reject-quotation`,
        {
          order_slug: data.slug,
          reason: quotationRejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setRejectQuotationModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot reject the quotation.',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const sendPaymentDocsModalHandle = async (paymentDocument) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('buyer_receipt', paymentDocument)
    formData.append('order_slug', data.slug)
    const response = await axios
      .post(`/buyer/order/pay-order`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setSendPaymentDocsModal(false)
        loadData()
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        toast.error(
          'Something went wrong. Cannot sent the payment.',
          toastOptions
        )
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const sendUpdatedPaymentDocsModalHandle = async (paymentDocument) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('buyer_receipt', paymentDocument)
    formData.append('order_slug', data.slug)
    const response = await axios
      .post(`/buyer/order/update-payment`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        setSendPaymentDocsModal(false)
        toast.success(response.data.message, toastOptions)
        loadData()
      })
      .catch((error) => {
        setErrorInfo(error.data.data)
        toast.error(
          'Something went wrong. Cannot update the payment.',
          toastOptions
        )
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const acceptOrderModalHandle = async () => {
    setIsLoading(true)
    const response = await axios
      .post(
        `/buyer/order/accept-order`,
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
        setAcceptOrderModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot accept the order.',
          toastOptions
        )
        toast.error(error.data.message, toastOptions)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDidntReceiveAny = async () => {
    setIsLoading(true)
    const response = await axios
      .post(
        `/buyer/order/did-not-receive`,
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
        setAcceptOrderModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot accept the order.',
          toastOptions
        )
        toast.error(error.data.message, toastOptions)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  //notification
  let notification = (
    <PrimaryNotification
      message={data.order_status?.name}
      detail={data.order_status?.buyer_notification?.message}
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
          detail={data.order_status?.buyer_notification?.message}
        ></PrimaryNotification>
      )
      break
    case 3:
    case 12:
    case 15:
      notification = (
        <WarningNotification
          message={data.order_status?.name}
          detail={data.order_status?.buyer_notification?.message}
        ></WarningNotification>
      )
      break
    case 5:
      notification = (
        <>
          <WarningNotification
            message={data.order_status?.name}
            detail={data.order_status?.buyer_notification?.message}
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
            detail={data.order_status?.buyer_notification?.message}
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
          detail={data.order_status?.buyer_notification?.message}
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
    case 2:
      actionToTake = (
        <div>
          {acceptQuotationModal && (
            <AcceptQuotationModal
              isLoading={isLoading}
              expirationDate={data.quotation_expiration_date}
              price={data.price_profite}
              quantity={data.qty}
              orderSlug={data.slug}
              closeModal={() => setAcceptQuotationModal(false)}
              acceptance={acceptQuotationModalHandle}
              availableDate={data.update_verified_inquiry_expiration_date}
              openedQuotation={data.is_quotation_opened === '1' ? true : false}
            />
          )}

          {rejectQuotationModal && (
            <RejectQuotationModal
              isLoading={isLoading}
              rejectionReason={rejectionReason}
              closeModal={() => setRejectQuotationModal(false)}
              acceptance={rejectQuotationModalHandle}
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
                onClick={() => setAcceptQuotationModal(true)}
              >
                Accept Quotation
              </PrimaryButton>
            </div>
            <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setRejectQuotationModal(true)}
              >
                Reject Quotation
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 6:
      actionToTake = (
        <div>
          {sendPaymentDocsModal && (
            <SendPaymentDocsModal
              isLoading={isLoading}
              closeModal={() => setSendPaymentDocsModal(false)}
              acceptance={sendPaymentDocsModalHandle}
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
                onClick={() => setSendPaymentDocsModal(true)}
              >
                Send Payment Receipt
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
    case 9:
      actionToTake = (
        <div>
          {sendUpdatedPaymentDocsModal && (
            <SendUpdatedPaymentDocsModal
              isLoading={isLoading}
              closeModal={() => setSendUpdatedPaymentDocsModal(false)}
              acceptance={sendUpdatedPaymentDocsModalHandle}
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
                onClick={() => setSendUpdatedPaymentDocsModal(true)}
              >
                Update Payment
              </WarningButton>
            </div>
          </div>
        </div>
      )
      break
    case 13:
      actionToTake = (
        <div>
          {acceptOrderModal && (
            <AcceptOrderModal
              isLoading={isLoading}
              closeModal={() => setAcceptOrderModal(false)}
              acceptance={acceptOrderModalHandle}
            />
          )}

          {didntReceiveAnyModal && (
            <DidntReceiveAnyModal
              isLoading={isLoading}
              closeModal={() => setDidntReceiveAnyModal(false)}
              acceptance={handleDidntReceiveAny}
            />
          )}

          <div className="flex flex-col items-center justify-center">
            <div className="mx-2 my-4">
              <PrimaryButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setAcceptOrderModal(true)}
              >
                Confirm Receipt of Order
              </PrimaryButton>
            </div>
            <div className="text-center text-sm text-gray-600 italic py-4">
              In case have any concern with your order please contact exepart
              admin :{' '}
              <a className="font-bold" href="mailto:sales@exepart.com">
                sales@exepart.com
              </a>
            </div>
            {/* <div className="mx-2 my-4">
              <WarningButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setDidntReceiveAnyModal(true)}
              >
                Didn&lsquo;t receive any
              </WarningButton>
            </div> */}
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
          <Link href={VendorUrl.buyingProduct.inquiredProduct.index}>
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

        {/* buyer tracking number */}
        <div className="flex">
          <div className="w-1/2 lg:w-1/3 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                Tracking Number
              </div>
              <div className="mx-2 mb-5 text-xl">
                {checkValue(data.trackingBuyer)}
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
              <div className="mx-2 my-1 text-sm ">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500">Unit Price (USD)</span>
                  {!isLoading ? (
                    <span>${data.price_profite || 0}</span>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-400 w-12"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-2 my-1 text-sm border-b">
                <div className="flex flex-wrap justify-between">
                  <span className="text-gray-500">Test Lab Fee (USD)</span>
                  {!isLoading ? (
                    <span>
                      ${parseInt(data.order_price_amount?.test_fee_amount) || 0}
                    </span>
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
                      ${parseInt(data.order_price_amount?.grand_total) || 0}
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
                <span className="text-gray-500">Buyer</span>
              </div>
              <div className="mx-2 mt-1 text-sm border-b mb-2">
                <div className="flex flex-wrap justify-between">
                  <span>Payment Receipt</span>
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
              <div className="mb-5">
                <div className="mx-2 mt-1 text-sm">
                  <span className="text-gray-500">Exepart</span>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Quotation</span>
                    {data.quotation_available == 1 ? (
                      <label
                        onClick={openQuotationHandler}
                        className={
                          'underline ' +
                          (isLoadingOpenQUotation
                            ? 'text-blue-300 cursor-wait'
                            : 'text-blue-500 cursor-pointer')
                        }
                      >
                        {isLoadingOpenQUotation ? 'loading' : 'view'}
                      </label>
                    ) : (
                      //   <Link
                      //     target="_blank"
                      //     href={`pdf/quotation/${data.slug}`}
                      //     className="underline text-blue-500"
                      //   >
                      //     view
                      //   </Link>
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
                    <span>Buyer&lsquo;s Invoice</span>
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
      session,
      routeParam: context.query,
    },
  }
}
