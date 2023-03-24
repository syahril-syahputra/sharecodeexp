import React, {useState} from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// components
import ChangeStatus from "@/components/Modal/CompanyControl/ChangeStatus"
import Pagination from "@/components/Shared/Component/Pagination";

export default function CompanyList(props) {
    const data = props.data
    const links = props.links
    const metaData = props.metaData
    
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
                                    Master User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sector
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
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
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.company.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.company.sector}
                                        </td>
                                        <td className="px-6 py-4 text-right">

                                            {!props.isLoading && 
                                                <div className="inline-flex">
                                                    <button onClick={()=> props.viewHandler(item.id)} className="font-medium text-blue-600 text-white bg-indigo-500 hover:bg-indigo-600 p-2">View</button>
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
                                        {/* You have no data to show */}
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
            
            <Pagination 
                links={links}
                metaData={metaData}
                setPage={props.setPage}
            />
        </>
    );
}