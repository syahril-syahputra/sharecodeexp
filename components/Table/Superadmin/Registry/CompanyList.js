import React, {useState} from "react";

// components
import CompanyStatus from "./CompanyStatus";
import Pagination from "@/components/Shared/Component/Pagination";

export default function CompanyList(props) {
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
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sector
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
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
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.country}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.sector}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            <CompanyStatus status={item.is_confirmed} title={`stock status ${item.is_confirmed}`} label={item.is_confirmed}/>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {/* <div className="inline-flex">
                                                {item.is_confirmed == "false" ? 
                                                    <button onClick={() => setModalData(true, item.id, item.name)} className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">Accept Company</button>
                                                : <button className="mr-2 font-medium text-blue-600 text-white bg-blueGray-400 p-2">Accepted</button> }
                                                <Link href="/admin/companycontrol/company/view">
                                                    <button className="mr-2 font-medium text-blue-600 text-white bg-blueGray-700 p-2">View</button>
                                                </Link>
                                            </div> */}

                                            {!props.isLoading && 
                                                <div className="inline-flex">
                                                    <button onClick={()=> props.viewHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">View</button>

                                                    {/* {tableType == "accepted" && 
                                                        <>
                                                            <button className="font-medium text-blue-600 text-white bg-indigo-500 p-2">View</button>
                                                        </>
                                                    } */}

                                                    {tableType == "pending" && 
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
                                                    }
                                                </div>
                                            }
                                            {props.isLoading &&<div>
                                                <div className='text-center p-2'>
                                                    <i className="fas fa-circle-notch fa-spin text-blue-600 fa-2xl"></i>
                                                </div>
                                            </div>}
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
                </div>
                {metaData.total > 0 ? 
                    <div className="mt-2">
                        <h2>Showing {metaData.total <= 20 ? metaData.total : metaData.perPage } data from {metaData.total} data</h2>
                    </div>
                : null}
            </div>
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