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
import { Accordion, Button } from 'flowbite-react'

// layout for page
import Admin from 'layouts/Admin.js'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import { VendorUrl } from '@/route/route-url'
import { checkValue } from '@/utils/general'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import calculateTimeDifference from '@/lib/calculateTimeDifference'
import UploadCourierDetails from '@/components/Modal/OrderComponent/Buyer/UploadCourierDetails'
import ModalPdf from '@/components/Modal/ModalPdf'
import NotificationBarBuyer from '@/components/Interface/Notification/NotificationBarBuyer'
import DocumentButton from '@/components/Shared/Order/DocumentButton'
import { BaseModalLarge } from '@/components/Interface/Modal/BaseModal'

export default function InquiryDetails({ session, routeParam }) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  //data search
  const [isLoading, setIsLoading] = useState(true)
  const [errorInfo, setErrorInfo] = useState({})
  const [data, setData] = useState([])
  const [isOrderValid, setIsOrderValid] = useState(true)
  const [acceptQuotationModal, setAcceptQuotationModal] = useState(false)
  const [rejectionReason, setRejectionReasons] = useState([])
  const [rejectQuotationModal, setRejectQuotationModal] = useState(false)
  const [sendPaymentDocsModal, setSendPaymentDocsModal] = useState(false)
  const [sendUpdatedPaymentDocsModal, setSendUpdatedPaymentDocsModal] =
    useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [slugState, setSlugState] = useState('')
  const [buyerReceiptPath, setBuyerReceiptPath] = useState('')
  const [buyerReceiptData, setBuyerReceiptData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }
  const [acceptOrderModal, setAcceptOrderModal] = useState(false)
  const [didntReceiveAnyModal, setDidntReceiveAnyModal] = useState(false)
  const [isLoadingOpenQUotation, setisLoadingOpenQUotation] = useState(false)
  const [courierModal, setcourierModal] = useState(false)
  const [isQuotationAvailable, setisQuotationAvailable] = useState(false)
  const [initialModal, setinitialModal] = useState(true)
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
    await axios
      .get(`/buyer/order/${routeParam.orderSlug}/detail`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data

        const intervalId = setInterval(() => {
          if (
            checkAvailableQuotationTime(
              result.update_verified_inquiry_expiration_date
            )
          ) {
            setisQuotationAvailable(true)
            clearTimeout(intervalId)
          }
        }, 1000)
        setData(result)
        setBuyerReceiptData(result?.buyer_payment_receipt)
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

  const checkAvailableQuotationTime = (availableDate) => {
    //update_verified_inquiry_expiration_date
    const utcMoment = moment.utc(availableDate, 'YYYY-MM-DD HH:mm:ss')
    const available = utcMoment.local()
    const thisTime = moment()
    if (available.isAfter(thisTime)) {
      return false
    }

    return true
  }
  useEffect(() => {
    loadRejectionReason()
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

  const handlelCourierDetailsModal = (courier, account) => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .post(
        `/buyer/order/upload-courier`,
        {
          order_slug: data.slug,
          buyer_courier_company_name: courier,
          buyer_courier_account_number: account,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setcourierModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          error.data.message ||
            'Something went wrong. Cannot send tracking number',
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }
  const acceptQuotationModalHandle = async () => {
    setIsLoading(true)
    await axios
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

        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const loadRejectionReason = async () => {
    setIsLoading(true)
    await axios
      .get(`/rejection/quotation-rejection`)
      .then((response) => {
        let result = response.data
        setRejectionReasons([...result.data])
      })
      .catch((error) => {
        toast.error('Failed to load rejection reason.', toastOptions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const rejectQuotationModalHandle = async (reason, other_reason) => {
    setIsLoading(true)
    await axios
      .post(
        `/buyer/order/reject-quotation`,
        {
          order_slug: data.slug,
          reason,
          other_reason,
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
    await axios
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
    await axios
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
    await axios
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
    await axios
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
                disabled={isLoading || !isQuotationAvailable}
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
                disabled={isLoading || !isQuotationAvailable}
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

    case 11:
      actionToTake = (
        <div>
          {courierModal && (
            <UploadCourierDetails
              isLoading={isLoading}
              closeModal={() => setcourierModal(false)}
              acceptance={handlelCourierDetailsModal}
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
                onClick={() => setcourierModal(true)}
              >
                Insert Courier Details
              </PrimaryButton>
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
          </div>
        </div>
      )
      break
  }

  let orderPhase = parseInt(data?.order_status?.phase) || '0'
  if (orderPhase == 4 && data?.order_status?.reimbursement == 1) {
    orderPhase = '4-cancellation'
  }
  const isOrderActive = parseInt(data?.is_active)
  orderPhase = isOrderActive == 0 ? '0' : orderPhase

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
          <NotificationBarBuyer data={data} />
        ) : (
          <div className="animate-pulse my-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-400 w-full"></div>
          </div>
        )}
        {initialModal && !isLoading && (
          <BaseModalLarge
            onClick={() => setinitialModal(false)}
            title={data.order_status?.name}
            body={
              <>
                <NotificationBarBuyer data={data} />
                <PrimaryWrapper>
                  {orderPhase ? (
                    <Image
                      src={`/img/order-status/primary/${orderPhase}.png`}
                      width={0}
                      height={10}
                      sizes="100vw"
                      alt="phase-status"
                      style={{ width: '100%' }} // optional
                    />
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
                  <div className="px-2 mt-4">
                    <div className="border-t"></div>
                  </div>
                  <div className="mt-4">
                    {!!data?.order_status?.slug ? (
                      orderPhase == 0 || isOrderActive == 0 ? null : (
                        !data?.admin_reimbursement_receipt_path && (
                          <Image
                            src={`/img/order-status/secondary/${data?.order_status?.slug}.png`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="phase-status"
                            style={{ width: '100%', height: 'auto' }} // optional
                          />
                        )
                      )
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
                  </div>
                </PrimaryWrapper>
                {/* {!!data.order_status?.slug ? (
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
                )} */}
              </>
            }
          />
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
                <span
                  className="ml-4 text-sm cursor-pointer text-blue-700 hover:text-blue-500"
                  onClick={() => setinitialModal(true)}
                >
                  Show Detail
                </span>
              </h3>
            }
            rightTop={
              <h3 className="text-md text-blueGray-700">{data.order_number}</h3>
            }
          ></PageHeader>
        </PrimaryWrapper>

        {/* product info and quotation */}
        <div className="lg:flex lg:justify-around">
          <div className="w-full flex flex-col lg:w-1/2 mr-4">
            <PrimaryWrapper className="p-3 flex-1">
              <div className="lg:flex">
                <div className="w-full">
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
                    {!!data?.created_at ? (
                      moment(data.created_at)
                        .local()
                        .format('dddd, D MMMM YYYY')
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
                        moment(data.order_date)
                          .local()
                          .format('dddd, D MMMM YYYY')
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
                        {data?.companies_products?.moq === 0 ||
                        parseInt(data?.companies_products?.moq) === 0 ||
                        data?.companies_products?.moq === null ? (
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
          <div className="w-full flex flex-col lg:w-1/2">
            <PrimaryWrapper className="p-1 flex-1">
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
                    <span>
                      {isQuotationAvailable && data?.order_price_amount
                        ? `$${data.price_profite}`
                        : '-'}
                    </span>
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
                      {isQuotationAvailable && data?.order_price_amount
                        ? `$${data.order_price_amount?.test_fee_amount}`
                        : '-'}
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
                      {isQuotationAvailable && data?.order_price_amount
                        ? `$${data?.order_price_amount?.grand_total}`
                        : '-'}
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
                      This order is charged for test lab separately because
                      total order is less than 1000US dollars
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
            <PrimaryWrapper className="p-1">
              <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                Actions to take
              </div>
              {actionToTake}
            </PrimaryWrapper>
          </div>
        </div>
        {/* buyer tracking number */}
        <div className="flex space-x-4">
          <PrimaryWrapper className="p-1">
            <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
              Courier
            </div>
            <div className="mx-2 mb-1 text-xl">
              {checkValue(data.buyer_courier_company_name)}
            </div>
            <div className="mx-2 mb-5 text-l">
              {checkValue(data.buyer_courier_account_number)}
            </div>
          </PrimaryWrapper>

          <PrimaryWrapper className="p-1">
            <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
              Tracking Number
            </div>
            <div className="mx-2 mb-5 text-xl">
              {checkValue(data.trackingBuyer)}
            </div>
          </PrimaryWrapper>
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
                <DocumentButton
                  title="Payment Receipt"
                  isActive={buyerReceiptData?.length > 0}
                  onClick={() => {
                    setShowModal(true)
                    setSlugState(data?.slug)
                    setBuyerReceiptPath(data?.buyer_receipt_path)
                  }}
                />
              </div>
              <div className="mb-5">
                <div className="mx-2 mt-1 text-sm">
                  <span className="text-gray-500">Exepart</span>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  <DocumentButton
                    title="Quotation"
                    isActive={
                      data.quotation_available == 1 && isQuotationAvailable
                    }
                    href={`pdf/quotation/${data.slug}`}
                    isLoading={isLoadingOpenQUotation}
                    onClick={openQuotationHandler}
                  />
                  <DocumentButton
                    title="Proforma Invoice"
                    isActive={data.proforma_invoice_available == 1}
                    href={`pdf/proforma-invoice/${data.slug}`}
                  />
                  <DocumentButton
                    title="Invoice"
                    href={`pdf/buyer-invoice/${data.slug}`}
                    isActive={data.buyer_invoice_available == 1}
                  />
                  <DocumentButton
                    title="Receipt of Reimbursement"
                    isActive={data.admin_reimbursement_receipt_path}
                    href={publicDir + data.admin_reimbursement_receipt_path}
                  />
                </div>
                <div className="mx-2 mt-1 text-sm"></div>
                <div className="mx-2 mt-1 text-sm"></div>
              </div>
            </PrimaryWrapper>
            {data.quotation_rejection_reason === 'Other' && (
              <PrimaryWrapper className="p-1">
                <div className="mx-2 my-1 text-md">
                  Quotation Rejection Reason
                </div>
                <div className="text-center p-4">
                  {data.quotation_rejection_reason_other}
                </div>
              </PrimaryWrapper>
            )}
          </div>
          <div className="w-full lg:w-1/2">
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
      {showModal ? (
        <ModalPdf
          title="List of Buyer Payment Receipt Documents"
          setShowModal={setShowModal}
          isLoading={[isLoadingModal, setIsLoadingModal]}
          receiptData={buyerReceiptData}
        />
      ) : null}
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
