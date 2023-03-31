import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep"
import { toast } from 'react-toastify';
import toastOptions from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";
import VerifyInquiryModal from "@/components/Modal/OrderComponent/Seller/VerifyInquiry"
import SendTrackerModal from "@/components/Modal/OrderComponent/Seller/SendTracker"

export default function InquiryDetails({session, routeParam}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const loadData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/seller/${routeParam.orderid}/data`,
            {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
            })
            .then((response) => {
                // console.log(response)
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
    const [verifyInquiryModal, setVerifyInquiryModal] = useState(false)
    const verifyInquiryModalHandle = async (inputData) => {
        console.log(inputData)
        // setVerifyInquiryModal(value)
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/seller/UpdateToVerified`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been verified", toastOptions)
            setVerifyInquiryModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [sendTrackerModal, setSendTrackerModal] = useState(false)
    const sendTrackerModalHandle = (value) => {
        setSendTrackerModal(value)
    }

    return (
        <>
            <div className="relative bg-white">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                                className="font-semibold text-lg text-blueGray-700">
                                Incoming Inquiry : Order Detail
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
                                        {data.companies_products?.ManufacturerNumber}
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        {data.companies_products?.Manufacture}
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
                                        ${data.price} / ${parseFloat(data.price) * parseInt(data.qty)}
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
                                Actions (Seller)
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        {data.order_status_id == 1 ?
                            <button onClick={()=> setVerifyInquiryModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Verify Inquiry
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Verify Inquiry
                            </button>
                        }

                        {data.order_status_id == 8 ?
                            <button onClick={()=> setSendTrackerModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Tracker Information
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Tracker Information
                            </button>
                        }
                    </div>
                </div>

                {verifyInquiryModal && 
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
                }

                {sendTrackerModal && 
                    <SendTrackerModal
                        closeModal={() => setSendTrackerModal(false)}
                        acceptance={sendTrackerModalHandle}
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
            routeParam: context.query
        }
    }
}