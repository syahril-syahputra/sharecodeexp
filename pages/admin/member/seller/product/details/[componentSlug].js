import moment from 'moment';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "lib/axios";
import { getSession } from "next-auth/react";

// layout for page
import Admin from "layouts/Admin.js";

// components
import ComponentStatus from "/components/Shared/Component/Statuses";
import PrimaryWrapper from '@/components/Interface/Wrapper/PrimaryWrapper';
import PageHeader from '@/components/Interface/Page/PageHeader';
import DangerNotification from '@/components/Interface/Notification/DangerNotification';
import LoadingState from '@/components/Interface/Loader/LoadingState';
import WarningButton from '@/components/Interface/Buttons/WarningButton';
import SecondaryButton from '@/components/Interface/Buttons/SecondaryButton';

export default function MyProduct({session, routeParam}) {
    //data search
    const publicDir = process.env.NEXT_PUBLIC_DIR
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const getData = async () => {
        setIsLoading(true)
        const response = await axios.get(`/companyproduct?id=${routeParam.componentSlug}`,
            {
                headers: {
                "Authorization" : `Bearer ${session.accessToken}`
                }
            }
            )
            .then((response) => {
                let result = response.data.data
                setData(result)
            }).catch((error) => {
                // console.log(error.response)
                toast.success("Something went wrong. Cannot load component.", toastOptions)
            }).finally(() => {
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <PrimaryWrapper>
            <PageHeader
                leftTop={
                    <h3
                        className={
                            "font-semibold text-lg text-blueGray-700"
                    }>
                    Product Details
                    </h3>
                }
                rightTop={
                    <>
                        <Link target="_blank" href={publicDir + "/product_datasheet/" + data.datasheet}>
                            <SecondaryButton
                                size="sm"
                                className="mr-2"
                                disabled={data.datasheet ? false : true}
                            >   
                                <i className="mr-2 ml-1 fas fa-eye"></i>
                                View Datasheet
                            </SecondaryButton>
                        </Link>
                        {!!data.id && 
                            <Link href={`/admin/member/seller/product/edit/${data.slug}`}>
                                <WarningButton 
                                    size="sm"
                                >
                                    <i className="mr-2 ml-1 fas fa-pen text-white"></i>
                                    Edit Product
                                </WarningButton>
                            </Link>
                        }  
                    </>
                }
            ></PageHeader>
            {data.reason && data.status == 'rejected' &&
                <DangerNotification 
                    message={`Component is rejected`}
                    detail={data.reason}
                />
            }

            {/* main content */}
            {!isLoading ? 
                <>
                    {/* component image */}
                    <div className="w-full">
                        {data.img ? 
                            <div className="p-16 border mx-2 my-4">
                                <img className="object-contain mb-3 h-40 mx-auto" 
                                alt={data.ManufacturerNumber}
                                src={publicDir + "/product_images/" + data.img}/>
                            </div>
                        :
                            <div className="px-3 mb-6 md:mb-0 text-center">
                                <div className="p-24 border mx-2 my-4">product image {data.ManufacturerNumber}</div>
                            </div>
                        }                    
                    </div>

                    <div className="overflow-x-auto pb-10">
                        <table className="w-50 text-sm text-left text-gray-500 bg-white">
                            <tbody>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Manufacturer Part Number
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {data.ManufacturerNumber}
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
                                        {data.Manufacture}
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
                                        {data.AvailableQuantity}
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
                                        {data.moq}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Stock Location
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {data.country}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Product/Part Description
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {data.Description}
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
                                        {data.dateCode}
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
                                        {data.packaging}
                                    </td>
                                </tr>
                                {/* <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {data.subcategory?.category?.name}
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
                                        {data.subcategory?.name}
                                    </td>
                                </tr> */}
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        <ComponentStatus status={data.status} title={`stock status ${data.status}`} label={data.status}/>
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Created on
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {moment(data.created_at).format('dddd, D MMMM YYYY')}
                                    </td>
                                </tr>
                                <tr className="text-black hover:bg-slate-100">
                                    <th scope="col" className="px-6 py-3">
                                        Note
                                    </th>
                                    <td scope="row" className="text-sm px-6 py-4">
                                        :
                                    </td>
                                    <td className="text-sm px-2 py-4">
                                        {data.note}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
                : 
                <LoadingState className={"pb-40"}/>
            }
        </PrimaryWrapper>
    );
}

MyProduct.layout = Admin;

export async function getServerSideProps(context) {
const session = await getSession(context)
    return {
        props: {
            session,
            routeParam: context.query
        }
    }
}
