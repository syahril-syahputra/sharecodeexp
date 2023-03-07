import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// components
import InputForm from "@/components/Shared/InputForm";

// layout for page
import Admin from "layouts/Admin.js";

export default function MyProduct() {
    const router = useRouter()
    // const [manufacturerNumber, setManufacturerNumber] = useState(router.query.manufacturerNumber)
    const session = useSession()
    const [user, setUser] = useState({
        accessToken: ''
    })
    useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

    //data search
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const getData = async () =>{
        if(!!user.accessToken){
        setIsLoading(true)
        console.log(router.query.manufacturerNumber)
        const response = await axios.get(`/companyproduct/${router.query.manufacturerNumber}`,
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            }
            )
            .then((response) => {
                console.log(response)
                let result = response.data.data
                setData(result)
                console.log(result)
            }).catch((error) => {
                console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }
    useEffect(() => {
        getData()
    }, [user])
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
                        {/* <div className="px-4 mt-2">
                            <Link href="/admin/product/myproduct/add" className="relative bg-blueGray-700 p-2 text-white">
                                <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                                Add Product</Link>
                        </div> */}
                    </div>
                </div>


                <div className="">
                    <div className="flex mb-6 bg-white">
                        <div className="w-25 px-3 mb-6 md:mb-0">
                            <div className="p-24 border mx-2 my-4">{router.query.manufacturerNumber}</div>
                        </div>
                        <div className="w-75 px-3 mb-6 md:mb-0">
                            <div className="p-5 border mx-2 my-4">
                                <div className="mb-5 ">
                                <div className="overflow-x-auto shadow">
                                    <table className={`text-sm text-left text-gray-500 shadow-md`}>
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
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Date Code
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="text-xs text-gray-700 uppercase bg-white">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

MyProduct.layout = Admin;
