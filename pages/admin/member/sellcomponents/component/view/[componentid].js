import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// components
import ComponentStatus from "@/components/Shared/Component/Statuses";

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct({session, routeParam}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(`/companyproduct?id=${routeParam.componentid}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
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
        getData()
    }, [])
    return (
        <>
            <div className="relative shadow">
                <div className="mb-0 px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="px-4">
                            <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }
                            >
                            Company Product 
                            </h3>
                        </div>
                        <div className="px-4 mt-2">
                            {!!routeParam.componentid && 
                                <Link href={`/admin/member/sellcomponents/component/edit/${routeParam.componentid}`}>
                                    <button className="relative bg-orange-500 p-2 text-white">
                                        <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                                        Edit Product
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>


                <div className="">
                    <div className="flex flex-wrap w-full bg-white">
                        <div className="px-3 mb-6 md:mb-0 text-center">
                            <div className="p-24 border mx-2 my-4">{routeParam.componentid}</div>
                        </div>
                    </div>
                    
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 bg-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer Part Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Available Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        MOQ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date Code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub-Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Packaging
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="text-sm px-6 py-4">
                                        {data.ManufacturerNumber}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.Manufacture}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.AvailableQuantity}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.moq}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.country}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.Description}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.dateCode}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.category}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.subcategory}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {data.packaging}
                                    </td>
                                    <td className="text-sm px-6 py-4 text-center">
                                        <ComponentStatus status={data.status} title={`stock status ${data.status}`} label={data.status}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

MyProduct.layout = Admin;

export async function getServerSideProps(context) {
const session = await getSession(context)
    return {
        props: {
            session: session,
            routeParam: context.query
        }
    }
}
