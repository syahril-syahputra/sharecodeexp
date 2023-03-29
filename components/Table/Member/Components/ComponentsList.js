import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ComponentStatus from "@/components/Shared/Component/Statuses";

export default function TableProduct(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    const setPaginationLabel = (item, index) => {
        if(item.label === "&laquo; Previous") {
            return (
                <button 
                    disabled={!metaData.prevPage}
                    onClick={() => props.setPage(metaData.currentPage - 1)}
                    key={index} 
                    className={`
                        ${!metaData.prevPage ? 'border border-solid border-blueGray-400' : 'border border-solid border-blueGray-500 text-blueGray-700'}
                        text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
                >
                    <i className={`${!metaData.prevPage ? 'text-blueGray-400' : 'text-blueGray-700'} fas fa-angle-left my-auto mx-10 fa-xl`}></i>
                </button>
            )
        }

        if(item.label === "Next &raquo;") {
                return (
                    <button 
                        disabled={!metaData.nextPage}
                        onClick={() => props.setPage(metaData.currentPage + 1)}
                        key={index} 
                        className={`
                            ${!metaData.nextPage ? 'border border-solid border-blueGray-400' : 'border border-solid border-blueGray-500 text-blueGray-700'}
                            text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
                    >
                        <i className={`${!metaData.nextPage ? 'text-blueGray-400' : 'text-blueGray-700'} fas fa-angle-right my-auto mx-10 fa-xl`}></i>
                    </button>
                )
            }

        return(
            <button 
                onClick={() => props.setPage(item.label)}
                key={index} 
                className={`${item.active ? 'bg-blueGray-700 text-white' : 'border border-solid border-blueGray-500 text-blueGray-700'} text-xs font-semibold flex w-8 h-8 mx-1 p-0 items-center justify-center leading-tight relative`}
            >
                {item.label}
            </button>
        )
    }
    return (
        <>  
            <div className="relative">
                <div className="px-4 py-3 border-0 bg-white">
                    <div className="flex justify-between">
                        <div className="">
                            <h3
                            className={
                                "font-semibold text-lg text-blueGray-700"
                            }
                            >
                            {props.title}
                            </h3>
                        </div>
                        
                        <div className="px-4">
                            <Link href="/admin/member/sellcomponents/component/pending">
                                <button
                                    className="m-1 relative bg-orange-500 p-2 text-white"
                                >
                                    <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                                    Pending Product
                                </button>
                            </Link>
                            <Link href="/admin/member/sellcomponents/component/rejected">
                                <button
                                     className="m-1 relative bg-red-500 p-2 text-white"
                                >
                                    <i className="mr-2 ml-1 fas fa-times text-white"></i>
                                    Rejected Product
                                </button>
                            </Link>
                            <Link href="/admin/member/sellcomponents/component/add">
                                <button
                                     className="m-1 relative bg-blueGray-700 p-2 text-white"
                                >
                                    <i className="mr-2 ml-1 fas fa-plus text-white"></i>
                                    Add Product
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto ">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
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
                                    Packaging
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    *
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="text-sm px-6 py-4">
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.Manufacture}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.AvailableQuantity}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.moq}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.country}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.Description}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.dateCode}
                                        </td>
                                        <td className="text-sm px-6 py-4">
                                            {item.packaging}
                                        </td>
                                        <td className="text-sm px-6 py-4 text-center">
                                            <ComponentStatus status={item.status} title={`stock status ${item.status}`} label={item.status}/>
                                        </td>
                                        <td className="text-sm px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <Link 
                                                    href={`/admin/member/sellcomponents/component/view/${item.id}`}
                                                    className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">View</Link>
                                                {/* <button className="font-medium text-blue-600 text-white bg-red-400 p-2">Delete</button> */}
                                            </div>
                                            {/* <button onClick={() => inquiryItem(item)} className="font-medium text-blue-600 text-white bg-blueGray-700 p-2">Inquiry</button> */}
                                        </td>
                                    </tr>
                                )
                            })}
                            {!props.isLoading && metaData.total === 0 && <>
                                <tr className='text-center my-auto mt-10 text-lg p-5'>
                                    <td colSpan={11} className="p-5 italic ">
                                        You have no data to show
                                    </td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                    {metaData.total > 0 ? 
                        <div className="mt-2">
                            <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                        </div>
                    : null}
                </div>
            </div>
            {props.isLoading &&<div>
                <div className='text-center my-auto mt-10'>
                    <i className="fas fa-circle-notch fa-spin text-blueGray-700 my-auto mx-10 fa-2xl"></i>
                </div>
            </div>}
            

            <div className="flex justify-center mt-10 mx-auto justify-center">
                {links.map((item, index) => {
                    return setPaginationLabel(item, index)
                })}
            </div>
        </>
    );
}