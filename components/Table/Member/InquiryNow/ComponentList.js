import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import Pagination from "@/components/Shared/Component/Pagination";

export default function ComponentList(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    return (
        <>  
            <div className="relative">
                <div className="mb-0 px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="px-4">
                            <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }
                            >
                            Inquiry List
                            </h3>
                        </div>
                        <div className="px-4">
                            <Link href="/product/search">
                                <button className="relative bg-blueGray-700 p-2 text-white">
                                    <i className="mr-2 ml-1 fas fa-search text-white"></i>
                                    Search New Component</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order Quantity
                                </th>
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
                                    Date Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Packaging
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    *
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="text-sm px-6 py-4">
                                            {item.qty}
                                        </td>
                                        <td scope="row" className="text-sm px-6 py-4">
                                            {item.companies_products.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.Manufacture}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.AvailableQuantity}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.moq}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.dateCode}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.companies_products.packaging}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <button onClick={() => props.handleEdit(item.id, item.qty, item.companies_products.ManufacturerNumber)} className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">Edit</button>
                                                <button onClick={() => props.handleInquiryNow(item.id, item.qty, item.companies_products.ManufacturerNumber)} className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">Inquire Now</button>
                                                <button onClick={() => props.handleDelete(item.id)} className="font-medium text-blue-600 text-white bg-red-500 p-2">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-2">
                    <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                </div>
            </div>
            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}

            {/* <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            /> */}
        </>
    );
}