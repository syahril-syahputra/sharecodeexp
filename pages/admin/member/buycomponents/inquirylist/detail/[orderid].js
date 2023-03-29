import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep"
import AcceptQuotationModal from "@/components/Modal/OrderComponent/Buyer/AcceptQuotation"
import RejectQuotationModal from "@/components/Modal/OrderComponent/Buyer/RejectQuotation"
import SendPaymentDocsModal from "@/components/Modal/OrderComponent/Buyer/SendPaymentDocs"
import AcceptOrderModal from "@/components/Modal/OrderComponent/Buyer/AcceptOrder"
import RejectOrderModal from "@/components/Modal/OrderComponent/Buyer/RejectOrder"

// layout for page
import Admin from "layouts/Admin.js";


export default function InquiryDetails({session}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const loadData = async (page=1) =>{
        setIsLoading(true)
        // const response = await axios.get(`/cartlist?page=${page}`,
        //     {
        //     headers: {
        //         "Authorization" : `Bearer ${session.accessToken}`
        //     }
        //     })
        //     .then((response) => {
        //         // console.log(response)
        //         let result = response.data.data
        //         setData(result.data)
        //     }).catch((error) => {
        //         // console.log(error.response)
        //     }).finally(() => {
        //         setIsLoading(false)
        //     })
    }
    useEffect(() => {
        loadData()
    }, [])

    const [acceptQuotationModal, setAcceptQuotationModal] = useState(false)
    const acceptQuotationModalHandle = (value) => {
        setAcceptQuotationModal(value)
    }

    const [rejectQuotationModal, setRejectQuotationModal] = useState(false)
    const rejectQuotationModalHandle = (value) => {
        setRejectQuotationModal(value)
    }

    const [sendPaymentDocsModal, setSendPaymentDocsModal] = useState(false)
    const sendPaymentDocsModalHandle = (value) => {
        setSendPaymentDocsModal(value)
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
                                className="font-semibold text-xl text-white">
                                VERIFIED
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
                                        5000 (pcs)
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        12-23-33
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        10000 (pcs)
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        $2 / $10,000
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
                        <button className="m-2 p-2 bg-indigo-900 border text-lg text-center text-white">
                            Proforma Invoice
                        </button>
                        <button className="m-2 p-2 bg-indigo-900 border text-lg text-center text-white">
                            Payment Receipt
                        </button>
                        <button className="m-2 p-2 bg-indigo-900 border text-lg text-center text-white">
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
                        <button onClick={()=> setAcceptQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Accept Quotation
                        </button>
                        <button onClick={()=> setRejectQuotationModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Reject Quotation
                        </button>
                        <button onClick={()=> setSendPaymentDocsModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Send Payment Receipt
                        </button>
                        <button onClick={()=> setAcceptOrderModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Accept Order
                        </button>
                        <button onClick={()=> setRejectOrderModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Reject Order
                        </button>
                    </div>
                </div>

                {acceptQuotationModal && 
                    <AcceptQuotationModal
                        closeModal={() => setAcceptQuotationModal(false)}
                        acceptance={acceptQuotationModalHandle}
                    />
                }

                {rejectQuotationModal && 
                    <RejectQuotationModal
                        closeModal={() => setRejectQuotationModal(false)}
                        acceptance={rejectQuotationModalHandle}
                    />
                }

                {sendPaymentDocsModal && 
                    <SendPaymentDocsModal
                        closeModal={() => setSendPaymentDocsModal(false)}
                        acceptance={sendPaymentDocsModalHandle}
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
            session: session
        }
    }
}