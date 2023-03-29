import React, {useState, useEffect} from "react";
import { getSession } from "next-auth/react";
import axios from "@/lib/axios";

// components

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
                                className="font-semibold text-xl text-white">
                                VERIFIED
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Order Inquired
                        </div>
                        <div className="m-2 p-2 bg-white border border-blue-500 text-sm text-center">
                            Information Verified
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Quoted for Approval
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Quote Approve / Rejected
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            PI sent for Payment
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Payment Verified
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Preparing for Shipment
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Order Shiped
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Order Accepted / Rejected
                        </div>
                        <div className="m-2 p-2 bg-white border text-sm text-center">
                            Order Complete
                        </div>
                    </div>
                </div>
                
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
                                                KDKCHY                                       
                                                <i title="Member Rejected" className="ml-2 fas fa-circle-xmark text-red-700"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Country</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">Afganistan</td>
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
                                                KDKCHY
                                                {/* {companyData.is_confirmed == "pending" && <i title="Member Pending" className="mr-2 ml-1 fas fa-clock text-orange-500"></i>}
                                                {companyData.is_confirmed == "accepted" && <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>}
                                                {companyData.is_confirmed == "rejected" && <i title="Member Rejected" className="mr-2 ml-1 fas fa-circle-xmark text-red-700"></i>} */}
                                                <i title="Member Accepted" className="mr-2 ml-1 fas fa-circle-check text-blue-700"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-28">Country</td>
                                            <td className="w-8">:</td>
                                            <td className="text-left">Afganistan</td>
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
                                        5000 (pcs)
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        12-23-33
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        10000 (pcs)
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        $1 / $5,000
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
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Accept Quotation
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Reject Quotation
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Send Payment Receipt
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Order Accepted
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Order Rejected
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
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Verify Inquiry
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Set Tracking
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
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Send Quotation
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Send PI
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Accept Payment
                        </button>
                        <button className="m-2 p-2 bg-orange-500 border text-lg text-center text-white">
                            Set Shipment Info
                        </button>

                    </div>
                </div>

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