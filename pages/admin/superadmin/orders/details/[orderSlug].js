import moment from "moment";
import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import Image from "next/image"
import axios from "@/lib/axios";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";

//route
import { AdminUrl } from "@/route/route-url";

// components
import SendQuotationModal from "@/components/Modal/OrderComponent/Superadmin/SendQuotation"
import EditRejectedQuotationModal from "@/components/Modal/OrderComponent/Superadmin/EditRejectedQuotation";
import SendOrderToInquireModal from "@/components/Modal/OrderComponent/Superadmin/SendOrderToInquire"
import SendProformaInvoiceModal from "@/components/Modal/OrderComponent/Superadmin/SendProformaInvoice"
import AcceptPaymentDocumentModal from "@/components/Modal/OrderComponent/Superadmin/AcceptPaymentDocument"
import RejectPaymentDocumentModal from "@/components/Modal/OrderComponent/Superadmin/RejectPaymentDocument"
import TrackerNumberForBuyerModal from "@/components/Modal/OrderComponent/Superadmin/TrackerNumberForBuyer"
import CompleteOrderModal from "@/components/Modal/OrderComponent/Superadmin/CompleteOrder"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import PageHeader from "@/components/Interface/Page/PageHeader";
import PrimaryWrapper from "@/components/Interface/Wrapper/PrimaryWrapper";
import LightButton from "@/components/Interface/Buttons/LightButton";
import SecondaryButton from "@/components/Interface/Buttons/SecondaryButton";
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import {CompanyStatusesIcon} from "@/components/Shared/Company/Statuses";
import PrimaryNotification from "@/components/Interface/Notification/PrimaryNotification";
import DangerNotification from "@/components/Interface/Notification/DangerNotification";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";

export default function OrderDetails({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [isOrderValid, setIsOrderValid] = useState(true)
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/orders/${routeParam.orderSlug}/detail`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                setIsOrderValid(true)
            }).catch(() => {
                setIsOrderValid(false)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])


    const sendProformaInvoiceHandler = async () => {
        setIsLoading(true)
        const request = await axios.post('/admin/orders/send-proforma-invoice',
            {
                'order_slug': data.slug
            },
            {
                headers: {
                    "Authorization" : `Bearer ${session.accessToken}`
                }
            })
            .then((response) => {
                toast.success(response.data.message, toastOptions)
                setSendQuotationModal(false)
                loadData()
            }).catch((error) => {
                toast.error("Something went wrong. Cannot send the quotation.", toastOptions)
                setIsLoading(false)
            })
    } 

    // old process

    const [errorInfo, setErrorInfo] = useState({})
    const [sendQuotationModal, setSendQuotationModal] = useState(false)
    const handleSendQuotationModal = async (inputData) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/admin/orders/UpdateQuotedApproval`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The quotation has been sent.", toastOptions)
            setSendQuotationModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot send the quotation.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [editRejectedQuotationModal, setEditRejectedQuotationModal] = useState(false)
    const handleEditRejectedQuotationModal = async (inputData) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/admin/orders/EditQuotedApproval`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The quotation has been edited and sent.", toastOptions)
            setEditRejectedQuotationModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot edit the quotation.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [sendProformaInvoiceModal, setSendProformaInvoiceModal] = useState(false)
    const handleSendProformaInvoiceModal = async (proformaDocs) => {
        setIsLoading(true)
        setErrorInfo({})
        let formData = new FormData();
        formData.append("proforma_doc", proformaDocs);
        formData.append("id", data.id)

        const response = await axios.post(`/admin/orders/UpdateProformaInvoice`, formData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The proforma invoice has been sent.", toastOptions)
            setSendProformaInvoiceModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot send the proforma invoice.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [acceptPaymentDocumentModal, setAcceptPaymentDocumentModal] = useState(false)
    const handleAcceptPaymentDocumentModal = async (shipinfoforseller) => {
        setIsLoading(true)
        let formData = new FormData();
        formData.append("shipinfoforseller", shipinfoforseller);
        formData.append("id", data.id)
        const response = await axios.post(`/admin/orders/UpdateComplatePayment`, formData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The payment has been accepted.", toastOptions)
            setAcceptPaymentDocumentModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot accept the payment.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [rejectPaymentDocumentModal, setRejectPaymentDocumentModal] = useState(false)
    const handleRejectPaymentDocumentModal = async (rejectionReason) => {
        setIsLoading(true)
        let inputData = {
            id: data.id,
            reason: rejectionReason
        }
        const response = await axios.post(`/admin/orders/UpdateRejectPayment`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The payment has been rejected.", toastOptions)
            setRejectPaymentDocumentModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot reject the payment.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [trackerNumberForBuyerModal, setTrackerNumberForBuyerModal] = useState(false)
    const handleTrackerNumberForBuyerModal = async (buyerTracker, expectedShippingDateBuyer) => {
        setIsLoading(true)
        setErrorInfo({})
        let inputData = {
            id: data.id,
            trackingBuyer: buyerTracker,
            expectedShippingDateBuyer: expectedShippingDateBuyer,
        }
        const response = await axios.post(`/admin/orders/UpdateOrderShiped`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Tracking number has been sent to buyer.", toastOptions)
            setTrackerNumberForBuyerModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot send tracking number to buyer.", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [completeOrderModal, setCompleteOrderModal] = useState(false)
    const handleCompleteOrderModal = async (sellerInvoice) => {
        setIsLoading(true)
        setErrorInfo({})
        let formData = new FormData();
        formData.append("PaymentProof", sellerInvoice);
        formData.append("id", data.id)

        const response = await axios.post(`/admin/orders/UpdateCompletedOrder`, formData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("The order has been completed.", toastOptions)
            setCompleteOrderModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong. Cannot complete the order.", toastOptions)
            setIsLoading(false)
        })
    }

    const [sendOrderToInquire, setSendOrderToInquire] = useState(false)
    const handleSendOrderToInquire = (infoOrder) => {
        setIsLoading(true)
        setErrorInfo({})
        let inputData = {
            id: data.id,
            infoOrder: infoOrder
        }
    }

    if(!isOrderValid) {    
        return (
            <div className="">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="">
                        <h1 className="font-semibold text-2xl">
                            Order Details
                        </h1>
                    </div>
                    <Link href={AdminUrl.orderComponent.allOrders}>
                        <LightButton 
                            size="sm" 
                            className="">
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
    
    return (
        <>
            <div className="">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="">
                        <h1 className="font-semibold text-2xl">
                            Order Details
                        </h1>
                    </div>
                    <Link href={AdminUrl.orderComponent.allOrders}>
                        <LightButton 
                            size="sm" 
                            className="">
                            <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                                Back
                        </LightButton>
                    </Link>
                </div>
                {!!data.order_status?.name ? 
                    <PrimaryNotification 
                        message={data.order_status?.name} 
                        detail={data.order_status?.admin_notification?.message}
                    ></PrimaryNotification> : 
                    <div className="animate-pulse my-4">
                        <div className="h-16 bg-gray-200 dark:bg-gray-400 w-full"></div>
                    </div>
                }                
                {false && 
                    <DangerNotification message="[this is message]" detail="[this is details]"></DangerNotification>
                }
                <PrimaryWrapper>
                    <PageHeader
                        leftTop={
                            <h3 className="font-semibold text-lg text-blueGray-700">
                                {!!data.order_status?.name ?
                                    data.order_status?.name :
                                    <div className="animate-pulse">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-400 w-40"></div>
                                    </div>
                                }
                            </h3>
                        }
                    ></PageHeader>
                    {!!data.order_status?.slug ? 
                        <Image
                            src={`/img/order-status/${data.order_status?.slug}.png`}
                            width="2000"
                            height="200"
                            alt="exepart-order-status"
                            className="mx-auto"
                        ></Image> :
                        <div className="animate-pulse">
                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 dark:bg-gray-400">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                    }
                </PrimaryWrapper>
                
                {/* seller buyer */}
                <div className="lg:flex lg:justify-around">
                    <div className="w-full lg:w-1/2 mr-4">
                        <PrimaryWrapper className="p-1">
                            <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                                Buyer
                            </div>
                            <div className="mx-2 my-1 text-xl">
                                <Link href={`/admin/superadmin/registry/company/${data.buyer?.id}`} className="text-blueGray-700 underline">{data.buyer?.name}</Link>
                                <CompanyStatusesIcon status={data.buyer?.is_confirmed}/>
                            </div>
                            <div className="mx-2 text-md mb-5">
                                {data.buyer?.country}
                            </div>
                            <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                                Buyer's Shipment Info
                            </div>
                            <div className="mx-2 my-1 text-sm uppercase text-gray-500">
                                Tracking Number
                            </div>
                            <div className="mx-2 mb-5 text-xl uppercase">
                                {data.trackingBuyer ? data.trackingBuyer : '-'}
                            </div>
                        </PrimaryWrapper>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <PrimaryWrapper className="p-1">
                            <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                                Seller
                            </div>
                            <div className="mx-2 my-1 text-xl">
                                <Link href={`/admin/superadmin/registry/company/${data.companies_products?.company?.id}`} className="text-blueGray-700 underline">{data.companies_products?.company?.name}</Link>
                                <CompanyStatusesIcon status={data.companies_products?.company?.is_confirmed}/>  
                            </div>
                            <div className="mx-2 text-md mb-5">
                                {data.companies_products?.company?.country}
                            </div>
                            <div className="mx-2 my-1 text-sm font-bold uppercase border-b text-gray-500">
                                Seller's Shipment Info
                            </div>
                            <div className="mx-2 my-1 text-sm uppercase text-gray-500">
                                Tracking Number
                            </div>
                            <div className="mx-2 mb-5 text-xl uppercase">
                                {data.trackingSeller ? data.trackingSeller : '-'}
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
                                    {data.companies_products?.img && 
                                        <Image
                                            src={publicDir + "/product_images/" + data.companies_products.img}
                                            width="400"
                                            height="400"
                                            alt="exepart-order-status"
                                            className="mx-auto"
                                        ></Image>
                                    } 
                                    {!data.companies_products?.img && 
                                        <div className="flex justify-center items-center h-40">
                                            no image
                                        </div>
                                    }   
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="mx-2 my-1 text-xl">
                                        {data.companies_products?.ManufacturerNumber}
                                    </div>
                                    <div className="mx-2 text-md mb-5">
                                        {data.companies_products?.Manufacture}
                                    </div>
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Description
                                    </div>
                                    <div className="mx-2 text-md mb-5">
                                        {data.companies_products?.Description}
                                    </div>
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Inquired Date
                                    </div>
                                    <div className="mx-2 text-md">
                                        {moment(data.created_at).format('dddd, D MMMM YYYY')}
                                    </div>
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Order Date
                                    </div>
                                    <div className="mx-2 text-md">
                                        {moment(data.start_order_date).format('dddd, D MMMM YYYY')}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:flex lg:justify-around mt-5">
                                <div className="w-full lg:w-1/3 mr-2">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        MOQ
                                    </div>
                                    <div className="mx-2 text-md">
                                        {data.companies_products?.moq}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 mr-2">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Available Quantity
                                    </div>
                                    <div className="mx-2 text-md">
                                        {data.companies_products?.AvailableQuantity}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Country
                                    </div>
                                    <div className="mx-2 text-md">
                                        {data.companies_products?.country}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:flex lg:justify-around mt-3 mb-8">
                                <div className="w-full lg:w-1/3 mr-2">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Packaging
                                    </div>
                                    <div className="mx-2 text-md">
                                        {data.companies_products?.packaging}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 mr-2">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Category
                                    </div>
                                    <div className="mx-2 text-sm">
                                        {data.companies_products?.subcategory?.category?.name}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <div className="mx-2 my-1 text-gray-500 text-sm">
                                        Sub-Category
                                    </div>
                                    <div className="mx-2 text-sm">
                                        {data.companies_products?.subcategory?.name}
                                    </div>
                                </div>
                            </div>
                        </PrimaryWrapper>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <PrimaryWrapper className="p-1">
                            <div className="mx-2 my-1 text-md">
                                Inquiry Details
                            </div>
                            <div className="mx-2 my-1 text-sm border-b">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500">Date Code</span>
                                    <span>{data.companies_products?.dateCode}</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm">
                                Seller
                            </div>
                            <div className="mx-2 my-1 text-sm">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500">Order Quantity</span>
                                    <span>{data.qty}</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm border-b">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500">Unit Price (USD)</span>
                                    <span>${data.price}</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm mb-5">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500 font-bold">Total Price (USD)</span>
                                    <span>${data.price ? (parseFloat(data.price) * parseInt(data.qty)) : '' }</span>
                                </div>
                            </div>

                            {/* Exepart */}
                            <div className="mx-2 my-1 text-sm">
                                Exepart
                            </div>
                            <div className="mx-2 my-1 text-sm">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500">Order Quantity</span>
                                    <span>{data.qty}</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm border-b">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500">Unit Price (USD)</span>
                                    <span>${data.price_profite}</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm mb-5">
                                <div className="flex flex-wrap justify-between">
                                    <span className="text-gray-500 font-bold">Total Price (USD)</span>
                                    <span>${data.price_profite ? (parseFloat(data.price_profite) * parseInt(data.qty)) : '' }</span>
                                </div>
                            </div>
                            <div className="mx-2 my-1 text-sm font-bold text-gray-500">
                                Note: 
                            </div>
                            <div className="mx-2 text-sm text-gray-500 mb-5">
                                Price is only for the product. The order type is Ex-works. The price you see on screen does not include logistic costs, customs, tax, insurance or any additional expenses that may occur.
                            </div>                                                        
                        </PrimaryWrapper>
                    </div>
                </div>

                {/* document */}
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
                                    <span className="underline text-blue-500">[action]</span>
                                </div>
                            </div>
                            <div className="mx-2 mt-1 text-sm">
                                <span className="text-gray-500">From Seller</span>
                            </div>
                            <div className="mx-2 mt-1 text-sm border-b mb-2">
                                <div className="flex flex-wrap justify-between">
                                    <span>Seller's Invoice</span>
                                    <span className="underline text-blue-500">[action]</span>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="mx-2 mt-1 text-sm">
                                    <span className="text-gray-500">Exepart</span>
                                </div>
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Quotation</span>
                                        <span className="underline text-blue-500">[action]</span>
                                    </div>
                                </div>
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Purchase Order</span>
                                        <span className="underline text-blue-500">[action]</span>
                                    </div>
                                </div>
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Proforma Invoice</span>
                                        {data.proforma_doc ? 
                                            <Link target="_blank" href={publicDir + data.proforma_doc} className="underline text-blue-500">
                                                [view]
                                            </Link>
                                            :
                                            <span className="underline text-gray-500">
                                                [view]
                                            </span>                                        
                                        }
                                    </div>
                                </div> 
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Invoice</span>
                                        <span className="underline text-blue-500">[action]</span>
                                    </div>
                                </div>                            
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Packing List for Seller</span>
                                        <span className="underline text-blue-500">[action]</span>
                                    </div>
                                </div>
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Test Result</span>
                                        <span className="underline text-blue-500">[action]</span>
                                    </div>
                                </div>
                                <div className="mx-2 mt-1 text-sm">
                                    <div className="flex flex-wrap justify-between">
                                        <span>Packing List for White Horse</span>
                                        <span className="underline text-blue-500">[action]</span>
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
                            {data.order_status_id !== 4 && 
                                <div className="italic flex justify-center items-center h-28">
                                    No action to take
                                </div>
                            }
                            {data.order_status_id == 4 &&
                                <div className="mx-2 my-4">
                                    <PrimaryButton 
                                        outline
                                        className="mx-1" 
                                        size="sm"
                                        disabled={isLoading}
                                        // onClick={() => sendProformaInvoiceHandler(true) }
                                        onClick={() => setSendProformaInvoiceModal(true) }
                                    >   
                                        {isLoading ?
                                            <span>
                                                <i className="fas fa-hourglass fa-spin mr-2"></i>
                                                Sending...
                                            </span>
                                            :
                                            'Send Proforma Invoice'
                                        }
                                    </PrimaryButton>
                                </div>

                            }
                            
                        </PrimaryWrapper>
                    </div>
                </div>
            </div>            

            {/* documents */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Documents
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + data.proforma_doc}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.proforma_doc ? false : true} size="sm">
                                Proforma Invoice
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/Payment_doc/" + data.Payment_doc}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.Payment_doc ? false : true} size="sm">
                                Payment Document
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/shipinfoforseller/" + data.shipinfoforseller}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.shipinfoforseller ? false : true} size="sm">
                                Shipment Info 
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/PaymentDocSeller/" + data.PaymentDocSeller}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.PaymentDocSeller ? false : true} size="sm">
                                Seller's Invoice
                            </SecondaryButton>
                        </Link>
                    </div>
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/PaymentProof/" + data.PaymentProof}>
                            <SecondaryButton className="md:w-full sm:w-full" disabled={data.PaymentProof ? false : true} size="sm">
                                Payment Receipt for Seller
                            </SecondaryButton>
                        </Link>
                    </div>           
                </div>
            </PrimaryWrapper>
            
            {/* action */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Actions
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    {data.order_status_id != 4 && 
                        <div className="mx-1 my-1">
                            <WarningButton 
                                className="md:w-full sm:w-full" 
                                disabled={data.order_status_id == 2 ? false : true} 
                                size="sm"
                                onClick={() => setSendQuotationModal(true) }
                            >
                                Send Quotation
                            </WarningButton>
                        </div>
                    }
                    {data.order_status_id == 4 && 
                        <div className="mx-1 my-1">
                            <WarningButton 
                                className="md:w-full sm:w-full" 
                                disabled={data.order_status_id == 4 ? false : true} 
                                size="sm"
                                onClick={() => setEditRejectedQuotationModal(true) }
                            >
                                Edit Rejected Quotation
                            </WarningButton>
                        </div>
                    }
                    {/* <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            // disabled={data.order_status_id == 2 ? false : true} 
                            size="sm"
                            onClick={() => setSendOrderToInquire(true) }
                        >
                            Set Order to Inquired
                        </WarningButton>
                    </div> */}
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 5 ? false : true} 
                            size="sm"
                            onClick={() => setSendProformaInvoiceModal(true) }
                        >
                            Send Proforma Invoice
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 7 ? false : true} 
                            size="sm"
                            onClick={() => setAcceptPaymentDocumentModal(true) }
                        >
                            Accept Payment
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 7 ? false : true} 
                            size="sm"
                            onClick={() => setRejectPaymentDocumentModal(true) }
                        >
                            Request Update Payment
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 9 ? false : true} 
                            size="sm"
                            onClick={() => setTrackerNumberForBuyerModal(true) }
                        >
                            Provide Tracking Number
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 12 ? false : true} 
                            size="sm"
                            onClick={() => setCompleteOrderModal(true) }
                        >
                            Complete Order
                        </WarningButton>
                    </div>
                    {/* <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            // disabled={data.order_status_id != 13 ? false : true} 
                            size="sm"
                            onClick={() => setCancelOrderModal(true) }
                        >
                            Cancel Order
                        </WarningButton>
                    </div> */}
          
                </div>
            </PrimaryWrapper>
            
            {/* modal */}
            <>
                {sendQuotationModal &&
                    <SendQuotationModal
                        isLoading={isLoading}
                        orderId={data.id}
                        orderQty={data.qty}
                        closeModal={() => setSendQuotationModal(false)}
                        acceptance={handleSendQuotationModal}
                        errorInfo={errorInfo}
                    />
                }

                {editRejectedQuotationModal &&
                    <EditRejectedQuotationModal
                        isLoading={isLoading}
                        orderId={data.id}
                        orderQty={data.qty}
                        closeModal={() => setEditRejectedQuotationModal(false)}
                        acceptance={handleEditRejectedQuotationModal}
                        errorInfo={errorInfo}
                    />
                }

                {sendOrderToInquire &&
                    <SendOrderToInquireModal
                        isLoading={isLoading}
                        closeModal={() => setSendOrderToInquire(false)}
                        acceptance={handleSendOrderToInquire}
                        errorInfo={errorInfo}
                    />
                }

                {sendProformaInvoiceModal &&
                    <SendProformaInvoiceModal
                        isLoading={isLoading}
                        closeModal={() => setSendProformaInvoiceModal(false)}
                        acceptance={handleSendProformaInvoiceModal}
                        errorInfo={errorInfo}
                    />
                }

                {acceptPaymentDocumentModal && 
                    <AcceptPaymentDocumentModal
                        isLoading={isLoading}
                        closeModal={() => setAcceptPaymentDocumentModal(false)}
                        acceptance={handleAcceptPaymentDocumentModal}
                        errorInfo={errorInfo}
                    />
                }

                {rejectPaymentDocumentModal &&
                    <RejectPaymentDocumentModal
                        isLoading={isLoading}
                        closeModal={() => setRejectPaymentDocumentModal(false)}
                        acceptance={handleRejectPaymentDocumentModal}
                        errorInfo={errorInfo}
                    />
                }

                {trackerNumberForBuyerModal &&
                    <TrackerNumberForBuyerModal
                        isLoading={isLoading}
                        closeModal={() => setTrackerNumberForBuyerModal(false)}
                        acceptance={handleTrackerNumberForBuyerModal}
                        errorInfo={errorInfo}
                    />
                }

                {completeOrderModal &&
                    <CompleteOrderModal
                        isLoading={isLoading}
                        closeModal={() => setCompleteOrderModal(false)}
                        acceptance={handleCompleteOrderModal}
                        errorInfo={errorInfo}
                    />
                }

                {/* {cancelOrderModal &&
                    <CancelOrderModal
                        isLoading={isLoading}
                        closeModal={() => setCancelOrderModal(false)}
                        acceptance={handleCancelOrderModal}
                    />
                } */}
            </>
        </>
    );
}
    
OrderDetails.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session,
            routeParam: context.query
        }
    }
}