import React, {useEffect, useState} from "react";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


// components

// layout for page
import Admin from "layouts/Admin.js";

export default function AddCart() {
    const router = useRouter()
    const { manufacturerNumber } = router.query
    const session = useSession()
    const [user, setUser] = useState({
        accessToken: ''
    })
    useEffect(() => { setUser({accessToken: session.data?.accessToken}) }, [session])

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const searchData = async () =>{
        if(!!user.accessToken && manufacturerNumber){
            setIsLoading(true)
            const response = await axios.get(`/product/${manufacturerNumber}`,
            {
                headers: {
                "Authorization" : `Bearer ${user.accessToken}`
                }
            })
            .then((response) => {
                let result = response.data.data
                console.log(result)
                setData(result)
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        searchData()
    }, [manufacturerNumber])

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
                    Add Into Cart
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
            <div className="flex flex-wrap bg-white mb-2 pt-5">
                <div className="md:w-25 px-3 mb-6 ">
                <div className="p-24 border">{manufacturerNumber}</div>
                </div>
                <div className="md:w-25 px-3 mb-6 ">
                <button className="bg-blueGray-700 p-2 text-white">
                    <i className="mr-2 ml-1 fas fa-cart-shopping text-white"></i>
                    Add to Cart</button>
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
                            <th scope="col" className="px-6 py-3 text-center">
                                Status
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
                            <td className="px-6 py-4">
                                {data.status}
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

AddCart.layout = Admin;
