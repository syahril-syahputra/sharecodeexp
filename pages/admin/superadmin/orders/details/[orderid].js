import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// layout for page
import Admin from "layouts/Admin.js";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep";
import OrderStatus from "@/components/Shared/Order/OrderStatus";
import SendQuotationModal from "@/components/Modal/OrderComponent/Superadmin/SendQuotation"
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

export default function OrderDetails({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/admin/orders/${routeParam.orderid}/data`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                let result = response.data.data
                setData(result)
                loadTodoAction(result.order_status.id)
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])

    const [todoValue, setTodoValue] = useState()
    const loadTodoAction = async (order_status_id) => {
        const request = await axios.get(`/admin/notification/${order_status_id}`, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setTodoValue(response.data.data.message)
        })
    }

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
            toast.success("Quotation has been set", toastOptions)
            setSendQuotationModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
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
            toast.success("Proforma has been sent", toastOptions)
            setSendProformaInvoiceModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
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
            toast.success("Payment has been accepted", toastOptions)
            setAcceptPaymentDocumentModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [rejectPaymentDocumentModal, setRejectPaymentDocumentModal] = useState(false)
    const handleRejectPaymentDocumentModal = async (rejectionReason) => {
        console.log(rejectionReason)
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
            toast.success("Payment has been rejected", toastOptions)
            setRejectPaymentDocumentModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [trackerNumberForBuyerModal, setTrackerNumberForBuyerModal] = useState(false)
    const handleTrackerNumberForBuyerModal = async (buyerTracker) => {
        setIsLoading(true)
        setErrorInfo({})
        let inputData = {
            id: data.id,
            trackingBuyer: buyerTracker
        }
        const response = await axios.post(`/admin/orders/UpdateOrderShiped`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Tracker has been sent to buyer", toastOptions)
            setTrackerNumberForBuyerModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
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
            toast.success("Order has been Completed", toastOptions)
            setCompleteOrderModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong", toastOptions)
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
        console.log(inputData)
    }

    return (
        <>
            <PrimaryWrapper>
                <PageHeader
                    leftTop={
                        <h3 className="font-semibold text-lg text-blueGray-700">
                            Order Details
                        </h3>
                    }
                    rightTop={
                        <Link href={`/admin/superadmin/orders/allorders`}>
                            <LightButton 
                                size="sm" 
                                className="mr-2">
                                <i className="mr-2 ml-1 fas fa-arrow-left"></i>
                                Back
                            </LightButton>
                        </Link>
                    }
                ></PageHeader>

                <OrderStatus 
                    status={data.order_status?.name}
                    action={todoValue}
                />

                {data.reason && 
                    <div className="px-4 py-3 border-0 bg-red-400 mt-2">
                        <div className="flex justify-center">
                            <div className=" text-center">
                                <h4
                                    className="font-semibold text-sm text-white italic">
                                    Rejection: {data.reason}
                                </h4>
                            </div>
                        </div>
                    </div>
                }
                <OrderStatusStep orderStatus={data.order_status}/>
            </PrimaryWrapper>

            {/* seller buyer */}
            <div className="lg:flex lg:justify-around">
                <div className="w-full lg:w-1/2 mr-4">
                    <PrimaryWrapper>
                        <div className="m-2 p-2 text-md uppercase border-b text-center">
                            Buyer
                        </div>
                        <div className="m-2 p-2 text-sm">
                            <table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="pr-10">Company Name</td>
                                        <td className="pr-2">:</td>
                                        <td className="">
                                            <Link href={`/admin/superadmin/registry/company/${data.buyer?.id}`} className="text-blueGray-700 underline">{data.buyer?.name}</Link>
                                            <CompanyStatusesIcon status={data.buyer?.is_confirmed}/>                                  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Country</td>
                                        <td className="">:</td>
                                        <td className="">{data.buyer?.country}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Buyer's Tracker</td>
                                        <td className="">:</td>
                                        <td className="">{data.trackingBuyer}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </PrimaryWrapper>
                </div>
                <div className="w-full lg:w-1/2">
                    <PrimaryWrapper>
                        <div className="m-2 p-2 text-md uppercase border-b text-center">
                            Seller
                        </div>
                        <div className="m-2 p-2 text-sm">
                            <table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="pr-10">Company Name</td>
                                        <td className="pr-2">:</td>
                                        <td className="">
                                            <Link href={`/admin/superadmin/registry/company/${data.companies_products?.company?.id}`} className="text-blueGray-700 underline">{data.companies_products?.company?.name}</Link>
                                            <CompanyStatusesIcon status={data.buyer?.is_confirmed}/>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="">Country</td>
                                        <td className="">:</td>
                                        <td className="">{data.companies_products?.company?.country}</td>
                                    </tr>
                                    <tr>
                                        <td className="">Seller's Tracker</td>
                                        <td className="">:</td>
                                        <td className="">{data.trackingSeller}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </PrimaryWrapper>
                </div>
                
            </div>

            {/* shipment info */}
            <PrimaryWrapper>
                <div className="p-4">
                    <div className="p-2 text-md uppercase border-b text-center">
                        Buyer's Shipment Info
                    </div>
                    <div className="lg:flex lg:justify-around mt-4">
                        <div className="w-full lg:w-4/12 border p-2 mb-4">
                            <div className="text-center">
                                Courier
                            </div>
                            <div className="text-center text-sm">{data.courier ? data.courier : 'No Data'}</div>
                        </div>
                        <div className="w-full lg:w-4/12 border p-2 mb-4 lg:mx-4">
                            <div className="text-center">
                                Receiver
                            </div>
                            <div className="text-center text-sm">{data.fullnameReceiving ? data.fullnameReceiving : 'No Data'}</div>
                        </div>
                        <div className="w-full lg:w-4/12 border p-2 mb-4">
                            <div className="text-center">
                                Account Information
                            </div>
                            <div className="text-center text-sm">{data.AccountInformation ? data.AccountInformation : 'No Data'}</div>
                        </div>
                    </div>
                    <div className="">
                        <div className="text-center">
                            Buyer's Address
                        </div>
                        <div className="text-center text-sm">{data.addressBuyer ? data.addressBuyer : 'No Data'}</div>
                    </div>
                </div>
            </PrimaryWrapper>

            {/* product images */}
            <PrimaryWrapper>
                <div className="w-full">
                    <div className="px-3 mb-6 md:mb-0 text-center">
                        <div className="p-24 border mx-2 my-4">product image</div>
                    </div>
                </div>
                <div className="text-center">
                    <p>Product Description</p>
                </div>
                <div className="text-center mb-10">
                    <p>{data.companies_products?.Description}</p>
                </div>
                {/*  table component */}
                <div className="overflow-x-auto mb-5 flex justify-center">
                    <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Manufacturer Part Number
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Manufacturer
                                </th>   
                                <th scope="col" className="text-center px-6 py-3">
                                    Available Quantity
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    MOQ
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Country
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Packaging
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Category
                                </th>
                                <th scope="col" className="text-center px-6 py-3 w-28">
                                    Sub-Category
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white hover:bg-gray-50">
                                <td scope="row" className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.ManufacturerNumber}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.Manufacture}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.AvailableQuantity}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.moq}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.country}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.packaging}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.subcategory?.name}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.subcategory?.category?.name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* table order information */}
                <div className="overflow-x-auto mb-10 flex justify-center">
                    <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                        <thead className="text-xs text-white uppercase bg-blue-500">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3">
                                    Order Quantity
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Date Code
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Seller Price (per item) / Total
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Exepart Price (per item) / Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white hover:bg-gray-50">
                                <td className="text-center text-sm px-6 py-4">
                                    {data.qty}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    {data.companies_products?.dateCode}
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    ${data.price} / ${parseFloat(data.price) * parseInt(data.qty) }
                                </td>
                                <td className="text-center text-sm px-6 py-4">
                                    ${data.price_profite} / ${parseFloat(data.price_profite) * parseInt(data.qty) }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {data.price_profite &&
                    <div className="text-center mb-10 w-1/2 mx-auto">
                        <i className="text-light italic text-red-500">Note: Price is only for the product. The order type is Ex-works. The price you see on screen does not include logistical costs, customs, tax, insurance or any additional expenses that may occur.</i>
                    </div>
                }
            </PrimaryWrapper>

            {/* documents */}
            <PrimaryWrapper>
                <div className="p-2 text-md uppercase border-b text-center">
                    Documents
                </div>
                <div className="pb-4 mt-2 lg:flex lg:justify-center px-4">
                    <div className="mx-1 my-1">
                        <Link target="_blank" href={publicDir + "/uploads/proforma_doc/" + data.proforma_doc}>
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
                            Reject Payment
                        </WarningButton>
                    </div>
                    <div className="mx-1 my-1">
                        <WarningButton 
                            className="md:w-full sm:w-full" 
                            disabled={data.order_status_id == 9 ? false : true} 
                            size="sm"
                            onClick={() => setTrackerNumberForBuyerModal(true) }
                        >
                            Provide Tracking Information
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