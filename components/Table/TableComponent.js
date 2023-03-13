import React, {useEffect, useState} from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

//comp
import NeedLoginModal from "../Modal/NeedLogin";

export default function TableComponent(props){
    const {status} = useSession();
    const router = useRouter()
    const data = props.data
    const links = props.links
    const metaData = props.metaData

    const [showModal, setShowModal] = useState(false);
    const inquiryItem = (item) => {
        if(status === 'unauthenticated'){
            setShowModal(true)
        } else {
            router.push(`/admin/product/mycart/${item}`)
        }
    }

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
            <div className="relative overflow-x-auto mt-14">
                <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
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
                            <th scope="col" className="px-6 py-3 text-center">
                                *
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return(
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item.country}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.AvailableQuantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.moq}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.ManufacturerNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.Description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.dateCode}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => inquiryItem(item.id)} className="font-medium text-blue-600 text-white bg-blueGray-700 p-2">Inquiry</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="mt-2">
                    <h2>Showing {metaData.perPage} data from {metaData.total} data</h2>
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

            {showModal ? (
                <NeedLoginModal
                    setShowModal={setShowModal}
                />
            ) : null}
            
        </>

        
    )
}

