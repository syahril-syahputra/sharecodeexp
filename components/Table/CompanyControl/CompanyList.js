import React, {useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ChangeStatus from "@/components/Modal/CompanyControl/ChangeStatus"
import ItemStatuses from "@/components/Shared/ItemStatuses";

export default function TableCompany(props) {
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

    const [companyName, setCompanyName] = useState("")
    const [companyId, setCompanyId] = useState("")
    const setModalData = (modalStatus, companyId, companyName) => {
        setShowModal(modalStatus)
        setCompanyName(companyName)
        setCompanyId(companyId)
    }
    const handleCompanyAcceptance = () => {
        props.companyAcceptance(companyId)
    }
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
                                            <ItemStatuses status={item.is_confirmed} title={`stock status ${item.is_confirmed}`} label={item.is_confirmed}/>
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
                                                <div className='text-center my-auto'>
                                                    <i className="fas fa-circle-notch fa-spin text-blue-600 my-auto mx-10 fa-2xl"></i>
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
            {showModal ? (
                <ChangeStatus
                    setShowModal={setShowModal}
                    companyName={companyName}
                    acceptModal={handleCompanyAcceptance}
                />
            ) : null}
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