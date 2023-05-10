import React, {useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ChangeStatus from "@/components/Modal/CompanyControl/ChangeStatus"

export default function OrderCompany(props) {
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

    const [showModal, setShowModal] = useState(false);
    return (
        <>  
            <div className="relative">
                <div className="relative overflow-x-auto shadow">
                    <table className={`w-full text-sm text-left text-gray-500 shadow-md ${props.customClass}`}>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Company
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
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    *
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    A
                                </td>
                                <td className="px-6 py-4">
                                    A
                                </td>
                                <td className="px-6 py-4">
                                    A
                                </td>
                                <td className="px-6 py-4">
                                    A
                                </td>
                                <td className="px-6 py-4">
                                   A
                                </td>
                                <td className="px-6 py-4">
                                   A
                                </td>
                                <td className="px-6 py-4">
                                    A
                                </td>
                                <td className="px-6 py-4 uppercase">
                                    A
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="inline-flex">
                                        <button onClick={() => setShowModal(true)} className="mr-2 font-medium text-blue-600 bg-blueGray-700 p-2">Change Status</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {showModal ? (
                <ChangeStatus
                    setShowModal={setShowModal}
                />
            ) : null}
        </>
    );
}