import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep"
import AcceptQuotationModal from "@/components/Modal/OrderComponent/Buyer/AcceptQuotation"
import RejectQuotationModal from "@/components/Modal/OrderComponent/Buyer/RejectQuotation"
import SendPaymentDocsModal from "@/components/Modal/OrderComponent/Buyer/SendPaymentDocs"
import SendUpdatedPaymentDocsModal from "@/components/Modal/OrderComponent/Buyer/SendUpdatedPaymentDocs"
import AcceptOrderModal from "@/components/Modal/OrderComponent/Buyer/AcceptOrder"
import RejectOrderModal from "@/components/Modal/OrderComponent/Buyer/RejectOrder"
import { toast } from 'react-toastify';
import toastOptions from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";


export default function InquiryDetails({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/buyer/${routeParam.orderid}/data`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                console.log(response)
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

    const [acceptQuotationModal, setAcceptQuotationModal] = useState(false)
    const acceptQuotationModalHandle = async () => {

        setIsLoading(true)
        const response = await axios.post(`/buyer/AcceptOrder`, 
            {
              id:  data.id
            },
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then(() => {
                toast.success("Quotation has been accepted", toastOptions)
                setAcceptQuotationModal(false)
                loadData()
            }).catch((error) => {
                console.log(error)
                toast.error("Something went wrong", toastOptions)
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })


    }

    const [rejectionReason, setRejectionReasons] = useState([])
    const loadRejectionReason = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/reason`)
            .then((response) => {
                let result = response.data
                setRejectionReasons(result.data)
            }).catch((error) => {
                console.log(error)
                toast.error("Failed to load rejcetion reason", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        loadRejectionReason()
    }, [])
    const [rejectQuotationModal, setRejectQuotationModal] = useState(false)
    const rejectQuotationModalHandle = async (value) => {
        console.log(value)
        setIsLoading(true)
        const response = await axios.post(`/buyer/RejectOrder`, 
        {
            id:  data.id,
            reason: value
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Quotation has been rejected", toastOptions)
            setRejectQuotationModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [sendPaymentDocsModal, setSendPaymentDocsModal] = useState(false)
    const sendPaymentDocsModalHandle = async (shipment, paymentDocs) => {
        let formData = new FormData();
        formData.append("Payment_doc", paymentDocs);
        formData.append("shipinfobuyer", shipment);
        formData.append("id", data.id)
        setIsLoading(true)
        const response = await axios.post(`/buyer/SendPayment`, 
            formData,
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Payment has been sent", toastOptions)
            setSendPaymentDocsModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            setErrorInfo(error.data.data)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [sendUpdatedPaymentDocsModal, setSendUpdatedPaymentDocsModal] = useState(false)
    const sendUpdatedPaymentDocsModalHandle = async (shipment, paymentDocs) => {
        let formData = new FormData();
        formData.append("Payment_doc", paymentDocs);
        formData.append("shipinfobuyer", shipment);
        formData.append("id", data.id)
        setIsLoading(true)
        const response = await axios.post(`/buyer/SendPayment?update=1`, 
            formData,
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Payment has been updated", toastOptions)
            setSendUpdatedPaymentDocsModal(false)
            loadData()
        }).catch((error) => {
            console.log(error)
            setErrorInfo(error.data.data)
            toast.error("Something went wrong", toastOptions)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const [acceptOrderModal, setAcceptOrderModal] = useState(false)
    const acceptOrderModalHandle = (value) => {
        setAcceptOrderModal(value)
    }

    const [rejectOrderModal, setRejectOrderModal] = useState(false)
    const rejectOrderModalHandle = (value) => {
        setRejectOrderModal(value)
    }

    return (
        <>
            <div className="relative bg-white">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                My Inquiry : Order Detail
                            </h3>
                        </div>
                        <div className="px-4 flex-initial w-64">

                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 border-0 bg-blue-500">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold uppercase text-xl text-white">
                                {data.order_status?.name}
                            </h4>
                        </div>
                    </div>
                </div>
                
                <OrderStatusStep/>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        <div className="px-3 mb-5">
                            <div className="p-24 border mx-2 my-4">{"component image"}</div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                       This is components description
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
                                    <th scope="col" className="text-center px-6 py-3 w-28">
                                        MOQ
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3 w-28">
                                        Country
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3 w-28">
                                        Packaging
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white hover:bg-gray-50">
                                    <td scope="row" className="text-center text-sm px-6 py-4">
                                        ABC1123
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        DOHA
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        100
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        Afganistan
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        Tube
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
                                        Avaliable Quantity
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Price (per item) / Total
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
                                        {data.companies_products?.AvailableQuantity}
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        ${data.price_profite} / ${parseFloat(data.price_profite) * parseFloat(data.qty)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-slate-200 mb-5">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Tracker Number : 22309AP00
                            </h4>
                        </div>
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
                        <button className="m-2 p-2 bg-indigo-900 border text-center text-white">
                            Shipment Info
                        </button>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Actions (Buyer)
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">

                        {data.order_status_id == 3 ?
                            <button onClick={()=> setAcceptQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Accept Quotation
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Accept Quotation
                            </button>
                        }

                        {data.order_status_id == 3 ?
                            <button onClick={()=> setRejectQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Reject Quotation
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Reject Quotation
                            </button>
                        }
                        
                        {data.order_status_id == 6?
                            <button onClick={()=> setSendPaymentDocsModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Payment Receipt
                            </button>
                            :
                            <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Payment Receipt
                            </button>
                        }
                        {data.order_status_id == 15 &&
                            <button onClick={()=> setSendUpdatedPaymentDocsModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Update Payment Receipt
                            </button>
                        }
                        <button onClick={()=> setAcceptOrderModal(true)} className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                            Accept Order
                        </button>
                        <button onClick={()=> setRejectOrderModal(true)} className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                            Reject Order
                        </button>
                    </div>
                </div>

                {acceptQuotationModal && 
                    <AcceptQuotationModal
                        isLoading={isLoading}
                        closeModal={() => setAcceptQuotationModal(false)}
                        acceptance={acceptQuotationModalHandle}
                    />
                }

                {rejectQuotationModal && 
                    <RejectQuotationModal
                        isLoading={isLoading}
                        rejectionReason={rejectionReason}
                        closeModal={() => setRejectQuotationModal(false)}
                        acceptance={rejectQuotationModalHandle}
                        errorInfo={errorInfo}
                    />
                }

                {sendPaymentDocsModal && 
                    <SendPaymentDocsModal
                        isLoading={isLoading}
                        closeModal={() => setSendPaymentDocsModal(false)}
                        acceptance={sendPaymentDocsModalHandle}
                        errorInfo={errorInfo}
                    />
                }

                {sendUpdatedPaymentDocsModal && 
                    <SendUpdatedPaymentDocsModal
                        isLoading={isLoading}
                        closeModal={() => setSendUpdatedPaymentDocsModal(false)}
                        acceptance={sendUpdatedPaymentDocsModalHandle}
                        errorInfo={errorInfo}
                    />
                }

                {acceptOrderModal && 
                    <AcceptOrderModal
                        closeModal={() => setAcceptOrderModal(false)}
                        acceptance={acceptOrderModalHandle}
                    />
                }

                {rejectOrderModal && 
                    <RejectOrderModal
                        closeModal={() => setRejectOrderModal(false)}
                        acceptance={rejectOrderModalHandle}
                    />
                }
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
            routeParam: context.query,
        }
    }
}