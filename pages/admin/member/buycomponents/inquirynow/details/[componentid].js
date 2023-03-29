import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

export default function AddToInquiryList({session, routeParam}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const getData = async () =>{
        setIsLoading(true)
        const response = await axios.get(`/product/${routeParam.componentid}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setData(result)
                setOrderQuantity(result.moq)
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const [orderQuantity, setOrderQuantity] = useState(0)
    
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
                            Add To Cart
                            </h3>
                        </div>
                        {/* <div className="px-4 mt-2">
                            {!!manufacturerNumber && 
                                <Link href={`/admin/product/myproduct/edit/${manufacturerNumber}`} className="relative bg-orange-500 p-2 text-white">
                                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                                    Edit Product</Link>
                            }
                        </div> */}
                    </div>
                </div>


                <div className="">
                    <div className="flex flex-wrap w-full bg-white">
                        <div className="px-3 mb-6 md:mb-0 text-center">
                            <div className="p-24 border mx-2 my-4">{data.ManufacturerNumber}</div>
                        </div>
                        <div className="md:w-25 mt-5">
                            <div>
                                <InputForm
                                    label="QTY(s)"
                                    // inputDataName="ManufacturerNumber"
                                    value={orderQuantity}
                                    // setData={setDataHandler}
                                    // errorMsg={errorInfo.ManufacturerNumber}
                                    inpuptType="number"
                                />
                            </div>
                            <div className="mt-5">
                                <button className="bg-blueGray-700 p-2 text-white">
                                    <i className="mr-2 ml-1 fas fa-cart-shopping text-white"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 bg-white">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Country
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Available Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        MOQ
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Manufacturer Number
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Manufacture
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Package
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Packaging
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Date Code
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {data.country}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.moq}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.ManufacturerNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.Manufacture}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.package}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.packaging}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.Description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.dateCode}
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

AddToInquiryList.layout = Admin;

export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session: session,
            routeParam: context.query,
        }
    }
}