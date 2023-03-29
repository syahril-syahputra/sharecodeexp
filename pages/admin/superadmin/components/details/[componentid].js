import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// components
import ComponentStatus from "@/components/Shared/Component/Statuses";
import AcceptComponent from "@/components/Modal/Component/AcceptComponent"
import RejectComponent from "@/components/Modal/Component/RejectComponent"
import PendingComponent from "@/components/Modal/Component/PendingComponent"


// layout for page
import Admin from "layouts/Admin.js";

export default function ComponentDetails({session, routeParam}) {
    //data search
    const [isLoading, setIsLoading] = useState(true)
    const [component, setComponent] = useState({
        ManufactureNumber: '123',
        status: "accepted"
    })
    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(`/companyproduct?id=${routeParam.componentid}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setComponent(result)
            }).catch((error) => {
                // console.log(error.response)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])


    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const handleAcceptComponent = async () => {
        setShowAcceptModal(false)
        setIsLoading(true)
        const request = await axios.post(`admin/companies/${routeParam.companyid}/update`, {}, {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Company Accepted")
        })
        .catch((error) => {
            console.log(error)
            toast.error("Something went wrong")
        })
        .finally(() => {
            getData()
        })
    }

    const [showRejectModal, setShowRejectModal] = useState(false)
    const handleRejectComponent = async (text) => {
        setShowRejectModal(false)
        setIsLoading(true)
        const request = await axios.post(`admin/companies/${routeParam.companyid}/reject`, 
        {
            id: routeParam.companyid,
            reason: text
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Company Rejected")
        })
        .catch((error) => {
            console.log(error)
            toast.error("Something went wrong")
        })
        .finally(() => {
            getData()
        })
    }

    const [showPendingModal, setShowPendingModal] = useState(false)
    const handlePendingComponent = async (text) => {
        setShowPendingModal(false)
        setIsLoading(true)
        const request = await axios.post(`admin/companies/${routeParam.companyid}/pending`, 
        {
            id: routeParam.companyid,
            reason: text
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Company set to pending")
        })
        .catch((error) => {
            console.log(error)
            toast.error("Something went wrong")
        })
        .finally(() => {
            getData()
        })
    }


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
                            Company Product 
                            </h3>
                        </div>
                        <div className="px-4 mt-2">
                            {/* {(component.status == "pending" || component.status == "rejected") &&  */}
                            <button onClick={() => setShowAcceptModal(true) } className="relative bg-blue-500 p-2 text-white mr-2">
                                <i className="mr-2 ml-1 fas fa-check text-white"></i>
                                Accept
                            </button>
                            {/* } */}
                            {/* {(component.status == "approved" || component.status == "rejected") &&  */}
                            <button onClick={() => setShowPendingModal(true) } className="relative bg-orange-500 p-2 text-white mr-2">
                                <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                                Pending
                            </button>
                            {/* } */}
                            {/* {(component.status == "approved" || component.status == "pending") &&  */}
                            <button onClick={() => setShowRejectModal(true) } className="relative bg-red-500 p-2 text-white mr-2">
                                <i className="mr-2 ml-1 fas fa-times text-white"></i>
                                Reject
                            </button>
                            {/* } */}

                            {!!routeParam.componentid && 
                                <Link href={`/admin/member/sellcomponents/component/edit/${routeParam.componentid}`}>
                                    <button className="relative bg-orange-500 p-2 text-white">
                                        <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                                        Edit Product
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>


                <div className="">
                    <div className="flex flex-wrap w-full bg-white">
                        <div className="px-3 mb-6 md:mb-0 text-center">
                            <div className="p-24 border mx-2 my-4">{routeParam.componentid}</div>
                        </div>
                    </div>
                    
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 bg-white">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td scope="row" className="text-sm px-6 py-4">
                                        {component.ManufacturerNumber}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.Manufacture}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.AvailableQuantity}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.moq}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.country}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.Description}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.dateCode}
                                    </td>
                                    <td className="text-sm px-6 py-4">
                                        {component.packaging}
                                    </td>
                                    <td className="text-sm px-6 py-4 text-center">
                                        <ComponentStatus status={component.status} title={`stock status ${component.status}`} label={component.status}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {showAcceptModal ? (
                        <AcceptComponent
                            setShowModal={setShowAcceptModal}
                            itemName={component.ManufactureNumber}
                            acceptModal={handleAcceptComponent}
                        />
                    ) : null}

                    {showRejectModal ? (
                        <RejectComponent
                            setShowModal={setShowRejectModal}
                            itemName={component.ManufactureNumber}
                            acceptModal={handleRejectComponent}
                        />
                    ) : null}

                    {showPendingModal ? (
                        <PendingComponent
                            setShowModal={setShowPendingModal}
                            itemName={component.ManufactureNumber}
                            acceptModal={handlePendingComponent}
                        />
                    ) : null}

                </div>
            </div>
        </>
    );
}

ComponentDetails.layout = Admin;

export async function getServerSideProps(context) {
const session = await getSession(context)
    return {
        props: {
            session: session,
            routeParam: context.query
        }
    }
}
