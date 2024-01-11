import React, {useState, useEffect} from 'react'
import {getSession} from 'next-auth/react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import {VendorUrl} from '@/route/route-url'
import {checkValue} from '@/utils/general'
import {Accordion, Button} from 'flowbite-react';

// layout for page
import Admin from 'layouts/Admin.js'
// components
import {toast} from 'react-toastify'
import {toastOptions} from '@/lib/toastOptions'
import VerifyInquiryModal from '@/components/Modal/OrderComponent/Seller/VerifyInquiry'
import RejectInquiryModal from '@/components/Modal/OrderComponent/Seller/RejectInquiry'
import UpdateVerifiedInquiryModal from '@/components/Modal/OrderComponent/Seller/UpdateVerifiedInquiry'
import ShipProductModal from '@/components/Modal/OrderComponent/Seller/ShipProduct'
import UploadInvoiceModal from '@/components/Modal/OrderComponent/Seller/UploadInvoice'
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper'
import PageHeader from '@/components/Interface/Page/PageHeader'
import WarningButton from '@/components/Interface/Buttons/WarningButton'
import LightButton from '@/components/Interface/Buttons/LightButton'
import PrimaryButton from '@/components/Interface/Buttons/PrimaryButton'
import UploadCourierDetails from '@/components/Modal/OrderComponent/Buyer/UploadCourierDetails'
import AccpetProduct from '@/components/Modal/OrderComponent/Seller/AcceptProduct'
import UpdateInvoice from '@/components/Modal/OrderComponent/Seller/UpdateInvoice'
import ModalPdf from '@/components/Modal/ModalPdf'
import NotificationBarSeller from '@/components/Interface/Notification/NotificationBarSeller'
import UploadCourierReturn from '@/components/Modal/OrderComponent/Seller/UploadCourierReturn'
import DangerButton from '@/components/Interface/Buttons/DangerButton'
import DisposeCourierReturn from '@/components/Modal/OrderComponent/Seller/DisposeCourierReturn'
import DocumentButton from '@/components/Shared/Order/DocumentButton'

export default function InquiryDetails({session, routeParam}) {
  const publicDir = process.env.NEXT_PUBLIC_DIR
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [isOrderValid, setIsOrderValid] = useState(true)
  const [isLoadingPackingList, setisLoadingPackingList] = useState(false)
  const [isLoadingPurchaseOrder, setisLoadingPurchaseOrder] = useState(false)
  const [courierModal, setcourierModal] = useState(false)
  const [disposeModal, setdisposeModal] = useState(false)
  const [rejectionReason, setRejectionReasons] = useState([])
  const [sellerReceiptData, setSellerReceiptData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [slugState, setSlugState] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const loadRejectionReason = async () => {
    setIsLoading(true)
    await axios
      .get(`/rejection/inquiry-rejection`)
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
  const handlelCourierDetailsModal = (courier, account, agreement) => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .post(
        `/seller/order/upload-courier`,
        {
          order_slug: data.slug,
          seller_return_courier_company_name: courier,
          seller_return_courier_account_number: account,
          return_product_agreement: agreement,
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
          //   'Something went wrong. Cannot send tracking number to buyer.',
          error.data.message,
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }
  const handleDisposeModal = (agreement) => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .post(
        `/seller/order/upload-courier`,
        {
          order_slug: data.slug,
          return_product_agreement: agreement,
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
          //   'Something went wrong. Cannot send tracking number to buyer.',
          error.data.message,
          toastOptions
        )
        setErrorInfo(error.data.data)
        setIsLoading(false)
      })
  }
  const openPurchaseOrder = async () => {
    try {
      setisLoadingPurchaseOrder(true)
      await axios.post(
        `/seller/order/verification-action/open-purchase-order`,
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
      window.open(`pdf/purchase-order/${data.slug}`, '_blank')
      setisLoadingPurchaseOrder(false)
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

  const [updateVerifiedInquiryAviability, setUpdateVerifiedInquiryAviability] = useState(true)
  const loadData = () => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .get(`/seller/order/${routeParam.orderSlug}/detail`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        let result = response.data.data
        setData(result)
        setSellerReceiptData(result.seller_payment_receipt)
        setUpdateVerifiedInquiryAviability(result.is_verified_inquiry_edited)
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
    loadRejectionReason()
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

  const [errorInfo, setErrorInfo] = useState({})
  const [verifyInquiryModal, setVerifyInquiryModal] = useState(false)
  const verifyInquiryModalHandle = async (inputData) => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .post(
        `/seller/order/verify-inquiry`,
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
        setVerifyInquiryModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot verify inquiry.',
          toastOptions
        )
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [rejectInquiryModal, setRejectInquiryModal] = useState(false)
  const rejectInquiryModalHandle = async (reason, other_reason) => {
    setIsLoading(true)
    setErrorInfo({})
    const response = await axios
      .post(
        `/seller/order/reject-inquiry`,
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
        setRejectInquiryModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot reject inquiry.',
          toastOptions
        )
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [updateVerifiedInquiryModal, setUpdateVerifiedInquiryModal] =
    useState(false)
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
  const [acceptProductModal, setacceptProductModal] = useState(false)
  const acceptProductHandler = async (inputData) => {
    setIsLoading(true)
    setErrorInfo({})
    axios
      .post(
        `/seller/order/accept-returned-product`,
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
        setacceptProductModal(false)
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

  const [shipProductModal, setShipProductModal] = useState(false)
  const shipProductHanlde = async (
    hts,
    coo,
    eccn,
    trackingNumber,
    courier,
    account,
    isDownloadedPurchaseOrder,
    isDownloadedPackingList,
    isconfirm,
    invoice
  ) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('hts', hts)
    formData.append('coo', coo)
    formData.append('eccn', eccn)
    formData.append('trackingSeller', trackingNumber)
    formData.append('seller_courier_company_name', courier)
    formData.append('seller_courier_account_number', account)
    formData.append('download_packing_list', isDownloadedPackingList)
    formData.append('download_purchase_order', isDownloadedPurchaseOrder)
    formData.append('all_input_are_correct', isconfirm)
    formData.append('seller_invoice', invoice)

    const response = await axios
      .post(`/seller/order/shipping-product`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setShipProductModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot ship the product. ' +
          error.data.message,
          toastOptions
        )
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [uploadReceipt, setuploadReceipt] = useState(false)
  const uploadReceiptHandler = async (invoice) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('payment_receipt', invoice)
    const response = await axios
      .post(`/seller/order/upload-payment-receipt`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setuploadReceipt(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot upload the invoice.',
          toastOptions
        )
        setErrorInfo(error.data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const [updatePaymentReceiptModal, setupdatePaymentReceiptModal] =
    useState(false)
  const updatePaymentReceiptHandler = async (invoice) => {
    setIsLoading(true)
    setErrorInfo({})
    let formData = new FormData()
    formData.append('order_slug', data.slug)
    formData.append('payment_receipt', invoice)
    const response = await axios
      .post(`/seller/order/update-payment-receipt`, formData, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message, toastOptions)
        setupdatePaymentReceiptModal(false)
        loadData()
      })
      .catch((error) => {
        toast.error(
          'Something went wrong. Cannot upload the invoice.',
          toastOptions
        )
        setErrorInfo(error.data.data)
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
              rejectionReason={rejectionReason}
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
                disabled={isLoading || updateVerifiedInquiryAviability}
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
              purchaseOrderAvailable={data.purchase_order_available}
              sellerPackingListAvailable={data.seller_packing_list_available}
              orderSlug={data.slug}
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
                onClick={() => setShipProductModal(true)}
              >
                Ship Product to LAB
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break

    // case 13:
    //   const utcMoment = moment.utc(
    //     data.arrival_estimation_to_buyer_date,
    //     'YYYY-MM-DD HH:mm:ss'
    //   )
    //   const available = utcMoment.local()
    //   const thisTime = moment()
    //   if (available.isBefore(thisTime)) {
    //     actionToTake = (
    //       <div>
    //         {uploadInvoiceModal && (
    //           <UploadInvoiceModal
    //             isLoading={isLoading}
    //             closeModal={() => setUploadInvoiceModal(false)}
    //             acceptance={uploadInvoiceHandler}
    //             errorInfo={errorInfo}
    //           />
    //         )}

    //         <div className="flex justify-center">
    //           {/* <div>{calculateDayDifference(data.invoice_date)}</div> */}
    //           <div>{}</div>
    //           <div className="mx-2 my-4">
    //             <PrimaryButton
    //               outline
    //               className="mx-1"
    //               size="sm"
    //               disabled={isLoading}
    //               onClick={() => setUploadInvoiceModal(true)}
    //             >
    //               Upload Invoice
    //             </PrimaryButton>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   }
    //   break
    // case 14:
    //   // upload invoice
    //   actionToTake = (
    //     <div>
    //       {uploadInvoiceModal && (
    //         <UploadInvoiceModal
    //           isLoading={isLoading}
    //           closeModal={() => setUploadInvoiceModal(false)}
    //           acceptance={uploadInvoiceHandler}
    //           errorInfo={errorInfo}
    //         />
    //       )}

    //       <div className="flex justify-center">
    //         <div className="mx-2 my-4">
    //           <PrimaryButton
    //             outline
    //             className="mx-1"
    //             size="sm"
    //             disabled={isLoading}
    //             onClick={() => setUploadInvoiceModal(true)}
    //           >
    //             Upload Invoice
    //           </PrimaryButton>
    //         </div>
    //       </div>
    //     </div>
    //   )
    //   break
    case 16:
    case 17:
      actionToTake = (
        <div>
          {courierModal && (
            <UploadCourierReturn
              isLoading={isLoading}
              closeModal={() => setcourierModal(false)}
              acceptance={handlelCourierDetailsModal}
              errorInfo={errorInfo}
            />
          )}
          {disposeModal && (
            <DisposeCourierReturn
              isLoading={isLoading}
              closeModal={() => setdisposeModal(false)}
              acceptance={handleDisposeModal}
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
                Return Product
              </PrimaryButton>
            </div>
            <div className="mx-2 my-4">
              <DangerButton
                outline
                className="mx-1"
                size="sm"
                disabled={isLoading}
                onClick={() => setdisposeModal(true)}
              >
                Dispose Product
              </DangerButton>
            </div>
          </div>
        </div>
      )
      break
    case 19:
    case 20:
      actionToTake = (
        <div>
          {uploadReceipt && (
            <UploadInvoiceModal
              isLoading={isLoading}
              closeModal={() => setuploadReceipt(false)}
              acceptance={uploadReceiptHandler}
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
                onClick={() => setuploadReceipt(true)}
              >
                Upload Payment Receipt
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
    case 23:
      actionToTake = (
        <div>
          {updatePaymentReceiptModal && (
            <UpdateInvoice
              isLoading={isLoading}
              closeModal={() => setupdatePaymentReceiptModal(false)}
              acceptance={updatePaymentReceiptHandler}
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
                onClick={() => setupdatePaymentReceiptModal(true)}
              >
                Update Payment Receipt
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
    case 24:
      actionToTake = (
        <div>
          {acceptProductModal && (
            <AccpetProduct
              isLoading={isLoading}
              closeModal={() => setacceptProductModal(false)}
              acceptance={acceptProductHandler}
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
                onClick={() => setacceptProductModal(true)}
              >
                Accept Product
              </PrimaryButton>
            </div>
          </div>
        </div>
      )
      break
  }


  const orderStatus = typeof data?.order_status?.phase == 'string' ? Number(data?.order_status?.phase) : data?.order_status?.phase
  const slugStatus = typeof data?.order_status?.slug == 'string' ? Number(data?.order_status?.slug) : data?.order_status?.slug

  const isActive = typeof data?.is_active == 'string' ? Number(data?.is_active) : data?.is_active

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
          <NotificationBarSeller data={data} />
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
          />
          {orderStatus ? (
            <Image
              src={`/img/primary/${orderStatus}.png`}
              width={0}
              height={10}
              sizes="100vw"
              alt="phase-status"
              style={{width: '100%'}} // optional
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
        </PrimaryWrapper>
        <Accordion className="my-6" alwaysOpen={false}>
          <Accordion.Panel isOpen={isOpen}>
            <Accordion.Title >
              <span className="font-semibold text-lg text-blueGray-700">
                {!!data.order_status?.name ? (
                  "Step Status"
                ) : (
                  <div className="animate-pulse">
                    <div className="h-5 bg-gray-200 dark:bg-gray-400 w-40"></div>
                  </div>
                )}
              </span>
            </Accordion.Title>
            <Accordion.Content>
              <PrimaryWrapper>
                {!!data?.order_status?.slug ?
                  (
                    (orderStatus == 0 || isActive == 0) ?
                      null
                      :
                      <Image
                        src={`/img/secondary/${data?.order_status?.slug}.png`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="phase-status"
                        style={{width: '100%', height: 'auto'}} // optional
                      />
                  )
                  : (
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
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

        {/* seller tracking number */}
        <div className="flex">
          <div className="w-1/2 lg:w-1/3 mr-4">
            <PrimaryWrapper className="p-1">
              <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                Courier
              </div>
              <div className="mx-2 mb-1 text-xl">
                {checkValue(data.seller_courier_company_name)}
              </div>
              <div className="mx-2 mb-5 text-l">
                {checkValue(data.seller_courier_account_number)}
              </div>
            </PrimaryWrapper>
          </div>
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
        </div>

        {parseInt(data?.return_product) === 1 ? (
          <div className="flex">
            <div className="w-1/2 lg:w-1/3 mr-4">
              <PrimaryWrapper className="p-1">
                <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                  Courier Return Shipment
                </div>
                <div className="mx-2 mb-1 text-xl">
                  {checkValue(data.seller_return_courier_company_name)}
                </div>
                <div className="mx-2 mb-5 text-l">
                  {checkValue(data.seller_return_courier_account_number)}
                </div>
              </PrimaryWrapper>
            </div>
            <div className="w-1/2 lg:w-1/3 mr-4">
              <PrimaryWrapper className="p-1">
                <div className="border-b mx-2 my-1 text-sm uppercase text-gray-500">
                  Tracking Number Return Shipment
                </div>
                <div className="mx-2 mb-5 text-xl">
                  {checkValue(data?.seller_return_tracking_number)}
                </div>
              </PrimaryWrapper>
            </div>
          </div>
        ) : undefined}

        {/* product info and quotation */}
        <div className="lg:flex lg:justify-around">
          <div className="w-full lg:w-2/3 mr-4">
            <PrimaryWrapper className="p-3">
              <div className="lg:flex ">
                {/* <div className="w-full lg:w-1/2 mr-4 border">
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
                </div> */}
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
                    {/* set to local time */}
                    {!!data.companies_products?.created_at ? (
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
                    {/* set to local time */}
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
                    <span>${data.order_price_amount || 0}</span>
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
            {data.inquiry_rejection_reason === 'Other' && (
              <PrimaryWrapper className="p-1">
                <div className="mx-2 my-1 text-md">
                  Inquiry Rejection Reason
                </div>
                <div className="text-center p-4">
                  {data.inquiry_rejection_reason_other}
                </div>
              </PrimaryWrapper>
            )}
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
              <div className="mx-2 mt-1 text-sm">
                {/* <div className="flex flex-wrap justify-between">
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
                </div> */}
                <DocumentButton
                  title="Seller's Invoice"
                  isActive={Boolean(data?.seller_invoice_path)}
                  href={publicDir + data.seller_invoice_path}
                />
                <DocumentButton
                  title={data?.seller_return_courier
                    ? 'Testing Payment Receipt'
                    : 'Testing and Handling Service Payment Receipt'}
                  onClick={() => {
                    setShowModal(true)
                    setSlugState(data?.slug)
                  }}
                  isActive={Boolean(sellerReceiptData?.length > 0)}
                />
              </div>
              {/* <div className="mx-2 mt-1 text-sm  border-b mb-2">
                <div className="flex flex-wrap justify-between">
                  <span>
                    {data.seller_return_courier
                      ? 'Testing Payment Receipt'
                      : 'Testing and Handling Service Payment Receipt'}
                  </span>
                  {
                    sellerReceiptData?.length > 0 ?
                      <span className="underline text-blue-500"
                        onClick={() => {
                          setShowModal(true)
                          setSlugState(data?.slug)
                        }}
                      >
                        View
                      </span>
                      :
                      <span className="underline text-gray-500">view</span>
                  }
                </div>
              </div> */}
              <div className="mb-5">
                <div className="mx-2 mt-1 text-sm">
                  <span className="text-gray-500">Exepart</span>
                </div>
                <div className="mx-2 mt-1 text-sm">
                  {/* <div className="flex flex-wrap justify-between">
                    <span>Purchase Order</span>
                    {data.purchase_order_available == 1 ? (
                      <label
                        onClick={openPurchaseOrder}
                        className={
                          'underline ' +
                          (isLoadingPurchaseOrder
                            ? 'text-blue-300 cursor-wait'
                            : 'text-blue-500 cursor-pointer')
                        }
                      >
                        {isLoadingPurchaseOrder ? 'loading' : 'view'}
                      </label>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div> */}
                  <DocumentButton
                    title={"Purchase Order"}
                    onClick={openPurchaseOrder}
                    isLoading={isLoadingPurchaseOrder}
                    isActive={Boolean(data.purchase_order_available == 1)}
                  />
                  <DocumentButton
                    title={"Packaging Lists"}
                    isActive={Boolean(data?.seller_packing_list_available == 1)}
                    onClick={openPackingList}
                    isLoading={isLoadingPackingList}
                  />
                  <DocumentButton
                    title="Test Result"
                    isActive={Boolean(data.test_result_path)}
                    href={publicDir + data.test_result_path}
                  />
                  <DocumentButton
                    title="Admin's Payment Receipt"
                    isActive={Boolean(data.admin_receipt_path)}
                    href={publicDir + data.admin_receipt_path}
                  />
                  <DocumentButton
                    title={data.seller_return_courier
                      ? 'Testing Innvoice'
                      : 'Testing and Handling Invoice'}
                    isActive={Boolean(data.testing_invoice_available ||
                      data.testing_and_handling_invoice_available)}
                    href={`pdf/testing-and-handling-invoice/${data.slug}`}
                  />
                  <DocumentButton
                    title="Return Invoice"
                    isActive={Boolean(data.return_invoice_available)}
                    href={`pdf/return-invoice/${data.slug}`}
                  />
                </div>
                {/* <div className="mx-2 mt-1 text-sm">
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
                </div> */}
                {/* <div className="mx-2 mt-1 text-sm">
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
                </div> */}
                {/* <div className="mx-2 mt-1 text-sm">
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
                </div> */}
                {/* <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Admin's Payment Receipt</span>
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
                </div> */}
                {/* <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>
                      {data.seller_return_courier
                        ? 'Testing Innvoice'
                        : 'Testing and Handling Invoice'}
                    </span>
                    {data.testing_invoice_available ||
                      data.testing_and_handling_invoice_available ? (
                      <Link
                        target="_blank"
                        href={`pdf/testing-and-handling-invoice/${data.slug}`}
                        className="underline text-blue-500"
                      >
                        view
                      </Link>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div> */}

                {/* <div className="mx-2 mt-1 text-sm">
                  <div className="flex flex-wrap justify-between">
                    <span>Return Invoice</span>
                    {data.return_invoice_available ? (
                      <Link
                        target="_blank"
                        href={`pdf/return-invoice/${data.slug}`}
                        className="underline text-blue-500"
                      >
                        view
                      </Link>
                    ) : (
                      <span className="underline text-gray-500">view</span>
                    )}
                  </div>
                </div> */}
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
      {
        showModal ?
          <ModalPdf
            title="List of Seller Payment Receipt Documents"
            setShowModal={setShowModal}
            isLoading={[isLoadingModal, setIsLoadingModal]}
            receiptData={sellerReceiptData}
          />
          :
          null
      }
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
