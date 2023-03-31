import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";
import Link from "next/link";

// components

// layout for page
import Admin from "layouts/Admin.js";
import OrderStatusStep from "@/components/Shared/Order/OrderStatusStep";
import SendQuotationModal from "@/components/Modal/OrderComponent/Superadmin/SendQuotation"
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
                console.log(result)
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
                <OrderStatusStep/>
                
                {/* Buyer Seller */}
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-around">
                        <div className="w-1/2 px-3 mb-6">
                            <div className="m-2 p-2 border text-sm text-center">
                                Buyer
                            </div>
                            <div className="m-2 p-2 text-sm">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-28">Company Name</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left w-28">
                                                {data.buyer?.name}     
                                                {data.buyer?.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                                                {data.buyer?.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                                                {data.buyer?.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>}                                  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Country</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.buyer?.country}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Shipment info</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">{data.shipinfobuyer}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Tracking Buyer</td>
                                            <td className="w-8">:</td>
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
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-28">Company Name</td>
                                            <td className="w-8">:</td>
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
                                            <td className="w-28">Tracking Seller</td>
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
                                        {data.companies_products?.AvailableQuantity}
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
                            <button onClick={() => setSendQuotationModal(true) } className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                                Send Proforma Invoice
                            </button>
                            : <button disabled onClick={() => setSendQuotationModal(true) } className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                                Send Proforma Invoice
                            </button>
                        }

                        <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                            Accept Payment
                        </button>
                        <button disabled className="m-2 p-2 bg-orange-200 border text-lg text-center text-white">
                            Set Shipment Info
                        </button>

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