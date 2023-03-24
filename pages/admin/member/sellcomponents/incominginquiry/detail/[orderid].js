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
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-center">
                        <div className="px-3 mb-5">
                            <div className="p-24 border mx-2 my-4">{123}</div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                        Sample Text
                    </div>
                    {/*  table A */}
                    <div className="overflow-x-auto mb-5 flex justify-center">
                        <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Manufacturer Part Number
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Manufacturer
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Available Quantity
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        MOQ
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Country
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white hover:bg-gray-50">
                                    <td scope="row" className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* table B */}
                    <div className="overflow-x-auto mb-10 flex justify-center">
                        <table className="w-50 text-sm text-left text-gray-500 bg-white border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Date Code
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Packaging
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white hover:bg-gray-50">
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
                                    </td>
                                    <td className="text-center text-sm px-6 py-4">
                                        1
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
                                Tracker Number : 123
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