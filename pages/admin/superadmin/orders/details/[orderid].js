import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// components

// layout for page
import Admin from "layouts/Admin.js";
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep";
import SendQuotationModal from "@/components/Modal/OrderComponent/Superadmin/SendQuotation"
import SendProformaInvoiceModal from "@/components/Modal/OrderComponent/Superadmin/SendProformaInvoice"
import AcceptPaymentDocumentModal from "@/components/Modal/OrderComponent/Superadmin/AcceptPaymentDocument"
import RejectPaymentDocumentModal from "@/components/Modal/OrderComponent/Superadmin/RejectPaymentDocument"
import TrackerNumberForBuyerModal from "@/components/Modal/OrderComponent/Superadmin/TrackerNumberForBuyer"
import CompleteOrderModal from "@/components/Modal/OrderComponent/Superadmin/CompleteOrder"
import { toast } from 'react-toastify';
import toastOptions from "@/lib/toastOptions"

export default function InquiryDetails({session, routeParam}) {
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
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadData()
    }, [])

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
        let inputData = {
            id: data.id,
            shipinfoforseller: shipinfoforseller
        }
        const response = await axios.post(`/admin/orders/UpdateComplatePayment`, inputData, 
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
    const handleCompleteOrderModal = async () => {
        setIsLoading(true)
        setErrorInfo({})

        let inputData = {
            id: data.id,
        }
        const response = await axios.post(`/admin/orders/UpdateCompletedOrder`, inputData, 
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

    return (
        <>
            <div className="relative bg-white">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                Order Detail
                            </h3>
                        </div>
                        <div className="px-4 flex-initial w-64">

                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 border-0 bg-blue-400">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl text-white uppercase">
                                {data.order_status?.name}
                            </h4>
                        </div>
                    </div>
                </div>
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
                <OrderStatusStep/>
                
                {/* Buyer Seller */}
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-around">
                        <div className="w-1/2 px-3 mb-6">
                            <div className="m-2 p-2 border text-sm text-center">
                                Buyer
                            </div>
                            <div className="m-2 p-2 text-sm">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-10">Company Name</td>
                                            <td className="w-2">:</td>
                                            <td className="text-left w-28">
                                                {data.buyer?.name}     
                                                {data.buyer?.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                                                {data.buyer?.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                                                {data.buyer?.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}                                  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Country</td>
                                            <td className="w-2">:</td>
                                            <td className="text-left">{data.buyer?.country}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Shipment info</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.shipinfobuyer}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Buyer's Tracker</td>
                                            <td className="w-2">:</td>
                                            <td className="text-left">{data.trackingBuyer}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-6">
                            <div className="m-2 p-2 border text-sm text-center">
                                Seller
                            </div>
                            <div className="m-2 p-2 text-sm">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-10">Company Name</td>
                                            <td className="w-2">:</td>
                                            <td className="text-left w-28">
                                                {data.companies_products?.company?.name}
                                                {data.companies_products?.company?.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                                                {data.companies_products?.company?.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                                                {data.companies_products?.company?.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Country</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.companies_products?.company?.country}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Shipment info</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.shipinfoforseller}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Seller's Tracker</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.trackingSeller}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        <div className="px-3 mb-5">
                            <div className="p-24 border mx-2 my-4">{"component image"}</div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                       {data.companies_products?.Description}
                    </div>
                    {/*  table A */}
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
                                        Avaliable Quantity
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
                    {/* table B */}
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
                </div>

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Documents
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">

                        {data.proforma_doc ? 
                            <Link target="_blank" href={publicDir + "/uploads/proforma_doc/" + data.proforma_doc}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Proforma Invoice
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Proforma Invoice
                            </button>
                        }
                        {data.Payment_doc ? 
                            <Link target="_blank" href={publicDir + "/uploads/Payment_doc/" + data.Payment_doc}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Payment Receipt
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Payment Receipt
                            </button>
                        }                
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Exepart
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        {data.order_status_id == 2 ?
                            <button onClick={() => setSendQuotationModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Quotation
                            </button>
                            : <button disabled onClick={() => setSendQuotationModal(true) } className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Quotation
                            </button>
                        }

                        {data.order_status_id == 5 ?
                            <button onClick={() => setSendProformaInvoiceModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Proforma Invoice
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Proforma Invoice
                            </button>
                        }

                        {data.order_status_id == 7 ?
                            <button onClick={() => setAcceptPaymentDocumentModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Accept Payment
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Accept Payment
                            </button>
                        }

                        {data.order_status_id == 7 ?
                            <button onClick={() => setRejectPaymentDocumentModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Reject Payment
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Reject Payment
                            </button>
                        }

                        {data.order_status_id == 9 ?
                            <button onClick={() => setTrackerNumberForBuyerModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                               Set Tracker for Buyer
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                               Set Tracker for Buyer
                            </button>
                        }

                        {data.order_status_id == 12 ?
                            <button onClick={() => setCompleteOrderModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                               Complete Order
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                               Complete Order
                            </button>
                        }

                        {/* {data.order_status_id != 13 &&
                            <button onClick={() => setCancelOrderModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Cancel Order
                            </button>
                        } */}

                    </div>
                </div>

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
                    />
                }

                {/* {cancelOrderModal &&
                    <CancelOrderModal
                        isLoading={isLoading}
                        closeModal={() => setCancelOrderModal(false)}
                        acceptance={handleCancelOrderModal}
                    />
                } */}

            </div>
        </>
      );
    }
    
InquiryDetails.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session,
            routeParam: context.query
        }
    }
}