import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";
// components
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep"
import OrderTodo from "@/components/Shared/Order/OrderTodo"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"

// layout for page
import Admin from "layouts/Admin.js";
import VerifyInquiryModal from "@/components/Modal/OrderComponent/Seller/VerifyInquiry"
import EditVerifiedOrderModal from "@/components/Modal/OrderComponent/Seller/EditVerifiedOrder"
import SendTrackerModal from "@/components/Modal/OrderComponent/Seller/SendTracker"

export default function InquiryDetails({session, routeParam}) {
    const publicDir = process.env.NEXT_PUBLIC_DIR
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
        const request = await axios.get(`/seller/notification/${order_status_id}`, 
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
    const [verifyInquiryModal, setVerifyInquiryModal] = useState(false)
    const verifyInquiryModalHandle = async (inputData) => {
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

    const [editVerifiedOrderModal, setEditVerifiedOrderModal] = useState(false)
    const editVerifiedOrderModalHandle = async (inputData) => {
        setIsLoading(true)
        setErrorInfo({})
        const response = await axios.post(`/seller/EditWrongVerify`, inputData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Order has been verified", toastOptions)
            setEditVerifiedOrderModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
            setIsLoading(false)
        })
    }

    const [sendTrackerModal, setSendTrackerModal] = useState(false)
    const sendTrackerModalHandle = async (sellerTracker, paymentAccount) => {
        setIsLoading(true)
        setErrorInfo({})

        let formData = new FormData();
        formData.append("PaymentDocSeller", paymentAccount);
        formData.append("trackingSeller", sellerTracker);
        formData.append("id", data.id)  
        const response = await axios.post(`/seller/UpdateToPreparingShipment`, formData, 
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Tracker has been set", toastOptions)
            setSendTrackerModal(false)
            loadData()
        }).catch((error) => {
            toast.error("Something went wrong", toastOptions)
            setErrorInfo(error.data.data)
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
                <OrderTodo action={todoValue}/>
                
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
                    <div className="overflow-x-auto mb-5 flex justify-center">
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
                                        ${data.price} / ${parseFloat(data.price) * parseInt(data.qty)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {data.price &&
                        <div className="text-center mb-10 w-1/2 mx-auto">
                            <i className="text-light italic text-red-500">Note: Price is only for the product. The order type is Ex-works. The price you see on screen does not include logistical costs, customs, tax, insurance or any additional expenses that may occur.</i>
                        </div>
                    }
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
                        {data.shipinfoforseller ? 
                            <Link target="_blank" href={publicDir + "/uploads/shipinfoforseller/" + data.shipinfoforseller}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Shipment Info
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Shipment Info
                            </button>
                        }  

                        {data.PaymentDocSeller ? 
                            <Link target="_blank" href={publicDir + "/PaymentDocSeller/" + data.PaymentDocSeller}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Seller's Payment Account
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Seller's Payment Account
                            </button>
                        } 

                        {data.PaymentProof ? 
                            <Link target="_blank" href={publicDir + "/PaymentProof/" + data.PaymentProof}>
                                <button className="m-2 py-2 px-4 bg-indigo-900 text-white hover:bg-indigo-800 hover:shadow-lg transition duration-300 ease-in-out">
                                    Seller's Invoice
                                </button>
                            </Link>
                            : 
                            <button disabled className="m-2 py-2 px-4 bg-indigo-400 text-white">
                                Seller's Invoice
                            </button>
                        } 
                                
                    </div>
                </div>

                {data.shipinfoforseller && 
                <>
                    <div className="px-4 py-3 border-0 bg-slate-200 mb-5">
                        <div className="flex justify-center">
                            <div className=" text-center">
                                <h4
                                    className="font-semibold text-xl">
                                    Shipment Info
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-0 bg-white">
                        <div className="flex justify-center">
                            <div className="px-3 mb-5">
                                <div className="py-10 px-20 border mx-2 my-4">
                                {data.shipinfoforseller}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }

                {data.trackingSeller && 
                <div className="px-4 py-3 border-0 bg-slate-200 mb-5">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Tracker Number : {data.trackingSeller}
                            </h4>
                        </div>
                    </div>
                </div>
                }

                <div className="px-4 py-3 border-0 bg-slate-200">
                    <div className="flex justify-center">
                        <div className=" text-center">
                            <h4
                                className="font-semibold text-xl">
                                Actions
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        {data.order_status_id == 1 ?
                            <button onClick={()=> setVerifyInquiryModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Edit & Verify
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Edit & Verify
                            </button>
                        }

                        {data.order_status_id == 2 ?
                            <button onClick={()=> setEditVerifiedOrderModal(true)} className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Edit Verified Order
                            </button>
                            : <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Edit Verified Order
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

                {editVerifiedOrderModal && 
                    <EditVerifiedOrderModal
                        isLoading={isLoading}
                        orderId={data.id}
                        orderQty={data.qty}
                        availableQty={data.companies_products?.AvailableQuantity}
                        moq={data.companies_products?.moq}
                        price={data.price}
                        dateCode={data.companies_products?.dateCode}
                        closeModal={() => setEditVerifiedOrderModal(false)}
                        acceptance={editVerifiedOrderModalHandle}                        
                        errorInfo={errorInfo}
                    />
                }

                {sendTrackerModal && 
                    <SendTrackerModal
                        isLoading={isLoading}
                        closeModal={() => setSendTrackerModal(false)}
                        acceptance={sendTrackerModalHandle}
                        errorInfo={errorInfo}
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