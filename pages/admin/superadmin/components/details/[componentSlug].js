import moment from 'moment';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";

// components
import ComponentStatus from "@/components/Shared/Component/Statuses";
import AcceptComponent from "@/components/Modal/Component/AcceptComponent"
import RejectComponent from "@/components/Modal/Component/RejectComponent"
import PendingComponent from "@/components/Modal/Component/PendingComponent"
import { toast } from 'react-toastify';
import { toastOptions } from "@/lib/toastOptions"
import DangerNotification from '@/components/Interface/Notification/DangerNotification';
import WarningButton from "@/components/Interface/Buttons/WarningButton";
import PrimaryButton from "@/components/Interface/Buttons/PrimaryButton";
import DangerButton from "@/components/Interface/Buttons/DangerButton";

// layout for page
import Admin from "layouts/Admin.js";
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import PageHeader from '@/components/Interface/Page/PageHeader';
import LoadingState from '@/components/Interface/Loader/LoadingState';
import { CompanyStatusesIcon } from '@/components/Shared/Company/Statuses';
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton';

export default function ComponentDetails({session, routeParam}) {
    //data search
    const publicDir = process.env.NEXT_PUBLIC_DIR
    const [isLoading, setIsLoading] = useState(true)
    const [component, setComponent] = useState({})
    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(`/admin/product?id=${routeParam.componentSlug}`,
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
                toast.error("Something went wrong. Component not found", toastOptions)
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
        const request = await axios.post(`admin/product/update`, 
        {
            id: component.id
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Component has been accepted", toastOptions)
        })
        .catch((error) => {
            toast.error("Something went wrong. Can not accept the component", toastOptions)
        })
        .finally(() => {
            getData()
        })
    }

    const [showRejectModal, setShowRejectModal] = useState(false)
    const handleRejectComponent = async (text) => {
        setShowRejectModal(false)
        setIsLoading(true)
        const request = await axios.post(`admin/product/updateReject`, 
        {
            id: component.id,
            reason: text
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Component has been rejected", toastOptions)
        })
        .catch((error) => {
            toast.error("Something went wrong. Can not reject the component", toastOptions)
        })
        .finally(() => {
            getData()
        })
    }

    const [showPendingModal, setShowPendingModal] = useState(false)
    const handlePendingComponent = async (text) => {
        setShowPendingModal(false)
        setIsLoading(true)
        const request = await axios.post(`admin/product/updatePending`, 
        {
            id: component.id
        },
        {
            headers: {
                "Authorization" : `Bearer ${session.accessToken}`
            }
        })
        .then(() => {
            toast.success("Component has been set to pending", toastOptions)
        })
        .catch((error) => {
            toast.error("Something went wrong. Can not set component to pending", toastOptions)
        })
        .finally(() => {
            getData()
        })
    }

    return (
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3
                        className={
                            "font-semibold text-lg text-blueGray-700"
                    }>
                    Company Component Details
                    </h3>
                }
                rightTop={
                    <>
                        <Link target="_blank" href={publicDir + "/product_datasheet/" + component.datasheet}>
                            <SecondaryButton
                                size="sm"
                                className="mr-2"
                                disabled={component.datasheet ? false : true}
                            >   
                                <i className="mr-2 ml-1 fas fa-eye"></i>
                                View Datasheet
                            </SecondaryButton>
                        </Link>
                        {(component.status == "pending" || component.status == "rejected") && 
                            <PrimaryButton
                                size="sm"
                                className="mr-2"
                                onClick={() => setShowAcceptModal(true)}
                            >
                                <i className="mr-2 ml-1 fas fa-check text-white"></i>
                                Accept
                            </PrimaryButton>
                        }
                        {(component.status == "approved" || component.status == "rejected") && 
                            <WarningButton 
                                size="sm"
                                className="mr-2"
                                onClick={() => setShowPendingModal(true)}
                            >
                                <i className="mr-2 ml-1 fas fa-clock text-white"></i>
                                Pending
                            </WarningButton>
                        }
                        {(component.status == "approved" || component.status == "pending") &&
                        <DangerButton
                            size="sm"
                            className="mr-2"
                            onClick={() => setShowRejectModal(true)}
                        >
                            <i className="mr-2 ml-1 fas fa-times text-white"></i>
                            Reject
                        </DangerButton>
                        }

                        {/* {!!routeParam.componentid && !isLoading &&
                            <Link href={`/admin/superadmin/components/edit/${routeParam.componentid}`}>
                                <WarningButton
                                    size="sm"
                                >
                                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                                    Edit Component
                                </WarningButton>
                            </Link>
                        } */}
                    </>
                }
            ></PageHeader>

            {component.reason && component.status == 'rejected' &&
                <DangerNotification 
                    message={`Component is rejected`}
                    detail={component.reason}
                />
            }

            {/* main content */}
            {!isLoading ? 
                <>
                    {/* component image */}
                    <div className="w-full">
                        {component.img ? 
                            <div className="p-16 border mx-2 my-4">
                                <img className="object-contain mb-3 h-40 mx-auto" 
                                alt={component.ManufacturerNumber}
                                src={publicDir + "/product_images/" + component.img}/>
                            </div>
                        :
                            <div className="px-3 mb-6 md:mb-0 text-center">
                                <div className="p-24 border mx-2 my-4">product image {component.ManufacturerNumber}</div>
                            </div>
                        }                    
                    </div>
                    <div className="overflow-x-auto pb-10">
                        <table className="w-50 text-sm text-left text-gray-500 bg-white">
                            <tbody>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Company
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        <Link href={`/admin/superadmin/registry/company/${component.company?.id}`} className="text-blueGray-700 underline">{component.company?.name}</Link>
                                        <CompanyStatusesIcon status={component.company?.is_confirmed}/>   
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer Part Number
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.ManufacturerNumber}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.Manufacture}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Available Quantity
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.AvailableQuantity}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        MOQ
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.moq}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Country
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.country}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.Description}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Date Code
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.dateCode}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Packaging
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.packaging}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.subcategory?.category?.name}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Sub-Category
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {component.subcategory?.name}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        <ComponentStatus status={component.status} title={`stock status ${component.status}`} label={component.status}/>
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {moment(component.created_at).format('dddd, D MMMM YYYY')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {showAcceptModal ? (
                        <AcceptComponent
                            setShowModal={setShowAcceptModal}
                            itemName={component.ManufacturerNumber}
                            acceptModal={handleAcceptComponent}
                        />
                    ) : null}

                    {showRejectModal ? (
                        <RejectComponent
                            setShowModal={setShowRejectModal}
                            itemName={component.ManufacturerNumber}
                            acceptModal={handleRejectComponent}
                        />
                    ) : null}

                    {showPendingModal ? (
                        <PendingComponent
                            setShowModal={setShowPendingModal}
                            itemName={component.ManufacturerNumber}
                            acceptModal={handlePendingComponent}
                        />
                    ) : null}

                </>
                : 
                <LoadingState className={"pb-40"}/>
            }
        </PrimaryWrapper>
    );
}

ComponentDetails.layout = Admin;

export async function getServerSideProps(context) {
const session = await getSession(context)
    return {
        props: {
            session,
            routeParam: context.query
        }
    }
}
