import React, {useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ChangeStatus from "@/components/Modal/CompanyControl/ChangeStatus"
import ItemStatuses from "@/components/Shared/ItemStatuses";

export default function TableProduct(props) {
    const tableType = props.tableType
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
                                    Package
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Packaging
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-gray-700 bg-white">
                            {data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.ManufacturerNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.Manufacture}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.AvailableQuantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.moq}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.country}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.Description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.dateCode}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.package}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.packaging}
                                        </td>
                                        <td className="px-6 py-4 uppercase text-center">
                                            <ItemStatuses status={item.status_id} title={`stock status ${item.status_id}`} label={item.status_id}/>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex">
                                                <button className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">View</button>

                                                {/* {tableType == "accepted" && 
                                                    <>
                                                        <button className="font-medium text-blue-600 text-white bg-indigo-500 p-2">View</button>
                                                    </>
                                                } */}

                                                {tableType == "pending" && 
                                                    <>
                                                        <button className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Accept</button>
                                                        <button className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Reject</button>
                                                    </>
                                                }

                                                {tableType == "rejected" && 
                                                    <>
                                                        <button className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Accept</button>
                                                        <button className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Pending</button>
                                                    </>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {metaData.total > 0 ? 
                    <div className="mt-2">
                        <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                    </div>
                : null}
            </div>


            {/* {showModal ? (
                <ChangeStatus
                    setShowModal={setShowModal}
                />
            ) : null} */}

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