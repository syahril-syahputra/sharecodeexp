import React, {useState} from "react";
import Link from "next/link";

// components
import ComponentStatus from "./ComponentStatus";
import Pagination from "@/components/Shared/Component/Pagination";

export default function ComponentList(props) {
    const tableType = props.tableType
    const data = props.data
    const links = props.links
    const metaData = props.metaData

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
                                            {item.packaging}
                                        </td>
                                        <td className="px-6 py-4 uppercase text-center">
                                            <ComponentStatus status={item.status} title={`stock status ${item.status}`} label={item.status}/>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!props.isLoading && 
                                                <div className="inline-flex">
                                                    <button onClick={()=> props.viewHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">View</button>

                                                    {/* {tableType == "accepted" && 
                                                        <>
                                                            <button className="font-medium text-blue-600 text-white bg-indigo-500 p-2">View</button>
                                                        </>
                                                    } */}

                                                    {/* {tableType == "pending" && 
                                                        <>
                                                            <button onClick={()=> props.acceptHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Accept</button>
                                                            <button onClick={()=> props.rejectHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Reject</button>
                                                        </>
                                                    }

                                                    {tableType == "rejected" && 
                                                        <>
                                                            <button onClick={()=> props.acceptHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Accept</button>
                                                            <button onClick={()=> props.pendingHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">Pending</button>
                                                        </>
                                                    } */}
                                                </div>
                                            }
                                            {props.isLoading &&<div>
                                                <div className='text-center my-auto'>
                                                    <i className="fas fa-circle-notch fa-spin text-blue-600 my-auto mx-10 fa-2xl"></i>
                                                </div>
                                            </div>}
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
            
            <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            />
        </>
    );
}